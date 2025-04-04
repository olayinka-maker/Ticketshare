import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif, Montserrat } from "next/font/google";
import "./globals.css";
import { TicketProvider } from "./_components/TicketContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Manrope_font = Montserrat({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body
        className={`${inter.className} ${ibmPlexSerif.className} ${Manrope_font.className}`}
      >
        <div className="text-white py-3 text-center w-full text-3xl bg-blue-600">
          TicketMaster
        </div>
        <TicketProvider>{children}</TicketProvider>
      </body>
    </html>
  );
}
