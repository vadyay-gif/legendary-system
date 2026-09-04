import type { Metadata } from "next";
import HomeLandingPage from "@/components/home/HomeLandingPage";

export const metadata: Metadata = {
  title: "AI Ready: Better AI Results | Practical AI Skills",
  description:
    "Practice real AI situations, diagnose weak results, compare approaches and build reusable skills. AI Ready helps you use AI more deliberately.",
  keywords: [
    "AI skills",
    "use AI better",
    "AI training",
    "practical AI learning",
    "better AI results",
    "AI prompting",
    "working with AI",
  ],
  alternates: {
    canonical: "https://getaiready.app/",
  },
  openGraph: {
    title: "Stop Guessing. Start Controlling AI. | AI Ready",
    description:
      "Practice on real AI situations. See what changes the result and build the judgement to use AI deliberately.",
    url: "https://getaiready.app/",
    siteName: "AI Ready",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Ready — Stop Guessing. Start Controlling AI.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Guessing. Start Controlling AI. | AI Ready",
    description:
      "Practice on real AI situations. See what changes the result and build the judgement to use AI deliberately.",
    images: ["/opengraph-image"],
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
