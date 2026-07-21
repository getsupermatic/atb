import Hero from "@/components/sections/Hero";
import FeatureMorph from "@/components/motion/FeatureMorph";
import Problem from "@/components/sections/Problem";
import NewModel from "@/components/sections/NewModel";
import WaysToWork from "@/components/sections/WaysToWork";
import Products from "@/components/sections/Products";
import ATBOS from "@/components/sections/ATBOS";
import ClosingBand from "@/components/sections/ClosingBand";
import { products, site } from "@/lib/site";

const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((product, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: product.name,
      applicationCategory: "BusinessApplication",
      description: product.summary,
      url: `${site.domain}${product.href}`,
      brand: { "@type": "Organization", name: site.fullName },
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
      <Hero />
      <FeatureMorph />
      <Problem />
      <NewModel />
      <WaysToWork />
      <Products />
      <ATBOS />
      <ClosingBand />
    </>
  );
}
