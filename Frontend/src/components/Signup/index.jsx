import React, { useState } from 'react';
import './Signup.css';
import { AUTH_URL } from '../../constants/apiEndPoints';
import { SIGNUP } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';

function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formResponse, setFormResponse] = useState('Please Sign Up');

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

      setFormResponse('Signed Up Successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="signup-login-container">
      <h3>Signup for your CMS+ Account</h3>

      <form onSubmit={handleSubmit} className="signup-login-form">
        <label htmlFor="email" className="signup-login-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="signup-login-input"
        />

        <label htmlFor="password" className="signup-login-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="signup-login-input"
        />

        <button type="submit" className="signup-login-button">
          Signup
        </button>
      </form>

      <p className="form-response">{formResponse}</p>
    </div>
  );
}

export default Signup;
