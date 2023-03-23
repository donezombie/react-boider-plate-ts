import CommonStyles from 'components/CommonStyles';
import React from 'react';

const Page404 = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ p: 2 }}>
      <CommonStyles.Typography variant='h5'>Oops!</CommonStyles.Typography>
      <CommonStyles.Typography variant='h4'>404 Not found!</CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default React.memo(Page404);
