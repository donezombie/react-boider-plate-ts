import React from "react";
import { useTranslation } from "react-i18next";
import { changeLang } from "helpers/lang";

const Dashboard: React.FC = (props) => {
  //! State
  const { t } = useTranslation();

  const onChangeLanguage = (lang: string) => () => {
    changeLang(lang);
  };

  //! Render
  return (
    <div>
      <span>Example multiple lang (i18n)</span>
      <h4>{t("shared:hello")}</h4>
      <div>
        <button onClick={onChangeLanguage("vi")}>Vi lang</button>
        <button onClick={onChangeLanguage("en")}>Eng lang</button>
      </div>
    </div>
  );
};
export default Dashboard;
