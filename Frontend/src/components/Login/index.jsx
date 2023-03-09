import React, { useState } from 'react';
import './Login.css';
import { AUTH_URL } from '../../constants/apiEndPoints';
import { LOGIN } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formResponse, setFormResponse] = useState('');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await makeRequest(AUTH_URL, false, LOGIN, {
        data: formData,
      });

      console.log(response);

      localStorage.setItem('token', response);

      setFormResponse(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      <p>Hi there</p>
    </>
  );
}

export default Login;
