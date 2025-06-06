import { Lusitana } from "next/font/google";
import "./globals.css";

const lusitana = Lusitana({
  variable: "--font-lusitana",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Tapeo",
  description:
    "Somos amistad e irreverencia, un culto y una cerveza. No somos otra cervecería. Somos TAPEO.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${lusitana.className} antialiased`}>{children}</body>
    </html>
  );
}
