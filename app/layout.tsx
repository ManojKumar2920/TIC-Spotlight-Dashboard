import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const objectivity = localFont({
  src: [
    {
      path: '../fonts/Objectivity.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-objectivity'
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
    <html lang="en">
      <body
        className={`${objectivity.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
