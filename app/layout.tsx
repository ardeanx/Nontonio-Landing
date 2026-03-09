import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://nontonio.com";
const SITE_NAME = "Nontonio";
const SITE_TITLE = "Nontonio | Next-Gen OTT Universe";
const SITE_DESCRIPTION =
  "Nontonio is an all-in-one OTT platform in development for Anime, Movies, TV Shows, Short Drama, K-Drama, Manga, Novel, and Videos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Nontonio",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  keywords: [
    "Nontonio",
    "OTT platform",
    "media streaming platform",
    "anime streaming",
    "movies",
    "tv shows",
    "k-drama",
    "manga",
    "novel",
    "videos",
    "short drama",
  ],
  authors: [{ name: "Ardean Bima Saputra" }],
  creator: "Ardean Bima Saputra",
  publisher: "Ardean Bima Saputra",
  category: "entertainment",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Nontonio - Next-Gen OTT Universe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/banner.png"],
    creator: "@nontonio",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: ["/icon.png"],
    apple: [{ url: "/icon.png", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}