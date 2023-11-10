import { LANG_ENUM } from "@/consts/common";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

import sharedEn from "./en/shared.json";
import sharedVi from "./vi/shared.json";

const KEY_LANG = "lang";
const currentLng = localStorage.getItem(KEY_LANG) || LANG_ENUM.en;

export const defaultNS = "shared";

i18next
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: currentLng,
    fallbackLng: LANG_ENUM.en,
    debug: true,
    resources: {
      en: {
        shared: sharedEn,
      },
      vi: {
        shared: sharedVi,
      },
    },
    defaultNS,
  });

export default i18next;
