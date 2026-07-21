import type { Metadata } from "next";
import ClosingBand from "@/components/sections/ClosingBand";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives from At The Beyond on AI-native products for the customer frontline.",
  alternates: { canonical: "/insights" },
};

// Temporary: the closing band lives here until the Insights page is built out.
export default function InsightsPage() {
  return <ClosingBand />;
}
