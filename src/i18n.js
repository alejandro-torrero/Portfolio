import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import es from "./locales/es";

const STORAGE_KEY = "portfolio-locale";

const savedLng = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "es" || stored === "en" ? stored : "en";
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: savedLng(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
});

export default i18n;
