import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";

const reviews = [
  {
    quote:
      "The Mojito is absolutely incredible and so refreshing! A perfect drink to pair with their food. 😍",
    name: "Pandey Hritvik",
  },
  {
    quote: "Amazing food and a fantastic atmosphere! Definitely my new favorite spot to hang out with friends.",
    name: "Vakharia Naisargi",
  },
  {
    quote:
      "The best place to hang out! After trying cold coffee at so many other places, Thicksip's cold coffee is officially my absolute favorite. A must-visit!",
    name: "Payal Rathod",
  },
  {
    quote:
      "Excellent service and highly attentive staff! They ensured we had a great time enjoying our premium burgers and shakes.",
    name: "Patel Mann",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-24" style={{ background: "var(--gradient-warm)" }}>
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Loved in Kalol" title="What People Say" />
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