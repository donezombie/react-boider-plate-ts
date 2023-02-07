import baseUrl from 'constants/baseUrl';
import { useAuthentication } from 'providers/AuthenticationProvider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './styles/homepage.scss';
import { LANG_ENUM } from 'constants';
import { langMethod } from 'i18n';

interface HomepageProps {}

const Homepage = (props: HomepageProps) => {
  //! State
  const { isLogged, logout } = useAuthentication();
  const { t } = useTranslation();
  const language = langMethod.getLang();

  //! Function

  //! Render
  return (
    <div className='Homepage'>
      <ul>
        <li>
          <Link to={baseUrl.Homepage}>Homepage</Link>
        </li>
        <li>
          <Link to={baseUrl.Login}>Login</Link>
        </li>
        <li>
          <Link to={baseUrl.Todos}>Todos</Link>
        </li>
      </ul>

      {isLogged && <button onClick={logout}>Logout</button>}

      <h2 style={{ marginTop: 12, marginBottom: 12 }}>Lang: </h2>
      <div>{t('shared:hello')}</div>
      <button
        onClick={() => {
          if (language === LANG_ENUM.en) {
            langMethod.changeLang(LANG_ENUM.vi);
          } else {
            langMethod.changeLang(LANG_ENUM.en);
          }
        }}
      >
        Switch to {language === LANG_ENUM.en ? 'VI' : 'EN'}
      </button>
    </div>
  );
};

export default React.memo(Homepage);
