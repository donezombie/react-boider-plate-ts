import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';

interface AppsProps {}

const Callbacks = (props: AppsProps) => {
  //! State

  //! Function

  //! Render

  return (
    <CommonStyles.Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
      <CommonStyles.Loading size={24} /> Logging...
    </CommonStyles.Box>
  );
};

export default React.memo(Callbacks);
