// src/lib/scrollTo.js
// The ScrollStack mounts its own Lenis instance to smooth window scroll.
// Native scrollIntoView({behavior:"smooth"}) can fight Lenis' per-frame
// scrollTo and jitter, so every programmatic jump in the page goes through
// this single helper: Lenis when it owns the wheel, native fallback otherwise.

export function scrollToTarget(el) {
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(el, { duration: 1.15 });
    return;
  }
  el.scrollIntoView({ behavior: "smooth" });
}
