
'use client'

import { Hero } from "@/src/components/Hero";
import Script from 'next/script';

export default function Custom() {
  return (
    <div >
      <Hero />
      <Script
        src="/chatbot.js"
        strategy="lazyOnload" // Load the script lazily
        onLoad={() => console.log('Chat widget loaded.')}
      />
    </div>
  );
}
