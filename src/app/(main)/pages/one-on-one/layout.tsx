import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "One-on-One Therapy Sessions | World's Leading Psychologists - Stay Unfiltered",
  description: "Experience transformative healing with Stay Unfiltered's one-on-one therapy sessions led by world's leading psychologists and certified mental health professionals. Confidential counseling for stress management, anxiety relief, depression support, trauma healing, relationship guidance, and personal growth. Safe, supportive space tailored to your unique needs. Join thousands who have found relief from mental health challenges. Expert therapists specializing in cognitive behavioral therapy, mindfulness, EMDR, and holistic approaches. Start your journey to mental wellness today.",
  keywords: "one-on-one therapy, private counseling, world's leading psychologists, stress management therapy, anxiety treatment, depression counseling, trauma therapy, relationship counseling, personal growth coaching, confidential therapy sessions, licensed therapists India, mental health counseling",
  openGraph: {
    title: "One-on-One Therapy with World's Leading Psychologists",
    description: "Confidential therapy sessions for stress, anxiety, depression, and personal growth. Licensed psychologists in a safe, supportive space.",
    url: 'https://stayunfiltered.com/pages/one-on-one',
    type: 'website',
  },
};

export default function OneOnOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
