import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/work" && location.pathname === "/") return false; // Landing page shouldn't highlight work
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="grid-container py-6">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            to="/"
            className="text-3xl font-black text-foreground hover:text-foreground/80 transition-all duration-300 hover:scale-105"
          >
            Charlie Stamp
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link
              to="/work"
              className={`
                text-lg font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative
                ${
                  isActive("/work")
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
              style={
                isActive("/work")
                  ? {
                      textShadow:
                        "0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.4)",
                      filter: "drop-shadow(0 0 8px rgba(255, 107, 53, 0.6))",
                    }
                  : {}
              }
            >
              My Work
            </Link>
            <Link
              to="/about"
              className={`
                text-lg font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative
                ${
                  isActive("/about")
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
              style={
                isActive("/about")
                  ? {
                      textShadow:
                        "0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.4)",
                      filter: "drop-shadow(0 0 8px rgba(255, 107, 53, 0.6))",
                    }
                  : {}
              }
            >
              About me
            </Link>
            <Link
              to="/contact"
              className={`
                text-lg font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative
                ${
                  isActive("/contact")
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
              style={
                isActive("/contact")
                  ? {
                      textShadow:
                        "0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.4)",
                      filter: "drop-shadow(0 0 8px rgba(255, 107, 53, 0.6))",
                    }
                  : {}
              }
            >
              Contact me
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
