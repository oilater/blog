'use client';

import { useEffect } from 'react';
import { loadGoogleAnalytics } from '#/libs/loadGoogleAnalytics';

export function GoogleAnalyticsLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startLoading = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => loadGoogleAnalytics(), {
          timeout: 2000,
        });
      } else {
        setTimeout(loadGoogleAnalytics, 1);
      }
    };

    if (document.readyState === 'complete') {
      startLoading();
    } else {
      window.addEventListener('load', startLoading, { once: true });
      return () => window.removeEventListener('load', startLoading);
    }
  }, []);

  return null;
}
