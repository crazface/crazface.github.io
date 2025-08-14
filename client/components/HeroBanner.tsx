import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/lib/projects";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance the banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full h-[650px] md:h-[850px] lg:h-[950px] overflow-hidden">
      {/* Background with project colors */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `linear-gradient(135deg, ${currentProject.colors?.primary || "#6366f1"} 0%, ${currentProject.colors?.secondary || "#8b5cf6"} 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6 -mt-px pb-[199px]">
        <div className="max-w-4xl mx-auto">
          <div key={currentProject.id} className="animate-fade-in">
            <div className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2" />
            <Link
              to={`/project/${currentProject.id}`}
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full px-8 py-4 text-lg font-black hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30"
            >
              View Project
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Progress indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${
                index === currentIndex
                  ? "bg-white shadow-lg scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }
            `}
          />
        ))}
      </div>

      {/* Background Image */}
      <div
        className="absolute -top-[34px] -left-[5px] right-0 bottom-0 w-[2005px] pointer-events-none"
        style={{
          backgroundImage: "url(https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F899cbfa26eb74d69a887518b0d22cf50)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      />

      {/* Bottom gradient fade to beige */}
      <div className="absolute bottom-0 left-0 w-full h-[418px] bg-gradient-to-t from-background via-background/95 via-background/80 via-background/50 via-background/20 to-transparent pointer-events-none z-30" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}
