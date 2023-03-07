import React from 'react';
import { Header, Footer } from '../../components';

function PageNotFound() {
  return (
    <>
      <Header />
      <h1>Page not found</h1>
      <h3>Error code: 404</h3>
      <Footer />
    </>
  );
}

export default PageNotFound;
