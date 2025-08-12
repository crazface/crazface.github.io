import { useEffect, useState } from "react";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.cursor-interactive, button, a, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.cursor-interactive, button, a, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`
        fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference
        transition-all duration-150 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
        ${isHovering ? "scale-150" : "scale-100"}
      `}
      style={{
        transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px) scale(${isHovering ? 1.5 : 1})`,
      }}
    >
      <div
        className={`
          w-4 h-4 rounded-full bg-white
          transition-all duration-150 ease-out
          ${isHovering ? "scale-100 bg-opacity-80" : "scale-75 bg-opacity-60"}
        `}
      />
    </div>
  );
}
