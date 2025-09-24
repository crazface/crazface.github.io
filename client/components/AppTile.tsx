import { useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "@/lib/projects";

interface AppTileProps {
  project: Project;
}

export function AppTile({ project }: AppTileProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Explicit thumbnail overrides for specific video projects (provided by user)
  const videoThumbnailOverrides: Record<string, string> = {
    "leavers-video":
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3ee592a895db4d8a8c0a902e5f25898b",
    "super-friends-intro":
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fb5fdf99633e747bb9100dce5b8b9bc2b",
    "pisk-cola-ad":
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F9150b281bbdc47abb9da45f60cfee65e",
    "smp-trailer":
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F0ddc6b3f41c44bbc9151d952adbdaf5b",
    "french-toast-tutorial":
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F10b77034320d4661971708b64b48026e",
  };

  // Aspect ratios per project type: Video Editing uses 16:9, Photography uses 2:3 (portrait), otherwise square
  const aspectRatioClass =
    project.type === "Video Editing" ? "aspect-video" : "aspect-square";

  // For photography, use the CSS aspect-ratio property instead of a utility class
  const aspectStyle: React.CSSProperties | undefined =
    project.type === "Photography" ? { aspectRatio: "2 / 3" } : undefined;

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
          transition-all duration-500 ease-out cursor-pointer bg-gradient-to-br from-slate-800 to-slate-900
          ${isHovered ? "transform scale-110 -translate-y-4" : "hover:scale-105"}
        `}
        style={{
          ...(aspectStyle || {}),
          boxShadow: isHovered
            ? "0 30px 60px -12px rgba(0,0,0,0.5), 0 12px 24px -8px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)"
            : "0 20px 40px -12px rgba(0,0,0,0.3), 0 8px 16px -8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.05)",
        }}
      >
        {/* Enhanced top highlight for glossy effect */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 via-white/25 to-transparent rounded-t-[4.5rem]" />

        {/* Additional glossy shine overlay */}
        <div className="absolute top-6 left-6 right-6 h-1/3 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-full blur-sm" />

        {/* Enhanced side highlights */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/15 via-black/5 to-transparent" />

        {/* Enhanced bottom shadow for depth */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 via-black/15 to-transparent rounded-b-[4.5rem]" />

        {/* Inner shadow for realism */}
        <div
          className="absolute inset-0 rounded-[4.5rem] shadow-inner"
          style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.1)" }}
        />

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

        {/* SVG Image Content - Primary Visual */}
        {project.type === "Video Editing"
          ? (() => {
              const src =
                (project.gallery && project.gallery.length > 0
                  ? project.gallery[0]
                  : project.image || project.appIcon) || "";
              const override = videoThumbnailOverrides[project.id];
              if (override) {
                return (
                  <img
                    src={override}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover drop-shadow-xl z-10"
                    style={{ objectPosition: "center" }}
                  />
                );
              }

              const isYoutube = /youtu(?:\.be|be\.com)/.test(src);
              const isHostedVideo =
                /\.(mp4|webm|mov)(\?|$)/i.test(src) ||
                /o\/assets|compressed\?/.test(src);

              if (isYoutube) {
                const idMatch = src.match(
                  /(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/,
                );
                const videoId = idMatch ? idMatch[1] : null;
                const thumb =
                  project.appIcon ||
                  (videoId
                    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                    : project.image);
                return (
                  <img
                    src={thumb}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover drop-shadow-xl z-10"
                    style={{ objectPosition: "center" }}
                  />
                );
              }

              if (isHostedVideo) {
                return (
                  <video
                    src={src}
                    className="absolute inset-0 w-full h-full object-cover drop-shadow-xl z-10"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                );
              }

              // Fallback to appIcon or image
              return (
                <img
                  src={project.appIcon || project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-xl z-10"
                  style={{
                    filter: isHovered
                      ? "drop-shadow(0 15px 35px rgba(0,0,0,0.4)) drop-shadow(0 6px 16px rgba(0,0,0,0.3)) drop-shadow(0 1px 3px rgba(255,255,255,0.2))"
                      : "drop-shadow(0 10px 25px rgba(0,0,0,0.3)) drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
                  }}
                />
              );
            })()
          : (project.appIcon || project.image) && (
              <img
                src={project.appIcon || project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-contain drop-shadow-xl z-10"
                style={{
                  filter: isHovered
                    ? "drop-shadow(0 15px 35px rgba(0,0,0,0.4)) drop-shadow(0 6px 16px rgba(0,0,0,0.3)) drop-shadow(0 1px 3px rgba(255,255,255,0.2))"
                    : "drop-shadow(0 10px 25px rgba(0,0,0,0.3)) drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
                }}
              />
            )}

        {/* Hover Overlay with Bounce Effect */}
        <div
          className={`
            absolute inset-0 bg-black/30 flex items-end p-6 pb-8 z-20
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
            <div className="text-white/90 text-sm font-bold drop-shadow-md mb-2">
              {project.year}
            </div>
            {project.description && (
              <div className="text-white/80 text-sm leading-relaxed drop-shadow-md line-clamp-2">
                {project.description}
              </div>
            )}
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
