import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'flexg CRM 라이브',
  description: 'flexg CRM 라이브 애플리케이션',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
