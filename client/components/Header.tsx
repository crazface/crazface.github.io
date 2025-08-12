import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="grid-container py-6">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link to="/" className="text-2xl font-bold text-foreground hover:text-foreground/80 transition-colors">
            Charlie Stamp
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link 
              to="/" 
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              My Work
            </Link>
            <Link 
              to="/about" 
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About me
            </Link>
            <Link 
              to="/contact" 
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact me
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
