import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { getTokenFromUrl } from './utils/auth';

const App = () => {
  const token = getTokenFromUrl().access_token;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {token && <Route path="/dashboard" element={<Dashboard token={token} />} />}
      </Routes>
    </Router>
  );
};

export default App;
