// app/metadata.ts
import type { Metadata } from "next";

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KnowMe? - Friendship Quiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KnowMe? - The Friendship Quiz That Doesn't Lie",
    description: "Build a personalized quiz, share your Game ID, and find out who truly gets you.",
  },
  robots: {
    index: true,
    follow: true,
  },
};