import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Signup, Footer } from '../../components';

function SignupPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Signup />
      <Footer />
    </>
  );
}

export default SignupPage;
