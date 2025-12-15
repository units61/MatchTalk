import React from 'react';
import {createRoot} from 'react-dom/client';
import App from '../../App';
import {initErrorTracking} from '../utils/errorTracking';
import {reportWebVitals} from '../utils/performance';

// Initialize error tracking
initErrorTracking({
  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.NODE_ENV || 'development',
});

// Report Web Vitals
if (process.env.NODE_ENV === 'production') {
  reportWebVitals((metric) => {
    // TODO: Send metrics to analytics service
    console.log('[WebVitals]', metric);
  });
}

// Register service worker for PWA
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registered:', registration.scope);
      })
      .catch((error) => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
















