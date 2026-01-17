'use client';

import { useEffect } from 'react';
import { loadGoogleAnalytics } from '#/libs/loadGoogleAnalytics';

export function GoogleAnalyticsLoader() {
  useEffect(() => {
    loadGoogleAnalytics();
  }, []);

  return null;
}
