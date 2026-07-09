/* ============================================================
   AI 케이스 스터디 — Lenis · 스크롤 리빌 · Before/After 슬라이더
   ============================================================ */
const cs_reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
gsap.registerPlugin(ScrollTrigger);

if (!cs_reduce) {
  const cs_lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  cs_lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => cs_lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });
}

/* ---------- Before/After 슬라이더 ---------- */
(function () {
  const ba = document.getElementById("ba");
  if (!ba) return;
  const clip = document.getElementById("baClip");
  const handle = document.getElementById("baHandle");
  const clipImg = clip.querySelector(".ba__img");

  // clip 내부 이미지를 컨테이너 전체 폭으로 고정(잘려도 정렬 유지)
  function sizeImg() { clipImg.style.width = ba.clientWidth + "px"; }
  const clampPct = (v) => Math.max(0, Math.min(100, v));

  function set(pct) {
    pct = clampPct(pct);
    clip.style.width = pct + "%";
    handle.style.left = pct + "%";
    handle.setAttribute("aria-valuenow", Math.round(pct));
  }

  let dragging = false;
  function fromEvent(e) {
    const r = ba.getBoundingClientRect();
    const x = (e.clientX ?? (e.touches && e.touches[0].clientX)) - r.left;
    set((x / r.width) * 100);
  }

  ba.addEventListener("pointerdown", (e) => {
    dragging = true;
    try { ba.setPointerCapture(e.pointerId); } catch (_) {}
    fromEvent(e);
  });
  ba.addEventListener("pointermove", (e) => { if (dragging) fromEvent(e); });
  window.addEventListener("pointerup", () => { dragging = false; });

  handle.addEventListener("keydown", (e) => {
    const cur = parseFloat(handle.getAttribute("aria-valuenow")) || 50;
    if (e.key === "ArrowLeft") { set(cur - 4); e.preventDefault(); }
    if (e.key === "ArrowRight") { set(cur + 4); e.preventDefault(); }
  });

  window.addEventListener("resize", sizeImg);
  sizeImg();
  set(50);
})();

/* ---------- 이미지 로드 페이드인 (부드러운 마감) ---------- */
if (!cs_reduce) {
  document.querySelectorAll(".ba__img, .cs-shot img").forEach((img) => {
    img.classList.add("img-fade");
    const show = () => img.classList.add("is-loaded");
    if (img.complete && img.naturalWidth) show();
    else { img.addEventListener("load", show, { once: true }); img.addEventListener("error", show, { once: true }); }
  });
}
