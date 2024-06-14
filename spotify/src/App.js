import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './pages/LoginPage';
import Callback from './components/Callback';
import { getTokenFromUrl } from './utils/auth';

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('spotify_token'));

  useEffect(() => {
    const params = getTokenFromUrl();
    const urlToken = params.access_token;

    if (urlToken) {
      localStorage.setItem('spotify_token', urlToken);
      setToken(urlToken);
      window.location.hash = '';
      navigate('/dashboard');
    } else if (token) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
