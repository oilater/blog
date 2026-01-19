import { BlogConfig } from '#/constants/config';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GTAG_ID = BlogConfig.googleAnalyticsId;

export function loadGoogleAnalytics() {
  if (typeof window === 'undefined') return;
  performance.mark('ga-init-start');

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer.push(args);
    });
  window.gtag('js', new Date());

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`;

  script.onload = () => {
    window.gtag('config', GTAG_ID);

    performance.mark('ga-init-end');
    performance.measure('ga-initialization', 'ga-init-start', 'ga-init-end');

    const measure = performance.getEntriesByName('ga-initialization')[0];

    const duration = measure?.duration;
    if (!duration) return null;

    window.gtag('event', 'timing_complete', {
      name: 'Google Analytics 초기화 시간',
      value: duration,
      is_slow: duration > 1000,
      event_category: 'Performance',
      non_interaction: true,
    });
  };

  document.head.appendChild(script);
}
