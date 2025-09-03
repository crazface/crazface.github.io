import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/work" && location.pathname === "/") return false; // Landing page shouldn't highlight work
    return location.pathname === path || location.pathname.startsWith(path);
  };

  // Check if we're on a project page
  const isProjectPage = location.pathname.startsWith("/project/");

  return (
    <header
      id="siteHeader"
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50"
      style={{
        position: 'fixed !important' as any,
        top: '0 !important',
        left: '0 !important',
        right: '0 !important',
        zIndex: '9999 !important',
        transform: 'translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="grid-container py-6">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            to="/"
            className="text-3xl font-stamp text-foreground hover:text-foreground/80 transition-all duration-300 hover:scale-105"
          >
            <span>Charlie Stamp</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link
              to="/work"
              className={`
                text-lg font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative
                ${
                  isActive("/work")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              My Work
            </Link>
            <Link
              to="/about"
              className={`
                text-lg font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative
                ${
                  isActive("/about")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              About me
            </Link>
            <Link
              to="/contact"
              className={`
                text-lg font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative
                ${
                  isActive("/contact")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              Contact me
            </Link>
            {!isProjectPage && <ThemeToggle />}
          </nav>
        </div>
      </div>
    </header>
  );
}
