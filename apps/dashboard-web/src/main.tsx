import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import App from './App';
import SimpleApp from './SimpleApp';
import TestApp from './TestApp';
import { store } from './store';
import './index.css';

// Create emotion cache for Mantine
const emotionCache = createEmotionCache({ key: 'modernize' });

// Theme configuration for Mantine (simplified for compatibility)
const theme = {
  primaryColor: 'blue',
};

console.log('main.tsx is executing!');
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
console.log('About to render React app...');

// Test with Mantine + Router + Minimal Dashboard
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <Notifications />
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
