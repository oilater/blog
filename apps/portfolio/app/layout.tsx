import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { BlogConfig } from '../config';
import { LayoutWrapper } from './components/LayoutWrapper';
import { QueryProvider } from './components/providers/QueryProvider';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { vars } from './styles/globalTheme.css';
import { VelogPostLoader } from './velog/components/VelogPostLoader';

export const metadata: Metadata = {
  title: BlogConfig.title,
  description: BlogConfig.description,
  keywords: BlogConfig.keywords,
  authors: [{ name: BlogConfig.author.name }],
  creator: BlogConfig.author.name,
  publisher: BlogConfig.author.name,
  metadataBase: new URL(BlogConfig.url),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/apple-touch-icon.png',
    apple: '/favicon/apple-touch-icon.png',
    other: {
      url: '/favicon/favicon.ico',
    },
  },
};

const criticalCSS = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: ${vars.themeColor.colors.mainBackground};
  font-family: "Pretendard Variable", -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.2s ease-out;
  will-change: background-color;
}

img {
  max-width: 100%;
  height: auto;
  border: 0;
}

button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: ${vars.themeColor.colors.mainFontColor};
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <style data-critical>{criticalCSS}</style>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="dns-prefetch" href="https://v2.velog.io" />
      </head>
      <body>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
        <QueryProvider>
          <VelogPostLoader />
        </QueryProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId={BlogConfig.googleAnalyticsId} />
    </html>
  );
}
