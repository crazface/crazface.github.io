import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/lib/projects";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// Slideshow images - cycling through your uploaded images
const slideshowImages = [
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F0c46a5189a454baeab8168bdbbbda7cd",
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F5b48b2e2a302445086152ef3f955c4b7",
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F899cbfa26eb74d69a887518b0d22cf50",
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fa33c12abedad4fa397d36070c4794f89",
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F19cf46053bd24a5893dc8071a2ba72d0",
  "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fae5bb5f46447457f98e19d44628af8de",
];

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
  const currentProject = projects[0]; // Use first project for button link

  return (
    <div className="relative w-full h-[750px] md:h-[950px] lg:h-[1100px] flex items-start justify-center px-6 pt-32">
      {/* Subtle background gradient as fallback */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(240,240,235,0.5) 0%, rgba(240,240,235,0.8) 100%)`,
        }}
      />

      {/* Widget Container */}
      <div
        className="relative w-full max-w-6xl aspect-video tile-glass rounded-[3rem] overflow-hidden group cursor-pointer"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25), 0 10px 20px -5px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.05)",
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
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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
                Explore my latest work in brand identity, video editing, and photography
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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
              <Link
                to="/work"
                className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
                style={{
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                My Work
              </Link>
            </div>
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

        {/* Glow effect on hover */}
        <div
          className={`
            absolute inset-0 -z-10 rounded-xl blur-xl transition-opacity duration-300
            ${isHovered ? "opacity-30" : "opacity-0"}
          `}
          style={{
            background: "linear-gradient(135deg, rgba(103, 94, 76, 0.4), rgba(103, 94, 76, 0.2))",
          }}
        />
      </div>

      {/* Bottom fade to maintain section transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-30" />
    </div>
  );
}
