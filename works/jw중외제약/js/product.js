/* ============================================================
   위너프 제품 상세 — Lenis 스무스 스크롤 + 리빌
   ============================================================ */
const pw_reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
gsap.registerPlugin(ScrollTrigger);

if (!pw_reduce) {
  const pw_lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  pw_lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => pw_lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });
}
