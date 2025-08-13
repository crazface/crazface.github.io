export interface Project {
  id: string;
  title: string;
  type: "Graphic Design" | "Video Editing" | "Photography";
  year: string;
  image: string;
  appIcon?: string;
  description?: string;
  role?: string;
  tools?: string[];
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const projects: Project[] = [
  {
    id: "brand-identity-system",
    title: "Brand Identity",
    type: "Graphic Design",
    year: "2025",
    image: "/images/brand-identity-1.svg",
    appIcon: "/images/app-icon-brand.svg",
    description: "Complete brand identity system for modern tech startup",
    role: "Creative Director",
    tools: ["Adobe Illustrator", "Figma", "After Effects"],
    colors: {
      primary: "#1a1a1a",
      secondary: "#ff6b6b",
      accent: "#4ecdc4",
    },
  },
  {
    id: "huel-rebrand",
    title: "Huel",
    type: "Graphic Design",
    year: "2025",
    image: "/images/brand-identity-1.svg",
    appIcon: "/images/app-icon-huel.svg",
    description: "Complete rebrand for nutrition company",
    role: "Brand Designer",
    tools: ["Adobe Creative Suite", "Sketch"],
    colors: {
      primary: "#ff4500",
      secondary: "#ff6b35",
      accent: "#ff8c42",
    },
  },
  {
    id: "coffee-brand",
    title: "Pak Co.",
    type: "Graphic Design",
    year: "2024",
    image: "/images/brand-identity-1.svg",
    description: "Artisan coffee roasting company brand identity",
    role: "Brand Designer",
    tools: ["Illustrator", "Photoshop", "InDesign"],
    colors: {
      primary: "#8b4513",
      secondary: "#d2691e",
      accent: "#f4a460",
    },
  },
  {
    id: "music-app",
    title: "SoundWave",
    type: "Graphic Design",
    year: "2024",
    image: "/images/brand-identity-1.svg",
    description: "Music streaming app interface design",
    role: "UI/UX Designer",
    tools: ["Figma", "Principle"],
    colors: {
      primary: "#8b5cf6",
      secondary: "#a855f7",
      accent: "#c4b5fd",
    },
  },
  {
    id: "short-film",
    title: "Short Film",
    type: "Video Editing",
    year: "2024",
    image: "/placeholder.svg",
    description: "Independent short film project",
    role: "Director & Editor",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    colors: {
      primary: "#dc2626",
      secondary: "#ef4444",
      accent: "#f87171",
    },
  },
  {
    id: "commercial-video",
    title: "Commercial",
    type: "Video Editing",
    year: "2024",
    image: "/placeholder.svg",
    description: "Brand commercial video production",
    role: "Video Editor",
    tools: ["Final Cut Pro", "Motion", "Color Finale"],
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#67e8f9",
    },
  },
  {
    id: "music-video",
    title: "Music Video",
    type: "Video Editing",
    year: "2023",
    image: "/placeholder.svg",
    description: "Music video for local artist",
    role: "Editor & Colorist",
    tools: ["Premiere Pro", "After Effects", "Lumetri"],
    colors: {
      primary: "#7c3aed",
      secondary: "#8b5cf6",
      accent: "#a78bfa",
    },
  },
  {
    id: "portrait-series",
    title: "Portraits",
    type: "Photography",
    year: "2024",
    image: "/placeholder.svg",
    description: "Portrait photography series",
    role: "Photographer",
    tools: ["Canon R5", "Lightroom", "Photoshop"],
    colors: {
      primary: "#374151",
      secondary: "#6b7280",
      accent: "#9ca3af",
    },
  },
  {
    id: "landscape-collection",
    title: "Landscapes",
    type: "Photography",
    year: "2024",
    image: "/placeholder.svg",
    description: "Nature and landscape photography",
    role: "Photographer",
    tools: ["Sony A7R IV", "Capture One", "Photoshop"],
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399",
    },
  },
  {
    id: "street-photography",
    title: "Street Life",
    type: "Photography",
    year: "2023",
    image: "/placeholder.svg",
    description: "Urban street photography project",
    role: "Photographer",
    tools: ["Leica Q2", "Lightroom", "VSCO"],
    colors: {
      primary: "#1f2937",
      secondary: "#374151",
      accent: "#6b7280",
    },
  },
];

export const categories = ["Graphic Design", "Video Editing", "Photography"];

export function getProjectsByType(type: Project["type"]): Project[] {
  return projects.filter((project) => project.type === type);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
