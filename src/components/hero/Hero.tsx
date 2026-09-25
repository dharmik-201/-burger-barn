import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Button } from "@/components/ui/button";

const HeroScene = lazy(() => import("./HeroScene"));

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

const letters = "BURGERBARN".split("");

const marqueeItems = [
  "Thick Shakes",
  "Smash Burgers",
  "Loaded Fries",
  "Mojitos",
  "Late Night Vibes",
  "Fictional Demo",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden"
      style={{ background: "var(--gradient-warm)" }}
    >
      {/* ambient layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob -left-40 top-[-10%] h-[34rem] w-[34rem] bg-primary/25" />
        <div
          className="aurora-blob right-[-12%] top-[8%] h-[30rem] w-[30rem] bg-accent/45"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="aurora-blob bottom-[-18%] left-1/3 h-[26rem] w-[26rem] bg-primary/15"
          style={{ animationDelay: "-11s" }}
        />
        <div className="soft-grid absolute inset-0" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-24 pt-32 lg:min-h-[88vh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-20"
      >
        <div className="relative z-10 text-center lg:text-left">
          <motion.span
            variants={rise}
            className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Portfolio Demo · Burgers · Thickshakes
          </motion.span>

          {/* stylized wordmark */}
          <motion.div variants={rise} className="mt-7">
            <div className="flex select-none justify-center gap-[0.02em] lg:justify-start">
              {letters.map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  initial={{ opacity: 0, y: 36, rotate: -6 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.055 }}
                   className={`font-display text-[12vw] leading-[0.8] sm:text-6xl lg:text-[5rem] ${
                    i % 2 === 0 ? "text-gradient-crimson" : "text-outline-crimson"
                  }`}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-2 text-4xl leading-[0.95] text-foreground sm:text-5xl lg:text-6xl"
          >
            Sip Thick,{" "}
            <span className="relative inline-block">
              Bite Bold.
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/40 blur-[2px]" />
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0"
          >
            A fictional burger joint serving craft burgers, hand-pressed fries and outrageously
            thick shakes — created as a portfolio demo.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Button size="lg" variant="hero" asChild>
              <a href="#menu">Explore Menu</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="glass-panel rounded-full">
              <a href="#menu">View Menu</a>
            </Button>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-10 flex items-center justify-center gap-8 lg:justify-start"
          >
            {[
              { k: "4.8★", v: "Demo rating" },
              { k: "30+", v: "Shake flavours" },
              { k: "11am–11pm", v: "Open daily" },
            ].map((s) => (
              <div key={s.v} className="text-center lg:text-left">
                <p className="font-display text-2xl text-primary">{s.k}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.v}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D showcase in a glass frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-panel relative h-[46vh] min-h-[340px] w-full overflow-hidden lg:h-[64vh]">
            <div className="pointer-events-none absolute inset-x-8 -top-16 h-40 rounded-full bg-accent/40 blur-3xl" />
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
            <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Move your mouse
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* marquee ribbon */}
      <div className="relative border-y border-border/60 bg-primary/95 py-3 text-primary-foreground">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.3em]"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}