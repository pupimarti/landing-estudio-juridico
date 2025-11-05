import type React from "react";
import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Estudio Conti & Nasif",
  description: "Estudio jurídico especializado en derecho de salud, laboral, consumidor, familia y más. Protegemos tus intereses con soluciones concretas y trato humano en {{CIUDAD/REGIÓN}}.",
  keywords: "abogado, estudio jurídico, asesoría legal, derecho de salud, amparos, derecho laboral, derecho del consumidor, derecho de familia, {{CIUDAD/REGIÓN}}",
  authors: [{ name: "Estudio Conti & Nasif" }],
  creator: "Estudio Conti & Nasif",
  publisher: "Estudio Conti & Nasif",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Estudio Conti & Nasif",
    description: "Estudio jurídico especializado en derecho de salud, laboral, consumidor, familia y más. Protegemos tus intereses con soluciones concretas y trato humano.",
    siteName: "Estudio Conti & Nasif",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio Conti & Nasif",
    description: "Estudio jurídico especializado en derecho de salud, laboral, consumidor, familia y más.",
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
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Estudio Conti & Nasif",
    description: "Estudio jurídico especializado en asesoría legal clara y estratégica",
    telephone: "{{TELEFONO}}",
    email: "{{EMAIL_ESTUDIO}}",
    address: {
      "@type": "PostalAddress",
      streetAddress: "{{DIRECCION}}",
      addressLocality: "{{CIUDAD/REGIÓN}}",
      addressRegion: "{{CIUDAD/REGIÓN}}",
      addressCountry: "AR",
    },
    areaServed: "Argentina",
    priceRange: "$$",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
