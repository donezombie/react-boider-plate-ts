import { useMemo } from 'react';
import CommonIcons from 'components/CommonIcons';
import { useAppAuthentication } from 'providers/AppAuthenticationProvider';
import { PERMISSION_ENUM } from 'consts/index';
import BaseUrl from 'consts/baseUrl';

const navbarAdmin = [
  [
    {
      label: 'Apps',
      icon: CommonIcons.CloudIcon,
      href: BaseUrl.Homepage,
    },
    {
      label: 'Apps Management',
      icon: CommonIcons.CloudIcon,
      href: BaseUrl.AppManagement,
    },
  ],
];

const navbarUser = [
  [
    {
      label: 'Homepage',
      icon: CommonIcons.HomeIcon,
      href: '/',
    },
  ],
];

const useHandleAsideMenu = () => {
  const { user } = useAppAuthentication();
  const role = user?.role;

  return useMemo(() => {
    return navbarAdmin;

    if (role === PERMISSION_ENUM.ADMIN) {
      return navbarAdmin;
    }

    return navbarUser;
  }, [role]);
};

export default useHandleAsideMenu;
