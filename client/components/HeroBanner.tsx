import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/lib/projects";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

// Slideshow images - cycling through your uploaded images
const slideshowImages = [
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fb54b108017e1495eb0225dcb838b54ff",
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3fda60cc5b304727bcc7af03cfb70017",
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fbbf61436a87a4311977466dadb6d7b81",
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F8fb873ddb68244358cd9b6bcfc55dbca",
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F6ed11397f2e443e29f63643c9ccf61aa",
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fb581e39352234001a4e0c4b3f53a1fe6",
];

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  // Auto-advance the banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length,
    );
  };

  const currentImage = slideshowImages[currentIndex];
  // Map each slide to a project id (or null for linking back to the front page)
  const slideProjectIds = [
    "old-west-starter-kit",
    "regenb",
    "portrait-series",
    null, // link back to front page temporarily
    "fuzed",
    "pisk-kitchen",
  ];

  const currentProjectId = slideProjectIds[currentIndex];
  const currentProject = currentProjectId
    ? projects.find((p) => p.id === currentProjectId) || projects[0]
    : null;
  const currentLink = currentProjectId ? `/project/${currentProjectId}` : "/";

  return (
    <div className="relative w-full h-[750px] md:h-[950px] lg:h-[1100px] flex items-start justify-center px-6 pt-32">
      {/* Transparent background to inherit page background */}

      {/* Widget Container */}
      <div
        className="relative w-full max-w-6xl aspect-video tile-glass rounded-[3rem] overflow-hidden group cursor-pointer"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0,0,0,0.25), 0 10px 20px -5px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.05)",
          transform: "scale(1)", // Override tile-glass hover scaling
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1)"; // Force scale to remain 1
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            key={`slide-${currentIndex}`}
            src={currentImage}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-1000 ease-out"
            style={{
              transform: "scale(1)",
            }}
          />
          {/* Enhanced overlay with seamless band-free transitions */}
          <div
            className="absolute inset-0 gradient-smooth gradient-with-noise"
            style={{
              background: `linear-gradient(
                to top,
                rgba(0,0,0,0.75) 0%,
                rgba(8,8,8,0.65) 14%,
                rgba(16,16,16,0.55) 28%,
                rgba(12,12,12,0.45) 42%,
                rgba(6,6,6,0.30) 56%,
                rgba(3,3,3,0.15) 70%,
                rgba(1,1,1,0.05) 84%,
                transparent 100%
              )`,
            }}
          />
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
          <div
            className={`
              transform transition-all duration-500 ease-out
              ${isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90"}
            `}
          >
            <div className="mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                Creative Portfolio
              </h2>
              <p className="text-white/80 text-lg mb-6 max-w-2xl">
                Explore my latest work in brand identity, video editing, and
                photography
              </p>
            </div>

            {/* CTA Button */}
            <Link
              to={`/project/${currentProject.id}`}
              className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
              style={{
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
            >
              <Play className="w-5 h-5" />
              View Project
            </Link>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slideshowImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/70"
                }
              `}
            />
          ))}
        </div>

        {/* Enhanced glow effect with seamless gradient */}
        <div
          className={`
            absolute inset-0 -z-10 rounded-xl blur-xl transition-opacity duration-300 gradient-smooth gradient-with-noise
            ${isHovered ? "opacity-30" : "opacity-0"}
          `}
          style={{
            background: `linear-gradient(
              135deg,
              rgba(103, 94, 76, 0.5) 0%,
              rgba(115, 105, 88, 0.45) 16%,
              rgba(125, 115, 98, 0.4) 32%,
              rgba(120, 110, 93, 0.35) 48%,
              rgba(110, 100, 83, 0.3) 64%,
              rgba(100, 90, 73, 0.25) 80%,
              rgba(90, 80, 63, 0.2) 100%
            )`,
          }}
        />
      </div>

      {/* No fade - maintaining flat background */}
    </div>
  );
}
