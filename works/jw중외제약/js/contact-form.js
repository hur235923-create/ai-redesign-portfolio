/* ============================================================
   Contact — 사용자군 세그먼트 + 문의 폼 (검증 · 데모, 백엔드 없음)
   ============================================================ */
(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const segs = document.querySelectorAll(".contact__segs .seg");
  const segInput = document.getElementById("c-seg");
  const status = form.querySelector(".c-status");
  const nameEl = document.getElementById("c-name");
  const emailEl = document.getElementById("c-email");
  const submitEl = form.querySelector(".c-submit");
  const emailOk = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

  segs.forEach((b) => {
    b.addEventListener("click", () => {
      segs.forEach((x) => { x.classList.remove("is-active"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("is-active");
      b.setAttribute("aria-pressed", "true");
      segInput.value = b.dataset.seg;
    });
  });

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
    status.textContent = "‘" + segInput.value + "’ 문의가 접수되었습니다. 곧 연락드리겠습니다. (데모 — 실제 전송되지 않았습니다)";
    submitEl.disabled = true;
  });
})();
