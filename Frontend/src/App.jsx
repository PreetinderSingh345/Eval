import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_ROUTE, ERROR_ROUTE } from './constants/routes';
import { Error, Home, PageNotFound } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={`${ERROR_ROUTE}/:errorCode?`} element={<Error />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
