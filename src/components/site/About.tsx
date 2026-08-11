import { motion } from "motion/react";
import { unnamed_webp as interiorUrl, unnamed_5_webp as counterUrl } from "@/lib/assets";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">About Us</span>
          <h2 className="mt-3 text-5xl sm:text-6xl">The Ultimate Hangout</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Thicksip is the ultimate destination for craft burgers, hand-pressed fries and bold milkshakes. We built a
            bright, comfortable corner in Kalol where friends stay a little longer — premium plates, pocket-friendly
            prices, zero pretence.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "Craft", v: "Burgers" },
              { k: "Blended", v: "Thickshakes" },
              { k: "Brewed", v: "Cold Coffee" },
            ].map((s) => (
              <div key={s.k} className="surface-card p-4 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.k}</p>
                <p className="font-display mt-1 text-2xl text-primary">{s.v}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <img
            src={interiorUrl}
            alt="Thicksip Cafe seating area with blue walls and cane chairs"
            loading="lazy"
            className="col-span-2 h-56 w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
          />
          <img
            src={counterUrl}
            alt="Thicksip Cafe order counter"
            loading="lazy"
            className="h-44 w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
          />
          <div className="grid h-44 place-items-center rounded-2xl bg-primary p-5 text-center text-primary-foreground shadow-[var(--shadow-bold)]">
            <p className="font-display text-3xl leading-tight">Open Daily 10AM – 10PM</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}