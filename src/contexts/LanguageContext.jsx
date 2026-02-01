import { createContext, useContext, useState, useCallback } from "react";
import en from "../locales/en";
import es from "../locales/es";

const locales = { en, es };

const LanguageContext = createContext(null);

function getNested(obj, path) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const stored = localStorage.getItem("portfolio-locale");
    return stored === "es" || stored === "en" ? stored : "en";
  });

  const t = useCallback(
    (key) => {
      const value = getNested(locales[locale], key);
      return value ?? key;
    },
    [locale]
  );

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "en" ? "es" : "en";
      localStorage.setItem("portfolio-locale", next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
