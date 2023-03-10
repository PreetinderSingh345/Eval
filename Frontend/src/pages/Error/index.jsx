import React from 'react';
import { useParams } from 'react-router-dom';
import './Error.css';

function Error() {
  const { errorCode } = useParams();

  return (
    <div id="error-container">
      <h3>Something went wrong</h3>
      {errorCode && <h3>{`Error code: ${errorCode}`}</h3>}
    </div>
  );
}

export default Error;
