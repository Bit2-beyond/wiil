import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Wireless Intelligence & Innovation Lab (WIIL) | IIIT Guwahati",
  description:
    "WIIL at IIIT Guwahati focuses on 6G communications, AI/ML-driven signal processing, Reconfigurable Intelligent Surfaces, IoT, and next-generation wireless technologies.",
  icons: {
    icon: "/Will-home-img/Will-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
