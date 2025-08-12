import { useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();

  useEffect(() => {
    if (displayChildren !== children) {
      setIsLoading(true);
      
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setIsLoading(false);
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [children, displayChildren]);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Page content */}
      <div
        className={`
          transition-all duration-300 ease-out
          ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}
      >
        {displayChildren}
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="glass rounded-lg p-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-text-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-body text-text-primary">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
