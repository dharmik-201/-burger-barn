import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";

const reviews = [
  {
    quote:
      "The citrus cooler was bright and refreshing, and the crispy fries made the whole meal feel like a treat.",
    name: "Avery Lane",
  },
  {
    quote: "A playful menu, generous portions, and a relaxed diner mood. The smoky garden burger was my favourite.",
    name: "Milo Hart",
  },
  {
    quote:
      "The chocolate shake was wonderfully thick without being too sweet. I would pair it with the loaded fries again.",
    name: "Tessa Bloom",
  },
  {
    quote:
      "Everything arrived hot, colourful, and thoughtfully presented. It is exactly the kind of cheerful burger experience I enjoy.",
    name: "Rowan Vale",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-24" style={{ background: "var(--gradient-warm)" }}>
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Fictional Sample Reviews" title="What People Say" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="surface-card relative p-7"
            >
              <span className="font-display absolute -top-3 left-6 text-6xl text-accent">“</span>
              <blockquote className="pt-3 text-[15px] leading-relaxed text-foreground/90">{r.quote}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {r.name.charAt(0)}
                </span>
                <span className="text-sm font-semibold">{r.name}</span>
                <span className="ml-auto text-sm text-accent">★★★★★</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}