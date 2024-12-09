'use client';
import Script from 'next/script';

import './global.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
        src="/chatbot.js"
        strategy="lazyOnload" // Load the script lazily
        onLoad={() => console.log('Chat widget loaded.')}
      />
      </body>
    </html>
  );
}
