import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './pages/LoginPage';
import Callback from './components/Callback';
import { getTokenFromUrl } from './utils/auth';

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const params = getTokenFromUrl();
    const urlToken = params.access_token;
    const storedToken = localStorage.getItem('spotify_token');

    if (urlToken) {
      localStorage.setItem('spotify_token', urlToken);
      setToken(urlToken);
      window.location.hash = '';
      navigate('/dashboard');
    } else if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/" />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
