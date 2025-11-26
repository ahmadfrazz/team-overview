import { Link } from "react-router-dom";
import { ThemeToggle } from "../theme_toggle/theme_toggle";

/**
 * Header component
 *
 * Uses shadcn primitives where appropriate. Keep header minimal and focused.
 *
 * This header shows:
 * - App title and logo area
 * - Search input placeholder
 * - Quick links and profile menu
 */

const navItems = [
  {
    id: 1,
    link: "/overview",
    label: "Overview",
  },
  {
    id: 2,
    link: "/sessions",
    label: "Sessions",
  },
];

export default function Header() {
  return (
    <header className="max-w-5xl mx-auto mt-4 rounded-full w-full border border-foreground/15 bg-background/60 backdrop-blur-sm sticky top-4 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/overview" aria-label="Home">
          <div className="font-semibold hover:scale-105 transition-all">
            Dashboard
          </div>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-8">
          {navItems.map((nav) => {
            const { link, label } = nav;
            return (
              <Link
                key={label}
                to={link}
                className="text-foreground/90 hover:text-foreground hover:scale-105 transition-all"
                aria-label={label}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
