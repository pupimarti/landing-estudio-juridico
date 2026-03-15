export const SITE_NAME = "Estudio Conti & Nasif";
export const SITE_DESCRIPTION =
  "Estudio jurídico en CABA especializado en amparos de salud, derecho laboral, derecho del consumidor, sucesiones y conflictos civiles.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://landing-estudio-juridico-eta.vercel.app";
export const DEFAULT_OG_IMAGE = "/logo-share-1200x630.jpeg";

export const CONTACT_EMAIL = "guillermoconti@contiabogados.com";
export const CONTACT_PHONE = "+54 9 11 2604-4758";
export const CONTACT_PHONE_URI = "+5491126044758";
export const WHATSAPP_NUMBER = "5491126044758";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const OFFICE_ADDRESS = {
  streetAddress: "Maipu 42, Piso 9, Oficina 196",
  addressLocality: "CABA",
  addressRegion: "Buenos Aires",
  postalCode: "C1006",
  addressCountry: "AR",
};

export const OFFICE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Maipu%2042%2C%20piso%209%2C%20oficina%20196%2C%20CABA";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
