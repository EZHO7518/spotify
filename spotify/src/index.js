import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const basename = process.env.NODE_ENV === 'production' ? '/spotify' : '';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router basename={basename}>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
