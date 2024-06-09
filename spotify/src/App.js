import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { getTokenFromUrl } from './utils/auth';

const App = () => {
  const token = getTokenFromUrl().access_token;

  console.log('Token:', token);  // 디버깅 로그 추가

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {token && <Route path="/dashboard" element={<Dashboard token={token} />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
