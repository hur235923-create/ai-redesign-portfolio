/* ============================================================
   Your Frame 문의 폼 — 클라이언트 검증 + 성공 상태 (백엔드 없음 · 데모)
   ============================================================ */
(function () {
  const form = document.getElementById("yfForm");
  if (!form) return;
  const status = form.querySelector(".yourframe__status");
  const nameEl = document.getElementById("yf-name");
  const emailEl = document.getElementById("yf-email");
  const submitEl = form.querySelector(".yourframe__submit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

    if (!name) {
      status.dataset.state = "error";
      status.textContent = "이름을 입력해 주세요.";
      nameEl.focus();
      return;
    }
    if (!emailOk) {
      status.dataset.state = "error";
      status.textContent = "올바른 이메일 주소를 입력해 주세요.";
      emailEl.focus();
      return;
    }
    status.dataset.state = "ok";
    status.textContent = "접수되었습니다. 곧 연락드리겠습니다. (데모 — 실제 전송되지 않았습니다)";
    submitEl.disabled = true;
  });
})();
