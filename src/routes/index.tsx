import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero/Hero";
import { SiteNav } from "@/components/site/SiteNav";
import { About } from "@/components/site/About";
import { MenuSection } from "@/components/site/MenuSection";
import { GallerySection } from "@/components/site/GallerySection";
import { Testimonials } from "@/components/site/Testimonials";
import { SiteFooter } from "@/components/site/SiteFooter";

const title = "Burger Barn — Demo | Fictional Restaurant Website";
const description =
  "A fictional restaurant website demo featuring an animated 3D experience, sample menu, original reviews and portfolio-ready design.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <About />
      <MenuSection />
      <GallerySection />
      <Testimonials />
      <SiteFooter />
    </main>
  );
}
