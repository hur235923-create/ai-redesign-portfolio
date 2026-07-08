/* ============================================================
   X System 제품 상세 — Lenis 부드러운 스크롤 + 리빌
   ============================================================ */
const px_reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
gsap.registerPlugin(ScrollTrigger);

if (!px_reduce) {
  const px_lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  px_lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => px_lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });
}
