import React, { useState } from 'react';
import './Signup.css';
import { AUTH_URL } from '../../constants/apiEndPoints';
import { SIGNUP } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';

function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formResponse, setFormResponse] = useState('');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await makeRequest(AUTH_URL, false, SIGNUP, {
        data: formData,
      });

      console.log(response);

      setFormResponse(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1>Signup</h1>

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

        <button type="submit">Signup</button>
      </form>

      <p>Hi there</p>
    </>
  );
}

export default Signup;
