import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kavitha Jewellers",
  description: "Modern e-commerce website",
};

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-custom  text-normal font-sans">
        <Navbar />
        <main className="flex-1 pt-[96px]  md:pt-[134px] flex flex-col relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
