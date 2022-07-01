import { changeLanguage } from "i18next";

export const changeLang = (lang: string) => {
  changeLanguage(lang);
  localStorage.setItem("lang", lang);
};
