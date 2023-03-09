import React from 'react';
import { useParams } from 'react-router-dom';

function Error() {
  const { errorCode } = useParams();

  return (
    <>
      <h1>Something went wrong</h1>
      {errorCode && <h3>{`Error code: ${errorCode}`}</h3>}
    </>
  );
}

export default Error;
