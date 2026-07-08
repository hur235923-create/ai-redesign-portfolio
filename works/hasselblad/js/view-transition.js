/* ============================================================
   MPA View Transitions — 쇼케이스 카드 → 제품 상세 공유요소 전환
   지원·reduced-motion 없으면 일반 내비게이션으로 자연 폴백
   ============================================================ */
const hb_supportsVT =
  "startViewTransition" in document &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// data-vt-link 앵커 클릭 시, 내부 [data-vt-name] 요소에 공유 이름을 부여해
// 브라우저의 cross-document 전환이 카드 이미지 → 상세 히어로로 모핑하게 한다.
export function initViewTransitionLinks() {
  if (!hb_supportsVT) return;
  document.querySelectorAll("a[data-vt-link]").forEach((a) => {
    a.addEventListener("click", () => {
      const el = a.querySelector("[data-vt-name]");
      if (el) el.style.viewTransitionName = "vt-x-hero";
    });
  });
}
