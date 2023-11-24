import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import '@/styles/globals.scss';
import { ChakraProvider, ChakraTheme } from '@chakra-ui/react';

const fontFamily = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CRHS Parking',
  description: 'Lorem ipsum dolor sit amet',
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
    <html lang="en">
      {/* <ChakraProvider> */}
        <ClerkProvider>
          <body className={fontFamily.className}>{children}</body>
        </ClerkProvider>
      {/* </ChakraProvider> */}
    </html>
  );
}
