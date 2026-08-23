"use client";

import { Analytics } from "@vercel/analytics/react";
import House from "./House/House";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-V16NP44WSM"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V16NP44WSM');
        `}
      </Script>

      <main>
        <House />
      </main>

      <Analytics />
    </>
  );
}
