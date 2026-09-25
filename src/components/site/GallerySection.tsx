import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";
import burgerUrl from "@/assets/demo-burger.jpg";
import shakeFriesUrl from "@/assets/demo-shake-fries.jpg";
import restaurantUrl from "@/assets/demo-restaurant.jpg";
import counterUrl from "@/assets/demo-counter.jpg";

const images = [
  { url: burgerUrl, caption: "The signature demo burger" },
  { url: restaurantUrl, caption: "A fictional modern diner setting" },
  { url: shakeFriesUrl, caption: "Chocolate shake and loaded fries" },
  { url: counterUrl, caption: "A generic fictional service counter" },
  { url: burgerUrl, caption: "Double smash burger and fries" },
  { url: shakeFriesUrl, caption: "A classic diner pairing" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Inside the Demo" title="Gallery" subtitle="Fictional food and restaurant imagery created for this portfolio project." />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <motion.figure
            key={`${img.url}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
            className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
          >
            <img
              src={img.url}
              alt={img.caption}
              loading="lazy"
              width={1408}
              height={912}
              className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-charcoal/70 px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
              {img.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}