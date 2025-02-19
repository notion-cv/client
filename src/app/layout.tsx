import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layouts/Header';
import PageLoader from '@/components/common/PageLoader';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Notion CV',
  description: '노션 이력서를 PDF로 만드는 방법',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="my_theme">
      <head>
        <head>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
            strategy="afterInteractive"
          ></Script>
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID});
          `,
            }}
          ></Script>
        </head>
      </head>
      <body className={`antialiased`}>
        <Header />
        <main className="h-dvh max-h-dvh overflow-hidden pt-11">{children}</main>
        <PageLoader />
      </body>
    </html>
  );
}
