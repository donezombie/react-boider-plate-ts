import React from 'react';

const DefaultLayout = ({ children }: { children: any }) => {
  return <main className='main-container'>{children}</main>;
};

export default React.memo(DefaultLayout);
