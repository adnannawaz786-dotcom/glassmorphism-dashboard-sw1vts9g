import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags */}
        <meta name="description" content="Modern glassmorphism reporting dashboard with interactive charts and analytics" />
        <meta name="keywords" content="dashboard, analytics, reporting, charts, glassmorphism" />
        <meta name="author" content="Glassmorphism Dashboard" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Glassmorphism Dashboard" />
        <meta property="og:description" content="Modern glassmorphism reporting dashboard with interactive charts and analytics" />
        <meta property="og:site_name" content="Glassmorphism Dashboard" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://your-domain.com" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Glassmorphism Dashboard" />
        <meta name="twitter:description" content="Modern glassmorphism reporting dashboard with interactive charts and analytics" />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#1e293b" />
        <meta name="msapplication-TileColor" content="#1e293b" />
      </Head>
      <body className="antialiased bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}