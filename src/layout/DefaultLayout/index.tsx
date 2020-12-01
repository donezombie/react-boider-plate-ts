import Footer from 'components/Footer';
import Header from 'components/Header';
import React, { Fragment } from 'react';

const DefaultLayout: React.FC = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <Header />
      <main className="main-container">{children}</main>
      <Footer />
    </Fragment>
  );
};

export default DefaultLayout;
