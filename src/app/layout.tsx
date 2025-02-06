import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="ko">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
