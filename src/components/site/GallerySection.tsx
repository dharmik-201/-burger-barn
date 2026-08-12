import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { fetchGalleryImages } from "@/lib/gallery";
import { SectionHeading } from "./SectionHeading";
import {
  unnamed_3_webp as storefront,
  unnamed_4_webp as interiorA,
  interior_seating_jpg as interiorB,
  guests_coldcoffee_jpg as guests,
  guests_family_jpg as guests2,
  unnamed_5_webp as counter,
} from "@/lib/assets";

const fallback = [
  { url: storefront, caption: "The Thicksip storefront, lit up after dark" },
  { url: interiorA, caption: "Cosy corner seating" },
  { url: counter, caption: "Fresh off the counter" },
  { url: interiorB, caption: "Room for the whole gang" },
  { url: guests, caption: "Cold coffee o'clock" },
  { url: guests2, caption: "Good food, better company" },
];

export function GallerySection() {
  const { data } = useQuery({
    queryKey: ["gallery", "gallery"],
    queryFn: () => fetchGalleryImages("gallery"),
  });

  const images =
    data && data.length > 0
      ? data.map((d) => ({ url: d.displayUrl, caption: d.caption ?? "Thicksip Cafe" }))
      : fallback;

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Inside Thicksip" title="Gallery" subtitle="A peek at the space, the plates and the people." />
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