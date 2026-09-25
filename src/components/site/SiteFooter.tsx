import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer id="visit" className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-4xl text-cheddar">Burger Barn — Demo</p>
          <p className="mt-3 max-w-xs text-sm text-cream/70">
            A fictional restaurant concept featuring craft burgers, hand-pressed fries and bold milkshakes.
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-cheddar">Demo Location</h3>
          <address className="mt-3 not-italic text-sm leading-relaxed text-cream/80">
            123 Sample Street,
            <br />
            Example District, Demo City
            <br />
            Fictional address — not a real venue
          </address>
          <p className="mt-3 text-sm text-cream/80">Monday – Sunday: 10:00 AM – 10:00 PM</p>
        </div>

        <div>
          <h3 className="text-2xl text-cheddar">Explore the Demo</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="text-cream/80 transition-colors hover:text-cheddar" href="#menu">Browse the sample menu</a>
            </li>
            <li>
              <a className="text-cream/80 transition-colors hover:text-cheddar" href="#gallery">View fictional imagery</a>
            </li>
            <li>
              <a className="text-cream/80 transition-colors hover:text-cheddar" href="#reviews">Read sample reviews</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15 px-5 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs text-cream/60">
          <div>
            <p>© {new Date().getFullYear()} Burger Barn — Demo.</p>
            <p className="mt-1 max-w-2xl text-cream/80">
              This is a fictional demo project built for portfolio purposes. Not affiliated with any real business.
            </p>
          </div>
          <Link to="/admin" className="transition-colors hover:text-cheddar">
            Owner login
          </Link>
        </div>
      </div>
    </footer>
  );
}