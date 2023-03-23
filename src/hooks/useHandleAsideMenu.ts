import { useMemo } from 'react';
import CommonIcons from 'components/CommonIcons';
import BaseUrl from 'consts/baseUrl';
import { useAuth } from 'providers/AuthenticationProvider';
import { useTranslation } from 'react-i18next';

const useHandleAsideMenu = () => {
  const { loading, isLogged, isAdmin, isAppManager } = useAuth();
  const { t } = useTranslation();

  return useMemo(() => {
    if (loading || !isLogged) {
      return [];
    }

    const navbarAdmin = [
      [
        {
          label: 'Home',
          icon: CommonIcons.HomeIcon,
          href: BaseUrl.Homepage,
        },
        {
          label: 'Apps',
          icon: CommonIcons.CloudIcon,
          href: BaseUrl.AppManagement,
        },
        {
          label: 'Users',
          icon: CommonIcons.Users,
          href: BaseUrl.Users,
        },
        {
          label: 'Settings',
          icon: CommonIcons.SettingsIcon,
          href: BaseUrl.Settings,
        },
      ],
    ];

    const navbarAppManager = [
      [
        {
          label: 'Home',
          icon: CommonIcons.HomeIcon,
          href: BaseUrl.Homepage,
        },
        {
          label: 'Apps',
          icon: CommonIcons.CloudIcon,
          href: BaseUrl.AppManagement,
        },
        {
          label: 'Settings',
          icon: CommonIcons.SettingsIcon,
          href: BaseUrl.Settings,
        },
      ],
    ];

    const navbarUser = [
      [
        {
          label: t('shared:homepage'),
          icon: CommonIcons.HomeIcon,
          href: BaseUrl.Homepage,
        },
      ],
    ];

    if (isAdmin) {
      return navbarAdmin;
    }

    if (isAppManager) {
      return navbarAppManager;
    }

    return navbarUser;
  }, [loading, isLogged, isAdmin, isAppManager, t]);
};

export default useHandleAsideMenu;
