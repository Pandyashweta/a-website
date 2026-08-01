import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif, Pacifico } from "next/font/google";
import "@/index.css";
import { HeaderWrapper } from "@/components/shared/HeaderWrapper";
import { FooterWrapper } from "@/components/shared/FooterWrapper";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-serif",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: {
    default: "skxie — Digital Novelist & Storyteller",
    template: "%s — skxie",
  },
  description:
    "skxie — digital storyteller and novelist designing immersive tales of mystery, modern romance, and emotional vulnerability.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://skxie.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "skxie — Digital Novelist & Storyteller",
    description:
      "skxie — digital storyteller and novelist designing immersive tales of mystery, modern romance, and emotional vulnerability.",
    url: "/",
    siteName: "skxie",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "skxie — Digital Novelist & Storyteller",
    description:
      "skxie — digital storyteller and novelist designing immersive tales of mystery, modern romance, and emotional vulnerability.",
    images: ["/favicon.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "skxie",
                url: process.env.NEXT_PUBLIC_APP_URL || "https://skxie.vercel.app/",
                description:
                  "skxie — digital storyteller and novelist designing immersive tales of mystery, modern romance, and emotional vulnerability.",
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "skxie",
                url: process.env.NEXT_PUBLIC_APP_URL || "https://skxie.vercel.app/",
                "sameAs": [
                  "https://instagram.com/skxielol",
                  "https://goodreads.com/skxie",
                  "https://amazon.com/author/skxie",
                  "https://wattpad.com/user/skxielol",
                ],
                jobTitle: "Author & Novelist",
                description:
                  "skxie is a digital storyteller and novelist designing immersive tales of mystery, modern romance, and emotional vulnerability.",
              },
            ]),
          }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${instrumentSerif.variable} ${pacifico.variable} font-sans bg-[#0A0A0B] text-[#D1D1D1] antialiased selection:bg-[#222226] selection:text-white relative min-h-screen overflow-x-hidden`}
      >
        <HeaderWrapper />
        <main className="min-h-screen">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
