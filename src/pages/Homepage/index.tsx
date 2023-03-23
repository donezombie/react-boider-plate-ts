import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import { useAuth } from 'providers/AuthenticationProvider';
import { useTranslation } from 'react-i18next';
import { langMethod } from 'i18n';

const Apps = () => {
  //! State
  const { t } = useTranslation();
  const theme = useTheme();
  const { isUser, user } = useAuth();

  //! Function

  //! Render
  if (isUser) {
    return (
      <CommonStyles.Box>
        <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
          {t('shared:hello')} {user?.username}
        </CommonStyles.Typography>

        <CommonStyles.Box sx={{ p: 1, backgroundColor: theme.colors?.grayLight }}>
          <code>{JSON.stringify(user)}</code>
        </CommonStyles.Box>

        <CommonStyles.Button
          sx={{ mt: 2 }}
          onClick={() => {
            if (langMethod.getLang() === 'vi') {
              langMethod.changeLang('en');
            } else {
              langMethod.changeLang('vi');
            }
          }}
        >
          {t('shared:change')} {t('shared:to')}{' '}
          {langMethod.getLang() === 'vi' ? t('shared:english') : t('shared:vietnamese')}
        </CommonStyles.Button>
      </CommonStyles.Box>
    );
  }

  return <CommonStyles.Box sx={{ display: 'flex', gap: 5 }}>Admin view</CommonStyles.Box>;
};

export default React.memo(Apps);
