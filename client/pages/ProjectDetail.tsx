import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById, Project } from "@/lib/projects";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProject = getProjectById(id);
      setProject(foundProject || null);
      setIsLoaded(true);
    }
  }, [id]);

  useEffect(() => {
    if (project?.brandTheme) {
      // Apply custom brand theme to the page
      const root = document.documentElement;

      // Convert hex to HSL for CSS custom properties
      const hexToHsl = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }

        return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
      };

      // Use a small delay to ensure this runs after ThemeProvider's useEffect
      const applyBrandTheme = () => {
        // Set custom brand theme colors with proper HSL values
        const backgroundHsl = hexToHsl(project.brandTheme.background);
        const highlightHsl = hexToHsl(project.brandTheme.highlight);

        // Set CSS custom properties with higher specificity
        root.style.setProperty("--background", backgroundHsl, "important");
        root.style.setProperty("--foreground", highlightHsl, "important");
        root.style.setProperty("--muted-foreground", highlightHsl, "important");
        root.style.setProperty("--primary", highlightHsl, "important");
        root.style.setProperty("--primary-foreground", backgroundHsl, "important");
        root.style.setProperty("--accent", highlightHsl, "important");
        root.style.setProperty("--accent-foreground", backgroundHsl, "important");
        root.style.setProperty("--card", backgroundHsl, "important");
        root.style.setProperty("--card-foreground", highlightHsl, "important");
        root.style.setProperty("--border", highlightHsl, "important");
        root.style.setProperty("--secondary", backgroundHsl, "important");
        root.style.setProperty("--secondary-foreground", highlightHsl, "important");
        root.style.setProperty("--muted", backgroundHsl, "important");
        root.style.setProperty("--popover", backgroundHsl, "important");
        root.style.setProperty("--popover-foreground", highlightHsl, "important");

        // Remove any existing theme classes that might conflict
        root.classList.remove("light", "dark");
        document.body.classList.remove("light", "dark");

        // Add brand class first
        document.body.classList.add("project-branded");

        // Set solid background color with !important via style attribute
        document.body.style.setProperty("background", project.brandTheme.background, "important");
        document.body.style.setProperty("background-color", project.brandTheme.background, "important");
        document.body.style.setProperty("color", project.brandTheme.highlight, "important");

        // Also set on root for cascading
        root.style.setProperty("background", project.brandTheme.background, "important");
        root.style.setProperty("background-color", project.brandTheme.background, "important");
        root.style.setProperty("color", project.brandTheme.highlight, "important");

        // Hide theme toggle for branded projects
        root.style.setProperty("--theme-toggle-display", "none", "important");

        // Force multiple reflows to ensure styles are applied
        void root.offsetHeight;
        void document.body.offsetHeight;

        // Double-check and reapply if needed
        setTimeout(() => {
          if (document.body.style.backgroundColor !== project.brandTheme.background) {
            document.body.style.setProperty("background-color", project.brandTheme.background, "important");
            document.body.style.setProperty("background", project.brandTheme.background, "important");
          }
        }, 100);
      };

      // Apply immediately and after a short delay to override ThemeProvider
      applyBrandTheme();
      setTimeout(applyBrandTheme, 50);
      setTimeout(applyBrandTheme, 150);

      // Set up a MutationObserver to prevent ThemeProvider from adding theme classes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target as HTMLElement;
            if (target === root && document.body.classList.contains("project-branded")) {
              // If theme classes were added back, remove them
              if (root.classList.contains("light") || root.classList.contains("dark")) {
                root.classList.remove("light", "dark");
                // Reapply brand theming
                setTimeout(applyBrandTheme, 0);
              }
            }
          }
        });
      });

      observer.observe(root, {
        attributes: true,
        attributeFilter: ['class']
      });

    } else if (project?.colors) {
      // Apply default project theming for non-branded projects
      const root = document.documentElement;
      root.style.setProperty("--project-primary", project.colors.primary);
      root.style.setProperty("--project-secondary", project.colors.secondary);
      root.style.setProperty("--project-accent", project.colors.accent);

      // Set background gradient
      document.body.style.background = `
        linear-gradient(
          135deg,
          ${project.colors.primary}08 0%,
          ${project.colors.secondary}08 100%
        ),
        hsl(var(--background))
      `;

      // Show theme toggle for non-branded projects
      root.style.setProperty("--theme-toggle-display", "flex");
    }

    // Cleanup on unmount
    return () => {
      const root = document.documentElement;

      // Disconnect the observer if it exists
      if (observer) {
        observer.disconnect();
      }

      // Remove brand theming class first
      document.body.classList.remove("project-branded");

      // Clear all brand-specific styles
      document.body.style.removeProperty("background");
      document.body.style.removeProperty("background-color");
      document.body.style.removeProperty("color");
      root.style.removeProperty("background");
      root.style.removeProperty("background-color");
      root.style.removeProperty("color");

      // Reset all custom properties
      root.style.removeProperty("--project-primary");
      root.style.removeProperty("--project-secondary");
      root.style.removeProperty("--project-accent");
      root.style.removeProperty("--background");
      root.style.removeProperty("--foreground");
      root.style.removeProperty("--muted-foreground");
      root.style.removeProperty("--primary");
      root.style.removeProperty("--primary-foreground");
      root.style.removeProperty("--accent");
      root.style.removeProperty("--accent-foreground");
      root.style.removeProperty("--card");
      root.style.removeProperty("--card-foreground");
      root.style.removeProperty("--border");
      root.style.removeProperty("--secondary");
      root.style.removeProperty("--secondary-foreground");
      root.style.removeProperty("--muted");
      root.style.removeProperty("--popover");
      root.style.removeProperty("--popover-foreground");
      root.style.removeProperty("--theme-toggle-display");

      // Restore default theme class and trigger theme provider
      const currentTheme = localStorage.getItem("portfolio-theme") || "light";
      root.classList.remove("light", "dark");
      if (currentTheme === "dark") {
        root.classList.add("dark");
      }
    };
  }, [project]);

  // Ensure theme toggle is restored when component unmounts
  useEffect(() => {
    return () => {
      const root = document.documentElement;
      root.style.setProperty("--theme-toggle-display", "flex");
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass rounded-lg p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="grid-container pt-32 flex items-center justify-center">
          <div className="glass rounded-lg p-8 text-center max-w-md">
            <h1 className="text-3xl font-black text-foreground mb-4">
              Project Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-lg font-bold text-foreground hover:bg-white/80 hover:shadow-glass transition-all duration-200 focus-visible"
            >
              Back to Work
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="grid-container pt-32 pb-20">
        <div
          className={`
            animate-slide-up
            ${isLoaded ? "opacity-100" : "opacity-0"}
          `}
        >
          {/* Hero Image */}
          <div className="relative rounded-lg overflow-hidden shadow-glass-lg mb-12 aspect-video lg:aspect-[21/9]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 gradient-smooth gradient-with-noise"
              style={{
                background: `linear-gradient(
                  to top,
                  rgba(0,0,0,0.3) 0%,
                  rgba(6,6,6,0.25) 16%,
                  rgba(12,12,12,0.20) 32%,
                  rgba(8,8,8,0.15) 48%,
                  rgba(4,4,4,0.08) 64%,
                  rgba(2,2,2,0.04) 80%,
                  transparent 100%
                )`,
              }}
            />
          </div>

          {/* Project Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-5xl font-black leading-none tracking-tight text-foreground mb-4">
                {project.title}
              </h1>
              <p className="text-lg font-normal leading-relaxed text-muted-foreground">
                {project.description ||
                  "A comprehensive look at this creative project, exploring the process, challenges, and outcomes that shaped the final result."}
              </p>
            </div>

            {/* Project Meta */}
            <div className="glass rounded-lg p-6 h-fit">
              <h3 className="text-2xl font-black text-foreground mb-4">
                Project Details
              </h3>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-bold text-muted-foreground mb-1">
                    Role
                  </dt>
                  <dd className="text-lg text-foreground">
                    {project.role || "Creative Director"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-bold text-muted-foreground mb-1">
                    Year
                  </dt>
                  <dd className="text-lg text-foreground">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-sm font-bold text-muted-foreground mb-1">
                    Type
                  </dt>
                  <dd className="text-lg text-foreground capitalize">
                    {project.type}
                  </dd>
                </div>
                {project.tools && (
                  <div>
                    <dt className="text-sm font-bold text-muted-foreground mb-2">
                      Tools
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 rounded-full text-xs bg-white/50 text-foreground border border-white/20"
                        >
                          {tool}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="grid-container pb-20">
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-black text-foreground mb-8">Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-lg p-8">
              <h3 className="text-2xl font-black text-foreground mb-4">
                Problem
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every project begins with understanding the core challenge. This
                project required balancing creative expression with functional
                requirements while maintaining brand consistency.
              </p>
            </div>
            <div className="glass rounded-lg p-8">
              <h3 className="text-2xl font-black text-foreground mb-4">
                Solution
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through iterative design and close collaboration, we developed a
                comprehensive approach that addressed all stakeholder needs
                while pushing creative boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="grid-container pb-20">
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-3xl font-black text-foreground mb-8">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder gallery items */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="glass rounded-lg overflow-hidden aspect-square hover:shadow-glass-lg transition-all duration-300"
              >
                <img
                  src={project.image}
                  alt={`${project.title} gallery item ${item}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="grid-container pb-section">
        <div
          className="glass rounded-lg p-12 text-center animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-3xl font-black text-foreground mb-4">
            Interested in working together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always excited to collaborate on new projects and bring creative
            visions to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-black text-white transition-all duration-200 focus-visible"
              style={{
                backgroundColor: "var(--project-primary, hsl(var(--primary)))",
              }}
            >
              Get in Touch
              <ExternalLink className="w-4 h-4" />
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center justify-center gap-2 glass rounded-full px-8 py-4 text-lg font-black text-foreground hover:bg-white/80 hover:shadow-glass transition-all duration-200 focus-visible"
            >
              View More Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
