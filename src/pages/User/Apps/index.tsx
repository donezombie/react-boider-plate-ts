import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import { useGetListInstalledApp } from 'hooks/app/useAppHooks';

// interface AppsProps {}

const Apps = () => {
  //! State
  const theme = useTheme();
  const { data: resListInstalledApp } = useGetListInstalledApp({
    skip: 0,
    take: 999,
    filter: '',
  });
  const dataInstallApp = resListInstalledApp?.data?.items || [];
  const totalCountInstallApp = resListInstalledApp?.data?.totalCount || 0;

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      {/* <CommonStyles.Box sx={{ p: 1, background: 'rgba(0, 0, 0, 0.1)', mb: 2 }}>
        <code style={{ overflowWrap: 'anywhere' }}> {JSON.stringify(user)}</code>
      </CommonStyles.Box> */}

      <CommonStyles.Typography variant='h4' sx={{ mb: 5 }}>
        My Apps ({totalCountInstallApp})
      </CommonStyles.Typography>

      <CommonStyles.Box
        sx={{
          display: 'flex',
          gap: 5,
          flexWrap: 'wrap',
          [theme.breakpoints.down('lg')]: {
            gap: 4,
          },

          [theme.breakpoints.down('md')]: {
            gap: 3,
          },

          [theme.breakpoints.down('sm')]: {
            gap: 2,
          },
        }}
      >
        {dataInstallApp.map((el, index) => {
          return (
            <CommonStyles.Box
              key={`${el.id}-${index}`}
              sx={{
                display: 'flex',
                p: 2,
                gap: 3,
                boxShadow: 3,
                borderRadius: 1,
                width: 'calc(100% / 4 - 30px)',
                transition: '.3s',

                '&:hover': {
                  cursor: 'pointer',
                  boxShadow: 6,
                },

                [theme.breakpoints.down('lg')]: {
                  width: 'calc(100% / 3 - 27px)',
                },

                [theme.breakpoints.down('md')]: {
                  width: 'calc(100% / 2 - 20px)',
                },

                [theme.breakpoints.down('sm')]: {
                  width: 'calc(100%)',
                },
              }}
            >
              <CommonStyles.Avatar
                src={el.icon}
                alt='company-logo'
                sx={{ width: 60, height: 60 }}
              />

              <CommonStyles.Box>
                <CommonStyles.Typography variant='h6'>{el.name}</CommonStyles.Typography>
                <CommonStyles.Typography variant='body2' sx={{ mb: 1 }}>
                  {el.developerName}
                </CommonStyles.Typography>

                <CommonStyles.Typography variant='body2' sx={{ color: theme.colors?.gray }}>
                  {el.summary}
                </CommonStyles.Typography>
              </CommonStyles.Box>
            </CommonStyles.Box>
          );
        })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(Apps);
