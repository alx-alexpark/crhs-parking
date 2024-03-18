import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import '@/styles/globals.scss';

const fontFamily = Outfit({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CRHS Parking',
  description: '',
  keywords: ['katyisd', 'crhs', 'parking'],
};

export const viewport: Viewport = {
  themeColor: '#35f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={fontFamily.className}>
        <body>
          <noscript>CRHS Parking won't work without JavaScript</noscript>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
