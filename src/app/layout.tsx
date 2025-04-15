import './globals.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pharmacy Tools',
  description: 'Modern, tech-forward tools to support non-sterile compounding pharmacy workflows.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Pharmacy Tools</title>
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics /> {/* This is where Analytics goes */}
      </body>
    </html>
  );
}
