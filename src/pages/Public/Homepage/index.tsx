import baseUrl from 'consts/baseUrl';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LANG_ENUM } from 'consts/index';
import { langMethod } from 'i18n';
import { useToggleTheme } from 'providers/ToggleThemeProvider';
import CommonStyles from 'components/CommonStyles';
import { Box, Stack } from '@mui/material';

interface HomepageProps {}

const Homepage = (props: HomepageProps) => {
  //! State
  const { toggleTheme } = useToggleTheme();
  const { t } = useTranslation();
  const language = langMethod.getLang();

  //! Function

  //! Render

  return (
    <div>
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

      <Stack direction='row' spacing={1}>
        <CommonStyles.Button onClick={toggleTheme}>Toggle theme</CommonStyles.Button>
      </Stack>

      <CommonStyles.Typography variant='h4' style={{ marginTop: 12, marginBottom: 12 }}>
        Lang:{' '}
      </CommonStyles.Typography>
      <Box>{t('shared:hello')}</Box>
      <CommonStyles.Button
        onClick={() => {
          if (language === LANG_ENUM.en) {
            langMethod.changeLang(LANG_ENUM.vi);
          } else {
            langMethod.changeLang(LANG_ENUM.en);
          }
        }}
      >
        Switch to {language === LANG_ENUM.en ? 'VI' : 'EN'}
      </CommonStyles.Button>
    </div>
  );
};

export default React.memo(Homepage);
