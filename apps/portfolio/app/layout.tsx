import './styles/globalTheme.css';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { BlogConfig } from '../config';
import { LayoutWrapper } from './components/LayoutWrapper';
import { QueryProvider } from './components/providers/QueryProvider';
import { ThemeProvider } from './components/providers/ThemeProvider';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
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
    </html>
  );
}
