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

  // Set project-branded class and data attribute after project loads
  useEffect(() => {
    const body = document.body;

    if (project?.brandTheme) {
      body.classList.add("project-branded");
      body.setAttribute("data-skip-theme", "true");
    } else {
      body.classList.remove("project-branded");
      body.removeAttribute("data-skip-theme");
    }
  }, [project]);

  // Cleanup on unmount so other pages get the global theme again
  useEffect(() => {
    return () => {
      if (project?.brandTheme) {
        const b = document.body;
        b.classList.remove("project-branded");
        b.removeAttribute("data-skip-theme");
        // Clear inline theme locks
        const root = document.documentElement;
        [
          "--project-bg",
          "--project-fg",
          "--project-primary",
          "--project-secondary",
          "--background",
          "--foreground",
          "--primary",
          "--secondary",
        ].forEach((k) => {
          root.style.removeProperty(k);
          document.body.style.removeProperty(k);
        });
      }
    };
  }, [project]);

  // ThemeLock effect - sets variables with !important and guards against late rewrites
  useEffect(() => {
    if (!project?.brandTheme) return;

    console.log(
      "Applying theme for project:",
      project.title,
      project.brandTheme,
    );

    const root = document.documentElement;
    const body = document.body;

    const COLORS = {
      bg: project.brandTheme.background,
      fg: project.brandTheme.text,
      primary: project.brandTheme.highlight,
      secondary: project.brandTheme.text,
    };

    // Set CSS variables with priority so later styles cannot override them
    const setVars = () => {
      // Set project-specific variables
      root.style.setProperty("--project-bg", COLORS.bg, "important");
      root.style.setProperty("--project-fg", COLORS.fg, "important");
      root.style.setProperty("--project-primary", COLORS.primary, "important");
      root.style.setProperty(
        "--project-secondary",
        COLORS.secondary,
        "important",
      );

      // Set direct color values to global tokens (not CSS variables)
      body.style.setProperty("--background", COLORS.bg, "important");
      body.style.setProperty("--foreground", COLORS.fg, "important");
      body.style.setProperty("--primary", COLORS.primary, "important");
      body.style.setProperty("--secondary", COLORS.secondary, "important");

      // Also set direct styles on body
      body.style.backgroundColor = COLORS.bg + " !important";
      body.style.color = COLORS.fg + " !important";
    };

    // Remove any global theme classes that could trigger css
    document.documentElement.classList.remove("dark", "light");

    setVars();

    // Guard for late scripts for 3 seconds
    let t = 0;
    const id = setInterval(() => {
      t += 1;
      setVars();
      if (t >= 10) clearInterval(id);
    }, 300);

    return () => clearInterval(id);
  }, [project?.brandTheme]);

  // Hide theme toggle for project pages with brandTheme
  useEffect(() => {
    if (!project?.brandTheme) return;

    const root = document.documentElement;
    root.style.setProperty("--theme-toggle-display", "none");

    return () => {
      root.style.removeProperty("--theme-toggle-display");
    };
  }, [project]);

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
      {/* Flicker prevention script */}
      {project?.brandTheme && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var b = document.body;
    b.classList.add("project-branded");
    b.setAttribute("data-skip-theme","true");
    var root = document.documentElement;
    if (!root.style.getPropertyValue("--project-bg")) {
      root.style.setProperty("--project-bg", "${project.brandTheme.background}");
      root.style.setProperty("--project-fg", "${project.brandTheme.text}");
      root.style.setProperty("--project-primary", "${project.brandTheme.highlight}");
      root.style.setProperty("--project-secondary", "${project.brandTheme.text}");
    }
  } catch(e){}
})();
            `,
          }}
        />
      )}
      {/* Header */}
      <Header />



      {/* Gallery Section */}
      <section className="grid-container pb-20" style={{ margin: "30px auto 0", padding: "0 24px 80px" }}>
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Use project.gallery if available, otherwise fall back to repeated project.image */}
            {(
              project.gallery && project.gallery.length > 0
                ? project.gallery
                : new Array(6).fill(project.image)
            ).map((src, idx) => {
              // Replace the third gallery item (index 2) with the Project Details box
              if (idx === 2) {
                return (
                  <div key="project-details" className="glass rounded-lg p-6 h-fit" style={{ marginBottom: "-2px" }}>
                    <div className="text-2xl font-black text-foreground mb-4">
                      {project.title}
                    </div>
                    <div className="text-base font-normal text-foreground mb-2" style={{ fontSize: "18px", fontWeight: 400, lineHeight: "28px", textTransform: "capitalize" }}>
                      {project.year}
                    </div>
                    <div className="text-base font-thin text-muted-foreground mb-4" style={{ fontSize: "18px", fontWeight: 400, lineHeight: "28px" }}>
                      {project.description}
                    </div>

                    <div className="" style={{ fontWeight: 400 }}>
                      <div>
                        <div className="text-sm font-bold text-muted-foreground mb-1" style={{ color: "rgb(103,94,76)", fontSize: "14px", fontWeight: 700, lineHeight: "20px", marginBottom: "4px" }}>
                          Role
                        </div>
                        <div className="text-lg text-foreground">
                          {project.role || "Creative Director"}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm font-bold text-muted-foreground mb-1" style={{ color: "rgb(103,94,76)", fontSize: "14px", fontWeight: 700, lineHeight: "20px", marginBottom: "4px" }}>
                          Type
                        </div>
                        <div className="text-lg text-foreground capitalize">{project.type}</div>
                      </div>

                      {project.tools && (
                        <div className="mt-4">
                          <div className="text-sm font-bold text-muted-foreground mb-2">
                            Tools
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-3 py-1 rounded-full text-xs bg-white/50 text-foreground border border-white/20"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className="glass rounded-lg overflow-hidden hover:shadow-glass-lg transition-all duration-300"
                  style={project.type === "Photography" ? { aspectRatio: "2 / 3" } : undefined}
                >
                  <img
                    src={src}
                    alt={`${project.title} gallery item ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              );
            })}
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
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-black transition-all duration-200 focus-visible project-cta-button"
              style={{
                backgroundColor: project?.brandTheme
                  ? project.brandTheme.background
                  : "hsl(var(--primary))",
                color: project?.brandTheme
                  ? project.brandTheme.highlight
                  : "white",
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
