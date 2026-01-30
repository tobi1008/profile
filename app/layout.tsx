import type { Metadata } from "next";
import { Dancing_Script } from 'next/font/google';
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: "Lê Quyền | IT System Administrator",
  description: "IT System Administrator Portfolio - Linux, Docker, Cloud, Network Security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
