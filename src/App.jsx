// src/App.jsx

import { useState } from "react";

import Layout from "./Layout.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import CatCompanion from "./components/CatCompanion.jsx";
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ContactSection from "./components/ContactSection.jsx";

import "./App.css";

export default function App() {
  // splash → scroll (portfolio)
  const [phase, setPhase] = useState(() =>
    window.location.hash === "#sin-splash" ? "scroll" : "splash"
  );

  return (
    <>
      {phase === "splash" && (
        <SplashScreen key="splash" onEnter={() => setPhase("scroll")} />
      )}

      {phase === "scroll" && (
        <>
          {/* the cat that wanders the page — kept OUTSIDE the language
              wrapper so its fixed canvas is never re-contained by the
              language-change animation */}
          <CatCompanion greet />

          <Layout>
            <HeroSection />
            <div className="content-flow">
              <AboutSection />
              <ContactSection />
            </div>
          </Layout>
        </>
      )}
    </>
  );
}
