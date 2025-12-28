import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { FloatingNav, NavItem } from '#components/FloatingNav';
import { LayoutWrapper } from '#components/LayoutWrapper';
import { QueryProvider } from '#components/QueryProvider';
import { ThemeProvider } from '#components/ThemeProvider';
import { BlogConfig } from '#constants/config';
import { vars } from '#tokens/theme.css';

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

const GA_MEASUREMENT_ID = BlogConfig.googleAnalyticsId;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <style data-critical>{criticalCSS}</style>
        <link rel="dns-prefetch" href="https://v2.velog.io" />
      </head>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <FloatingNav>
              {BlogConfig.menu.map((link) => (
                <NavItem
                  key={link.label}
                  href={link.path}
                  label={link.label}
                />
              ))}
            </FloatingNav>
            <LayoutWrapper>{children}</LayoutWrapper>
          </QueryProvider>
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
