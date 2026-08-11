import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer id="visit" className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-4xl text-cheddar">Thicksip</p>
          <p className="mt-3 max-w-xs text-sm text-cream/70">
            Craft burgers, hand-pressed fries and bold milkshakes. Kalol's favourite hangout.
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-cheddar">Visit Us</h3>
          <address className="mt-3 not-italic text-sm leading-relaxed text-cream/80">
            Tirupati Empire, Amrut Society,
            <br />
            Ambika Nagar, Kalol,
            <br />
            Gujarat 382721
          </address>
          <p className="mt-3 text-sm text-cream/80">Monday – Sunday: 10:00 AM – 10:00 PM</p>
        </div>

        <div>
          <h3 className="text-2xl text-cheddar">Find Us Online</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="text-cream/80 transition-colors hover:text-cheddar" href="https://www.zomato.com" target="_blank" rel="noreferrer">
                Order on Zomato
              </a>
            </li>
            <li>
              <a className="text-cream/80 transition-colors hover:text-cheddar" href="https://www.swiggy.com" target="_blank" rel="noreferrer">
                Order on Swiggy
              </a>
            </li>
            <li>
              <a
                className="text-cream/80 transition-colors hover:text-cheddar"
                href="https://www.instagram.com/thicksipofficial"
                target="_blank"
                rel="noreferrer"
              >
                Instagram @thicksipofficial
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15 px-5 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Thicksip Cafe. All rights reserved.</p>
          <Link to="/admin" className="transition-colors hover:text-cheddar">
            Owner login
          </Link>
        </div>
      </div>
    </footer>
  );
}