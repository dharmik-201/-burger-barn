import { motion } from "motion/react";
import { menuGroups } from "@/lib/menu-data";
import { SectionHeading } from "./SectionHeading";

export function MenuSection() {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        eyebrow="The Line-Up"
        title="Menu"
        subtitle="Everything is made to order — burgers off the grill, shakes blended thick, fries fried twice."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="surface-card p-6"
          >
            <div className="flex items-baseline justify-between border-b border-dashed border-border pb-3">
              <h3 className="text-3xl text-primary">{group.title}</h3>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </div>
            {group.note ? (
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{group.note}</p>
            ) : null}
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-baseline gap-3 text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="font-semibold text-primary">₹{item.price}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Prices in ₹ · Taxes extra where applicable
      </p>
    </section>
  );
}