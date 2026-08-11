import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero/Hero";
import { SiteNav } from "@/components/site/SiteNav";
import { About } from "@/components/site/About";
import { MenuSection } from "@/components/site/MenuSection";
import { GallerySection } from "@/components/site/GallerySection";
import { Testimonials } from "@/components/site/Testimonials";
import { SiteFooter } from "@/components/site/SiteFooter";

const title = "Thicksip Cafe Kalol — Craft Burgers & Thick Shakes";
const description =
  "Thicksip Cafe in Kalol serves craft burgers, hand-pressed fries, thick milkshakes and cold coffee. Open daily 10 AM to 10 PM.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
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
