import { useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "@/lib/projects";

interface AppTileProps {
  project: Project;
}

export function AppTile({ project }: AppTileProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Use 16:9 aspect ratio for Video Editing projects
  const aspectRatioClass =
    project.type === "Video Editing" ? "aspect-video" : "aspect-square";

  return (
    <Link
      to={`/project/${project.id}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full ${aspectRatioClass} rounded-[4.5rem] overflow-hidden
          transition-all duration-500 ease-out cursor-pointer
          ${
            isHovered ? "transform scale-110 -translate-y-4" : "hover:scale-105"
          }
        `}
        style={{
          background: `linear-gradient(135deg, ${project.colors?.primary || "#6366f1"}, ${project.colors?.secondary || "#8b5cf6"})`,
          boxShadow: isHovered
            ? `0 25px 50px -12px ${project.colors?.primary}40, 0 8px 16px -8px ${project.colors?.primary}60, inset 0 1px 0 rgba(255,255,255,0.3)`
            : `0 20px 40px -12px ${project.colors?.primary}30, 0 8px 16px -8px ${project.colors?.primary}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
        }}
      >
        {/* Top highlight for 3D effect */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-t-[4.5rem]" />

        {/* Side highlights */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/20 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent" />

        {/* Bottom shadow for depth */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />

        {/* Bubble texture overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 2px, transparent 2px),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 1px, transparent 1px),
              radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "30px 30px, 25px 25px, 35px 35px",
          }}
        />

        {/* App Icon Content */}
        <div className="absolute inset-0 flex items-center justify-center p-8 z-10" />
        {project.appIcon && (
          <img
            src={project.appIcon}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-contain drop-shadow-lg z-10"
          />
        )}

        {/* Hover Overlay with Bounce Effect */}
        <div
          className={`
            absolute inset-0 bg-black/20 flex items-end p-6 z-20
            transition-all duration-500 ease-out
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
        >
          <div
            className={`
              text-white transform transition-all duration-500 ease-out
              ${isHovered ? "translate-y-0 scale-100" : "translate-y-4 scale-95"}
            `}
          >
            <div className="font-black text-xl leading-tight mb-1 drop-shadow-lg">
              {project.title}
            </div>
            <div className="text-white/90 text-sm font-bold drop-shadow-md">
              {project.year}
            </div>
          </div>
        </div>

        {/* Extra bubble effects on hover */}
        {isHovered && (
          <>
            <div className="absolute top-4 right-4 w-3 h-3 bg-white/50 rounded-full animate-ping" />
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
          </>
        )}
      </div>
    </Link>
  );
}
