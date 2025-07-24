import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import App from './App';
import { store } from './store';
import './index.css';

// Create emotion cache for Mantine
const emotionCache = createEmotionCache({ key: 'modernize' });

// Theme configuration for Mantine
const theme = {
  colorScheme: 'light',
  primaryColor: 'blue',
  defaultRadius: 'md',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    sizes: {
      h1: { fontSize: '2rem' },
      h2: { fontSize: '1.5rem' },
      h3: { fontSize: '1.25rem' },
      h4: { fontSize: '1.125rem' },
      h5: { fontSize: '1rem' },
      h6: { fontSize: '0.875rem' },
    },
  },
  components: {
    Button: {
      defaultProps: {
        size: 'md',
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider theme={theme} emotionCache={emotionCache} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <ModalsProvider>
              <App />
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
