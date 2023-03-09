import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Login, Footer } from '../../components';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
}

export default LoginPage;
