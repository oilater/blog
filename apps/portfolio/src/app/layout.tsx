import './global.css';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { FloatingNav } from '#components/FloatingNav';
import { LayoutWrapper } from '#components/LayoutWrapper';
import { ThemeProvider } from '#components/ThemeProvider';
import { BlogConfig } from '#constants/config';

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

const GA_MEASUREMENT_ID = BlogConfig.googleAnalyticsId;

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
          href="https://v2.velog.io"
          crossOrigin=""
        />
      </head>
      <body>
        <ThemeProvider>
          <FloatingNav />
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
        <Analytics />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
