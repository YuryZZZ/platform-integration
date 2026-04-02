import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import './globals.css';

const SITE_NAME    = process.env.NEXT_PUBLIC_SITE_NAME    || 'Nexus AI';
const SITE_TAGLINE = process.env.NEXT_PUBLIC_SITE_TAGLINE || 'The AI-Powered Platform That Builds Everything';
const SITE_DESC    = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'From conversational AI and automated workflows to knowledge retrieval and multi-site CMS — Nexus AI orchestrates your entire digital experience.';
const SITE_URL     = process.env.NEXT_PUBLIC_APP_URL      || 'http://localhost:3001';
const PRIMARY      = process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#6366f1';

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
  },
  description: SITE_DESC,
  keywords: ['AI platform', 'workflow automation', 'knowledge base', 'CMS', 'Nexus AI'],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESC,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: PRIMARY },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        {/* Service worker registration — production only */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator && location.hostname !== 'localhost'){navigator.serviceWorker.register('/sw.js').catch(()=>{})}`,
          }}
        />
      </body>
    </html>
  );
}
