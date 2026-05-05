const childProcess = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const net = require("net");
const path = require("path");
const querystring = require("querystring");
const tls = require("tls");

const root = __dirname;

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");
    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(root, ".env"));

const host = process.env.HOST || "127.0.0.1";
const requestedPort = Number(process.env.PORT || 8080);
const shouldOpen = process.argv.includes("--open");
const consultationEmailTo =
  process.env.CONSULTATION_EMAIL_TO || "softbrain75@naver.com";
const submissionLog = path.join(root, "consultation-submissions.jsonl");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".eot": "application/vnd.ms-fontobject",
  ".gif": "image/gif",
  ".html": "text/html; charset=euc-kr",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".php": "image/png",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function findAvailablePort(port) {
  return new Promise((resolve) => {
    const tester = net.createServer();

    tester.once("error", () => {
      resolve(findAvailablePort(port + 1));
    });

    tester.once("listening", () => {
      tester.close(() => resolve(port));
    });

    tester.listen(port, host);
  });
}

function resolvePath(urlPath) {
  let pathname;

  try {
    pathname = decodeURIComponent(new URL(urlPath, `http://${host}`).pathname);
  } catch {
    return null;
  }

  if (pathname === "/") {
    pathname = "/index.html";
  }

  const filePath = path.normalize(path.join(root, pathname));
  if (!filePath.startsWith(root)) {
    return null;
  }

  return filePath;
}

function openBrowser(url) {
  const command =
    process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`;

  childProcess.exec(command, () => {});
}

function readRequestBody(req, limit = 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function parseConsultationBody(req, body) {
  const contentType = req.headers["content-type"] || "";

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

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store"
  });
  res.end(body);
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
    };

    const onError = (error) => {
      cleanup();
      reject(error);
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
    `Message-ID: <${crypto.randomUUID()}@koryoinfo-local>`,
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
    return { sent: false, reason: "SMTP_USER/SMTP_PASS not configured" };
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
    return { sent: true };
  } finally {
    socket.end();
  }
}

async function handleConsultation(req, res) {
  try {
    const rawBody = await readRequestBody(req);
    const payload = normalizeConsultation(parseConsultationBody(req, rawBody));
    fs.appendFileSync(submissionLog, `${JSON.stringify(payload)}\n`, "utf8");

    let emailResult;
    try {
      emailResult = await sendConsultationEmail(payload);
    } catch (emailError) {
      emailResult = { sent: false, reason: emailError.message };
      console.error("Consultation email failed:", emailError.message);
    }

    sendJson(res, 200, {
      ok: true,
      emailSent: emailResult.sent,
      emailReason: emailResult.reason || "",
      message: emailResult.sent
        ? "상담신청이 이메일로 발송되었습니다."
        : "상담신청이 저장되었습니다. SMTP 계정 설정 후 이메일 자동 발송이 가능합니다."
    });
  } catch (error) {
    sendJson(res, 400, {
      ok: false,
      message: error.message || "상담신청 처리 중 오류가 발생했습니다."
    });
  }
}

async function main() {
  const port = await findAvailablePort(requestedPort);
  const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/api/consultation") {
      handleConsultation(req, res);
      return;
    }

    const filePath = resolvePath(req.url);

    if (!filePath) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Bad request");
      return;
    }

    fs.stat(filePath, (statError, stat) => {
      if (statError || !stat.isFile()) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const headers = {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
        "Content-Length": stat.size
      };

      if ([".html", ".js", ".json"].includes(ext)) {
        headers["Cache-Control"] = "no-store";
      }

      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
    });
  });

  server.listen(port, host, () => {
    const url = `http://${host}:${port}/index.html`;
    console.log(`Serving ${root}`);
    console.log(`Open ${url}`);

    if (shouldOpen) {
      openBrowser(url);
    }
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
