import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Main, Footer } from '../../components';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default Home;
