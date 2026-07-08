/* ============================================================
   Maruni 소장 문의 (Own a Maruni) — 클라이언트 검증 · 데모(백엔드 없음)
   (뉴스레터 피드백은 script.js의 mr_news가 담당)
   ============================================================ */
(function () {
  const form = document.getElementById("ownForm");
  if (!form) return;
  const status = form.querySelector(".own__status");
  const nameEl = document.getElementById("own-name");
  const emailEl = document.getElementById("own-email");
  const submitEl = form.querySelector(".own__submit");
  const emailOk = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!nameEl.value.trim()) {
      status.dataset.state = "error";
      status.textContent = "이름을 입력해 주세요.";
      nameEl.focus();
      return;
    }
    if (!emailOk(emailEl.value.trim())) {
      status.dataset.state = "error";
      status.textContent = "올바른 이메일 주소를 입력해 주세요.";
      emailEl.focus();
      return;
    }
    status.dataset.state = "ok";
    status.textContent = "소장 문의가 접수되었습니다. 곧 연락드리겠습니다. (데모 — 실제 전송되지 않았습니다)";
    submitEl.disabled = true;
  });
})();
