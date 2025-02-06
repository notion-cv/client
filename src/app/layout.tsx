import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layouts/Header';

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
      <body className={`antialiased`}>
        <Header />
        <main className="h-dvh max-h-dvh overflow-hidden pt-11">{children}</main>
      </body>
    </html>
  );
}
