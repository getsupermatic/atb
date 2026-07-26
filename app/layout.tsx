import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import GrainBackground from "@/components/motion/GrainBackground";

// Headline typeface. Variable, with the optical-size axis loaded so large
// display settings get the tighter, higher-contrast cut (font-optical-sizing
// is set on headings in globals.css).
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

// Body + all UI copy (buttons, nav, eyebrows, labels).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "ATB. AI-native products for the customer frontline",
    template: "%s · ATB.",
  },
  description: site.description,
  applicationName: "ATB.",
  keywords: [
    "AI-native products",
    "customer frontline AI",
    "FrontlineOS",
    "CommerceOS",
    "MarketingOS",
    "AI product studio",
    "forward-deployed AI",
  ],
  authors: [{ name: site.fullName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.domain,
    siteName: site.name,
    title: "ATB. AI-native products for the customer frontline",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "ATB. AI-native products for the customer frontline",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.fullName,
  alternateName: "ATB.",
  legalName: site.legalName,
  url: site.domain,
  email: site.email,
  description: site.description,
  slogan: site.tagline,
  foundingDate: "2025",
  sameAs: [site.social.linkedin, site.social.x],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.domain,
  publisher: { "@type": "Organization", name: site.fullName },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${inter.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SmoothScroll />
        <GrainBackground />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-[color:var(--color-amber)] focus:px-5 focus:py-2 focus:text-[color:var(--color-ink)]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
