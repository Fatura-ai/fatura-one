// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Fatura - Simple Invoicing',
  description: 'Create, send, and manage invoices with ease. Multi-language support for businesses.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Fatura - Simple Invoicing',
    description: 'Create, send, and manage invoices with ease. Multi-language support for businesses.',
    url: 'https://fatura.one',
    siteName: 'Fatura',
    locale: 'en_US',
    type: 'website',
  },
  keywords: ['invoicing', 'invoices', 'billing', 'business', 'fatura', 'invoice generator'],
  authors: [{ name: 'Fatura' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#4F46E5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}