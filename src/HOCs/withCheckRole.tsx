import CommonStyles from 'components/CommonStyles';
import { useAppAuthentication } from 'providers/AppAuthenticationProvider';
import React from 'react';
import { PERMISSION_ENUM } from 'consts/index';

const withCheckRole = (
  ComponentWrapped:
    | typeof React.Component
    | React.LazyExoticComponent<React.MemoExoticComponent<any>>
    | React.ExoticComponent<any>,
  permission?: (PERMISSION_ENUM | '')[]
) => {
  return () => {
    const { user } = useAppAuthentication();
    const role = user?.role || '';
    const havePermission =
      permission?.includes(role) || permission?.includes(PERMISSION_ENUM.PUBLIC);

    if (havePermission) {
      return <ComponentWrapped />;
    }

    return (
      <CommonStyles.Typography>{`You're not have permission to access this!`}</CommonStyles.Typography>
    );
  };
};

export default withCheckRole;
