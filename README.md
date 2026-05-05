# 고려신용정보 일산지점 홈페이지

## 실행

```powershell
npm start
```

브라우저에서 `http://127.0.0.1:8080/index.html`을 엽니다.

## 빠른상담신청 메일 발송

`server.js`는 `/api/consultation`으로 들어온 상담신청을 `consultation-submissions.jsonl`에 저장합니다.

실제 이메일 발송까지 하려면 `.env.example`을 참고해 `.env` 파일을 만들고 Naver SMTP 계정을 설정합니다.
