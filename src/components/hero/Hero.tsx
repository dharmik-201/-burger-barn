import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const HeroScene = lazy(() => import("./HeroScene"));

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden" style={{ background: "var(--gradient-warm)" }}>
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-6xl items-center gap-6 px-5 pb-16 pt-28 lg:grid-cols-2 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Kalol · Burgers · Thickshakes
          </span>
          <h1 className="mt-6 text-6xl leading-[0.92] sm:text-7xl lg:text-8xl">
            Sip Thick,
            <br />
            <span className="text-gradient-crimson">Bite Bold.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground lg:mx-0">
            Craft burgers, hand-pressed fries and outrageously thick shakes — served fresh in the heart of Kalol.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button size="lg" variant="hero" asChild>
              <a href="https://www.zomato.com" target="_blank" rel="noreferrer">
                Order Online
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#menu">View Menu</a>
            </Button>
          </div>
        </motion.div>

        <div className="relative h-[46vh] min-h-[320px] w-full lg:h-[70vh]">
          <ClientOnly
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Warming up the grill…
              </div>
            }
          >
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </ClientOnly>
          <p className="absolute bottom-1 left-0 right-0 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Move your mouse
          </p>
        </div>
      </div>
    </section>
  );
}