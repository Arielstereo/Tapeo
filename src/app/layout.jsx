import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
  weight: "400",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport = {
  themeColor: "#0E0D0C",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: {
    default: "TAPEO",
    template: "%s | TAPEO",
  },
  description: "Somos amistad e irreverencia, un culto y una cerveza. No somos otra cervecería. Somos TAPEO.",
  openGraph: {
    title: "TAPEO",
    description: "Somos amistad e irreverencia, un culto y una cerveza. No somos otra cervecería. Somos TAPEO.",
    type: "website",
    locale: "es_AR",
    siteName: "TAPEO",
  },
  twitter: {
    card: "summary_large_image",
    title: "TAPEO",
    description: "Somos amistad e irreverencia, un culto y una cerveza.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${anton.variable} ${archivo.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}