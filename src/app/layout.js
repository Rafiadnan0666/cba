// app/layout.tsx (atau layout.ts)
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  metadataBase: new URL("https://rafiadnan.my.id"),
  title: {
    default: "Rafi Adnan – Web & Game Developer",
    template: "%s | Rafi Adnan",
  },
  description:
    "Full‑stack web & indie game developer based in Indonesia. Specialising in React, Laravel, Unity, and procedural madness.",

  keywords: [
    "Rafi Adnan",
    "Web Developer",
    "Game Developer",
    "React",
    "Laravel",
    "Unity",
    "Tailwind",
    "Portfolio",
    "Indonesia",
  ],
  authors: [{ name: "Rafi Adnan", url: "https://rafiadnan.my.id" }],
  creator: "Rafi Adnan",
  publisher: "Rafi Adnan",

  openGraph: {
    title: "Rafi Adnan – Web & Game Developer",
    description:
      "Showcasing projects in web development, indie games, and everything in between.",
    url: "https://rafiadnan.my.id",
    siteName: "rafiadnan.my.id",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Thumbnail: Rafi Adnan Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rafi Adnan – Web & Game Dev",
    description:
      "Full‑stack web & indie game developer. React, Laravel, Unity—let's build something awesome.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
