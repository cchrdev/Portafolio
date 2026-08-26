// src/Layout.jsx

import { AnimatePresence, motion } from "framer-motion";
import Aurora from "./components/Aurora.jsx";
import TargetCursor from "./components/TargetCursor.jsx";
import Nav from "./components/Nav.jsx";
import ProgressRail from "./components/ProgressRail.jsx";
import { useLang } from "./i18n.jsx";

export default function Layout({ children }) {
  const { lang } = useLang();

  return (
    <>
      {/* quiet 2D backdrop: drifting monochrome aurora + blueprint grid */}
      <Aurora />
      <div className="bg-grid" aria-hidden="true" />

      {/* film grain + vignette over everything */}
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* editorial navigation + chapter rail */}
      <Nav />
      <ProgressRail />

      {/* custom cursor across the page */}
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      <main className="page">
        {/* keying by language rolls the whole content on toggle.
            No filter here: a retained filter would make this wrapper the
            containing block for any fixed descendants and displace them. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.26, ease: [0.65, 0, 0.35, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}
