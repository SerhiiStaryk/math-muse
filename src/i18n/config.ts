import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import ukTranslations from './locales/uk.json';

// Get stored language or default to English
const storedLanguage = localStorage.getItem('language') || 'en';

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      uk: {
        translation: ukTranslations,
      },
    },
    lng: storedLanguage, // Default language
    fallbackLng: 'en', // Fallback language if translation is missing

    debug: false, // Set to true during development

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Order of language detection
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
    },
  });

export default i18n;
