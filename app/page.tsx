import type { Metadata } from "next";
import HomeLandingPage from "@/components/home/HomeLandingPage";

export const metadata: Metadata = {
  title: "AI Ready | Learn AI Prompting for Work in 5 Minutes a Day",
  description:
    "AI Ready is an AI productivity app for professionals. Learn AI prompting for work, improve ChatGPT results, and get better AI outputs in just 5 minutes a day.",
  keywords: [
    "AI prompting",
    "learn AI prompting",
    "AI at work",
    "ChatGPT prompts for work",
    "AI productivity app",
    "prompting app for professionals",
    "how to use AI at work",
    "AI skills for professionals",
  ],
  alternates: {
    canonical: "https://getaiready.app",
  },
  openGraph: {
    title: "AI Ready | Learn AI Prompting for Work in 5 Minutes a Day",
    description:
      "Get a real edge at work with better AI prompting. Learn practical AI productivity skills for emails, meetings, summaries, research, and more.",
    url: "https://getaiready.app",
    siteName: "AI Ready",
    images: [
      {
        url: "https://getaiready.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Ready app for learning AI prompting at work",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Ready | Learn AI Prompting for Work in 5 Minutes a Day",
    description:
      "Learn how to get better AI outputs at work with short, practical lessons built for professionals.",
    images: ["https://getaiready.app/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://getaiready.app"),
};

export default function Page() {
  return <HomeLandingPage />;
}
