import type React from "react";
import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import {
  absoluteUrl,
  CONTACT_EMAIL,
  CONTACT_PHONE_URI,
  DEFAULT_OG_IMAGE,
  OFFICE_ADDRESS,
  OFFICE_MAPS_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_URL,
} from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "estudio juridico en CABA",
    "abogado en CABA",
    "amparos de salud",
    "abogado laboral",
    "abogado consumidor",
    "sucesiones",
    "derecho civil",
    "abogados en Buenos Aires",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/logo.png" }],
  },
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "es_AR",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: SITE_NAME,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": absoluteUrl("/#legal-service"),
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    telephone: CONTACT_PHONE_URI,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      ...OFFICE_ADDRESS,
    },
    areaServed: [
      {
        "@type": "City",
        name: "CABA",
      },
      {
        "@type": "Country",
        name: "Argentina",
      },
    ],
    priceRange: "$$",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: CONTACT_PHONE_URI,
        email: CONTACT_EMAIL,
        areaServed: "AR",
        availableLanguage: ["es"],
      },
    ],
    sameAs: [WHATSAPP_URL, OFFICE_MAPS_URL],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <html lang="es-AR" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="image_src" href={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
