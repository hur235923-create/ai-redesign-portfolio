/* ============================================================
   AI × Redesign 허브 — Lenis 스무스 스크롤 + 리빌
   ============================================================ */
const ax_reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
gsap.registerPlugin(ScrollTrigger);

if (!ax_reduce) {
  const ax_lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  ax_lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => ax_lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });
}
