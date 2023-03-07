import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Footer } from '../../components';

function Error() {
  const { errorCode } = useParams();

  return (
    <>
      <Header />
      <h1>Something went wrong</h1>
      {errorCode && <h3>{`Error code: ${errorCode}`}</h3>}
      <Footer />
    </>
  );
}

export default Error;
