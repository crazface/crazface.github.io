import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="grid-container py-6">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            to="/"
            className="text-3xl font-black text-foreground hover:text-foreground/80 transition-all duration-300 hover:scale-105 text-shadow-medium"
          >
            Charlie Stamp
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link
              to="/work"
              className="text-lg font-bold text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              My Work
            </Link>
            <Link
              to="/about"
              className="text-lg font-bold text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              About me
            </Link>
            <Link
              to="/contact"
              className="text-lg font-bold text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              Contact me
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
