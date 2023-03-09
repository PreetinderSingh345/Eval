import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  ERROR_ROUTE,
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  CONTENT_FIELDS,
  CONTENT_ENTRIES,
} from './constants/routes';
import {
  Error,
  PageNotFound,
  SignupPage,
  LoginPage,
  ContentFields,
  ContentEntries,
} from './pages';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${ERROR_ROUTE}/:errorCode?`} element={<Error />} />
        <Route path={SIGNUP_ROUTE} element={<SignupPage />} />
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />

        {isAuthenticated && (
          <>
            <Route path={CONTENT_FIELDS} element={<ContentFields />} />
            <Route
              path={`${CONTENT_ENTRIES}/:contentId`}
              element={<ContentEntries />}
            />
          </>
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
