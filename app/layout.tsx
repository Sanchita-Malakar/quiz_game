// app/layout.tsx
import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

// Import DM_Sans for body text
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

// Import Inter for code/monospace text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KnowMe? - The Friendship Quiz That Doesn't Lie",
  description: "Build a personalized quiz, share your Game ID, and find out who truly gets you. Challenge your friends and discover the truth about your friendships.",
  keywords: ["quiz", "friendship", "game", "social", "fun", "challenge"],
  openGraph: {
    title: "KnowMe? - The Friendship Quiz That Doesn't Lie",
    description: "Build a personalized quiz, share your Game ID, and find out who truly gets you.",
    type: "website",
    locale: "en_US",
    siteName: "KnowMe?",
  },
  twitter: {
    card: "summary_large_image",
    title: "KnowMe? - The Friendship Quiz That Doesn't Lie",
    description: "Build a personalized quiz, share your Game ID, and find out who truly gets you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
