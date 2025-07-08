// src/main.tsx
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const Main = () => {
  // Load theme from localStorage or default to dark
  const [mode, setMode] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  );

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode); // Persist it
      return newMode;
    });
  };

  // Optional: sync on mount if localStorage manually changed
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#121212' : '#f9fafb',
        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleTheme={toggleTheme} mode={mode} />
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Main />
    </BrowserRouter>
  </StrictMode>
);
