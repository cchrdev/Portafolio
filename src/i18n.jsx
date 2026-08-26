// src/i18n.jsx
// Tiny bilingual system: a LanguageProvider holding the current language and
// its dictionary, persisted in localStorage and defaulting to the browser's
// language (Spanish first, English otherwise).

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { en } from "./translations/en.js";
import { es } from "./translations/es.js";

const DICTS = { en, es };
const STORAGE_KEY = "cchrdev-lang";

const LanguageContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* private mode etc. */
  }
  const nav = typeof navigator !== "undefined" ? navigator.language : "";
  return nav.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: DICTS[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// (context provider + hook are a matched pair by design)
// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
