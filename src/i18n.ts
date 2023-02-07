import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLang from './locales/en';
import viLang from './locales/vi';

const KEY_LANG = 'lang';
const currentLng = localStorage.getItem(KEY_LANG) || 'en';

export const langMethod = {
  changeLang: (lang: string) => {
    localStorage.setItem(KEY_LANG, lang);
  },
};

i18n
  // .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS: 'label',
    lng: currentLng,
    fallbackLng: 'en',
    resources: {
      en: enLang as any,
      vi: viLang as any,
    },
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    detection: {
      order: ['path', 'navigator'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;