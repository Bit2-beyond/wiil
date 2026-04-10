import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

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
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
