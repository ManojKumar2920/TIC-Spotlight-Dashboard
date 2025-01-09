import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const objectivity = localFont({
  src: [
    {
      path: "../fonts/Objectivity.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Objectivity_Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Objectivity_ExtraBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-objectivity",
});

export const metadata: Metadata = {
  title: "Spotlight Dashboard",
  description: "Spotlight Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${objectivity.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
