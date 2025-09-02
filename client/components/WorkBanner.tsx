import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/lib/projects";

export function WorkBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance the banner every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Get 3 projects to show: current, next, and the one after
  const visibleProjects = [
    projects[currentIndex],
    projects[(currentIndex + 1) % projects.length],
    projects[(currentIndex + 2) % projects.length],
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm border border-foreground/10 gradient-smooth gradient-with-noise"
         style={{
           background: `linear-gradient(
             to right,
             rgba(0,0,0,0.12) 0%,
             rgba(6,6,6,0.20) 16%,
             rgba(14,14,14,0.28) 32%,
             rgba(20,20,20,0.35) 48%,
             rgba(16,16,16,0.32) 64%,
             rgba(10,10,10,0.28) 80%,
             rgba(4,4,4,0.38) 100%
           )`
         }}>
      <div
        className="absolute inset-0 animate-pulse gradient-smooth"
        style={{
          background: `linear-gradient(
            to right,
            transparent 0%,
            hsla(var(--foreground), 0.02) 25%,
            hsla(var(--foreground), 0.08) 50%,
            hsla(var(--foreground), 0.02) 75%,
            transparent 100%
          )`
        }}
      />

      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-black text-foreground text-shadow-medium">
            Recent Work
          </h3>
          <Link
            to="/work"
            className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors text-shadow-soft"
          >
            View All →
          </Link>
        </div>

        <div className="flex gap-4 overflow-hidden">
          {visibleProjects.map((project, index) => (
            <Link
              key={`${project.id}-${currentIndex}-${index}`}
              to={`/project/${project.id}`}
              className={`
                relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-700 ease-out group
                ${index === 0 ? "w-48 h-32" : index === 1 ? "w-40 h-28" : "w-32 h-24"}
                hover:scale-105 hover:-translate-y-1
              `}
              style={{
                background: `linear-gradient(135deg, ${project.colors?.primary || "#6366f1"}, ${project.colors?.secondary || "#8b5cf6"})`,
                boxShadow: `0 8px 24px ${project.colors?.primary}40`,
                animation: index === 0 ? "slide-in 0.7s ease-out" : "",
              }}
            >
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center">
                {project.appIcon ? (
                  <img
                    src={project.appIcon}
                    alt={project.title}
                    className="w-8 h-8 mb-2"
                  />
                ) : (
                  <div className="text-white font-black text-xs mb-1 text-shadow-soft">
                    {project.title}
                  </div>
                )}
                <div className="text-white/80 text-xs font-bold uppercase tracking-wider text-shadow-soft">
                  {project.type}
                </div>
              </div>

              {/* Overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          ))}
        </div>

        {/* Progress indicators */}
        <div className="flex gap-2 mt-4 justify-center">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${
                  index === currentIndex
                    ? "bg-foreground shadow-lg"
                    : "bg-foreground/30 hover:bg-foreground/50"
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
