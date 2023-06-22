import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationES from './locales/es/translation.json';
import translationAR from './locales/ar/translation.json';
import translationTR from './locales/tr/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  es: {
    translation: translationES,
  },
  ar: {
    translation: translationAR,
  },
  tr: {
    translation: translationTR,
  },
}
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
    
  });

export default i18n;