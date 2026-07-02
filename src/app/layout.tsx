import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

/* ----------------------------------------------------------------
   Polices — chargement optimise via next/font
   ---------------------------------------------------------------- */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

/* ----------------------------------------------------------------
   Metadonnees
   ---------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Dɔni — Apprenez sans limites | Plateforme de formation professionnelle",
  description:
    "Dɔni est une plateforme de formation institutionnelle proposant des parcours certifiants, des cours dispenses par des experts reconnus et un accompagnement personnalise pour les professionnels et les entreprises.",
  keywords: [
    "formation professionnelle",
    "e-learning",
    "certification",
    "cours en ligne",
    "Dɔni",
    "plateforme institutionnelle",
    "parcours certifiant",
  ],
  authors: [{ name: "Dɔni" }],
  openGraph: {
    title: "Dɔni — Apprenez sans limites",
    description:
      "Plateforme de formation institutionnelle. Parcours certifiants, experts reconnus, accompagnement personnalise.",
    type: "website",
    locale: "fr_FR",
    siteName: "Dɔni",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ----------------------------------------------------------------
   Layout racine
   ---------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-cream text-ink font-body">
        <Header />
        <main id="contenu-principal">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
