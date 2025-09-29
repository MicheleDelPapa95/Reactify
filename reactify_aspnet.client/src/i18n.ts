import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          Home: 'Home',
          Products: 'Products',
          Add: 'Add',
          Reactify: 'Reactify',
        },
      },
      it: {
        translation: {
          Home: 'Home',
          Products: 'Prodotti',
          Add: 'Aggiungi',
          Reactify: 'Reactify',
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
