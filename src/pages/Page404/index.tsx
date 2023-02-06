import React from 'react';

interface Page404Props {}

const Page404 = (props: Page404Props) => {
  //! State

  //! Function

  //! Render
  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>404 Not found!</p>
    </div>
  );
};

export default React.memo(Page404);
