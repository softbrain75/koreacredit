import crypto from "node:crypto";
import net from "node:net";
import querystring from "node:querystring";
import tls from "node:tls";

const consultationEmailTo =
  process.env.CONSULTATION_EMAIL_TO || "softbrain75@naver.com";

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

async function parseConsultationBody(request) {
  const contentType = request.headers.get("content-type") || "";
  const body = await request.text();

  if (contentType.includes("application/json")) {
    return JSON.parse(body || "{}");
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return querystring.parse(body);
  }

  return {};
}

function normalizeConsultation(input) {
  const payload = {
    name: String(input.name || input.sender_office || "").trim(),
    mobile: String(input.mobile || input.phone || "").trim(),
    message: String(input.message || input.sms_msg || "").trim(),
    source: String(input.source || "").trim(),
    createdAt: new Date().toISOString()
  };

  if (!payload.name) {
    throw new Error("이름을 입력해 주세요.");
  }

  if (!payload.mobile) {
    throw new Error("연락처를 입력해 주세요.");
  }

  return payload;
}

function mimeWord(value) {
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function dotStuff(message) {
  return message.replace(/^\./gm, "..");
}

function smtpRead(socket) {
  return new Promise((resolve, reject) => {
    let buffer = "";

    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("timeout", onTimeout);
    };

    const onError = (error) => {
      cleanup();
      reject(error);
    };

    const onTimeout = () => {
      cleanup();
      socket.destroy();
      reject(new Error("SMTP connection timed out"));
    };

    const onData = (chunk) => {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const lastLine = lines[lines.length - 1] || "";

      if (/^\d{3}\s/.test(lastLine)) {
        cleanup();
        resolve({
          code: Number(lastLine.slice(0, 3)),
          message: buffer
        });
      }
    };

    socket.on("data", onData);
    socket.on("error", onError);
    socket.on("timeout", onTimeout);
  });
}

async function smtpCommand(socket, command, expectedCodes) {
  socket.write(`${command}\r\n`);
  const response = await smtpRead(socket);

  if (!expectedCodes.includes(response.code)) {
    throw new Error(`SMTP ${response.code}: ${response.message.trim()}`);
  }

  return response;
}

function connectSmtp({ host, port, secure }) {
  return new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host, port, servername: host })
      : net.connect({ host, port });
    const readyEvent = secure ? "secureConnect" : "connect";

    socket.setTimeout(15000);
    socket.once(readyEvent, () => {
      socket.setEncoding("utf8");
      resolve(socket);
    });
    socket.once("error", reject);
  });
}

function buildConsultationEmail(payload, from, to) {
  const subject = `[고려신용정보 일산지점] 빠른상담신청 - ${payload.name}`;
  const body = [
    "빠른상담신청이 접수되었습니다.",
    "",
    `이름: ${payload.name}`,
    `연락처: ${payload.mobile}`,
    `상담내용: ${payload.message || "(미입력)"}`,
    `접수시각: ${payload.createdAt}`,
    `접수페이지: ${payload.source || "(미기록)"}`
  ].join("\r\n");

  return [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${mimeWord(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@koryoinfo-vercel>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(body, "utf8").toString("base64").match(/.{1,76}/g).join("\r\n")
  ].join("\r\n");
}

async function sendConsultationEmail(payload) {
  const user = (process.env.SMTP_USER || "").trim();
  const pass = process.env.SMTP_PASS || "";

  if (!user || !pass) {
    throw new Error("SMTP_USER/SMTP_PASS not configured");
  }

  const host = process.env.SMTP_HOST || "smtp.naver.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE !== "false";
  const fromAddress = process.env.SMTP_FROM || user;
  const from = `${mimeWord("고려신용정보 일산지점")} <${fromAddress}>`;
  const to = consultationEmailTo;
  const socket = await connectSmtp({ host, port, secure });

  try {
    await smtpRead(socket);
    await smtpCommand(socket, "EHLO localhost", [250]);
    await smtpCommand(socket, "AUTH LOGIN", [334]);
    await smtpCommand(socket, Buffer.from(user).toString("base64"), [334]);
    await smtpCommand(socket, Buffer.from(pass).toString("base64"), [235]);
    await smtpCommand(socket, `MAIL FROM:<${fromAddress}>`, [250]);
    await smtpCommand(socket, `RCPT TO:<${to}>`, [250, 251]);
    await smtpCommand(socket, "DATA", [354]);
    socket.write(`${dotStuff(buildConsultationEmail(payload, from, to))}\r\n.\r\n`);
    await smtpRead(socket);
    await smtpCommand(socket, "QUIT", [221]);
  } finally {
    socket.end();
  }
}

export async function POST(request) {
  try {
    const payload = normalizeConsultation(await parseConsultationBody(request));
    await sendConsultationEmail(payload);

    return json({
      ok: true,
      emailSent: true,
      message: "상담신청이 이메일로 발송되었습니다."
    });
  } catch (error) {
    console.error("Consultation email failed:", error.message);

    return json(
      {
        ok: false,
        emailSent: false,
        message: error.message || "상담신청 처리 중 오류가 발생했습니다."
      },
      500
    );
  }
}

export function GET() {
  return json(
    {
      ok: false,
      message: "POST 요청만 지원합니다."
    },
    405
  );
}
