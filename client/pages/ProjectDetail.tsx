import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById, Project } from "@/lib/projects";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
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
    if (project?.colors) {
      // Apply project theming to the page
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
    }

    // Cleanup on unmount
    return () => {
      document.body.style.background = "";
      const root = document.documentElement;
      root.style.removeProperty("--project-primary");
      root.style.removeProperty("--project-secondary");
      root.style.removeProperty("--project-accent");
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
        <div className="grid-container pt-24 flex items-center justify-center">
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
      <section className="grid-container pt-24 pb-20">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
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
              to="/"
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
