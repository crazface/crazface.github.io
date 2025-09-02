import { useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "@/lib/projects";

interface ProjectTileProps {
  project: Project;
}

export function ProjectTile({ project }: ProjectTileProps) {
  const [isHovered, setIsHovered] = useState(false);

  const gridSpanClass = `col-span-${project.gridSpan.cols} row-span-${project.gridSpan.rows}`;
  const aspectRatioClass =
    project.type === "branding"
      ? "aspect-square"
      : project.type === "video"
        ? "aspect-video"
        : "aspect-portrait";

  return (
    <Link
      to={`/project/${project.id}`}
      className={`
        group relative overflow-hidden rounded-lg tile-glass
        transition-all duration-300 ease-out
        ${gridSpanClass}
        ${aspectRatioClass}
        cursor-interactive focus-visible
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Enhanced overlay with seamless band-free gradient */}
        <div
          className="absolute inset-0 gradient-smooth gradient-with-noise"
          style={{
            background: `linear-gradient(
              to top,
              rgba(0,0,0,0.3) 0%,
              rgba(6,6,6,0.25) 16%,
              rgba(12,12,12,0.18) 32%,
              rgba(8,8,8,0.12) 48%,
              rgba(4,4,4,0.06) 64%,
              rgba(2,2,2,0.03) 80%,
              transparent 100%
            )`,
          }}
        />
      </div>

      {/* Media Type Badge */}
      <div className="absolute top-3 right-3 z-20">
        <span className="glass rounded-full px-2 py-1 text-xs font-medium text-text-primary">
          {project.type}
        </span>
      </div>

      {/* Hover Overlay with Project Info */}
      <div
        className={`
          absolute inset-0 z-10 flex flex-col justify-end p-6
          transition-all duration-300 ease-out gradient-smooth gradient-with-noise
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        style={{
          background: isHovered
            ? `linear-gradient(
                to top,
                rgba(0,0,0,0.75) 0%,
                rgba(8,8,8,0.65) 14%,
                rgba(16,16,16,0.55) 28%,
                rgba(12,12,12,0.45) 42%,
                rgba(6,6,6,0.30) 56%,
                rgba(3,3,3,0.18) 70%,
                rgba(1,1,1,0.08) 84%,
                transparent 100%
              )`
            : "transparent",
        }}
      >
        <div
          className={`
            transform transition-all duration-300 ease-out
            ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
        >
          <h3 className="text-2xl font-semibold leading-snug tracking-tight text-white mb-1">
            {project.title}
          </h3>
          <p className="text-sm font-normal leading-relaxed text-white/80">
            {project.year}
          </p>
          {project.description && (
            <p className="text-sm font-normal leading-relaxed text-white/70 mt-2 line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div
        className={`
          absolute inset-0 -z-10 rounded-lg blur-xl opacity-0 transition-opacity duration-300
          ${isHovered ? "opacity-20" : "opacity-0"}
        `}
        style={{
          background: `linear-gradient(135deg, ${project.colors?.primary || "#6366f1"}, ${project.colors?.secondary || "#8b5cf6"})`,
        }}
      />
    </Link>
  );
}
