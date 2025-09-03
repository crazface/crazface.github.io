export interface Project {
  id: string;
  title: string;
  type: "Graphic Design" | "Video Editing" | "Photography" | "3D Projects";
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
  brandTheme?: {
    background: string;
    highlight: string;
    text: string;
  };
}

export const projects: Project[] = [
  {
    id: "brand-identity-system",
    title: "Brand Identity",
    type: "Graphic Design",
    year: "2025",
    image: "/images/hero-banner-project-1.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fe71f4c1a27344269bdb189d9fcb983fc",
    description: "Complete brand identity system for modern tech startup",
    role: "Creative Director",
    tools: ["Adobe Illustrator", "Figma", "After Effects"],
    colors: {
      primary: "#8b4513",
      secondary: "#d2691e",
      accent: "#f4a460",
    },
  },
  {
    id: "huel-rebrand",
    title: "Huel",
    type: "Graphic Design",
    year: "2025",
    image: "/images/hero-banner-project-2.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fd9a90c35e888472095e8298ac0e7aef6",
    description: "Complete rebrand for nutrition company",
    role: "Brand Designer",
    tools: ["Adobe Creative Suite", "Sketch"],
    colors: {
      primary: "#8b5cf6",
      secondary: "#a855f7",
      accent: "#c4b5fd",
    },
  },
  {
    id: "coffee-brand",
    title: "Pak Co.",
    type: "Graphic Design",
    year: "2024",
    image: "/images/hero-banner-project-3.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F4d36a9c00a5748b09d8b629aad9c9e19",
    description: "Artisan coffee roasting company brand identity",
    role: "Brand Designer",
    tools: ["Illustrator", "Photoshop", "InDesign"],
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399",
    },
  },
  {
    id: "music-app",
    title: "SoundWave",
    type: "Graphic Design",
    year: "2024",
    image: "/images/brand-identity-1.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F0cf5f83875634d468081c91fb3dab076",
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
    image: "/images/video-editing-1.svg",
    appIcon: "/images/app-icon-video.svg",
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
    image: "/images/video-editing-1.svg",
    appIcon: "/images/app-icon-video.svg",
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
    image: "/images/video-editing-1.svg",
    appIcon: "/images/app-icon-video.svg",
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
    image: "/images/photography-1.svg",
    appIcon: "/images/app-icon-photo.svg",
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
    image: "/images/photography-1.svg",
    appIcon: "/images/app-icon-photo.svg",
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
    image: "/images/photography-1.svg",
    appIcon: "/images/app-icon-photo.svg",
    description: "Urban street photography project",
    role: "Photographer",
    tools: ["Leica Q2", "Lightroom", "VSCO"],
    colors: {
      primary: "#1f2937",
      secondary: "#374151",
      accent: "#6b7280",
    },
  },
  {
    id: "tech-startup-logo",
    title: "TechFlow",
    type: "Graphic Design",
    year: "2025",
    image: "/images/hero-banner-project-1.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F0465afe7575f43219f2168ad9b16ab15",
    description: "Modern logo design for innovative tech startup",
    role: "Logo Designer",
    tools: ["Adobe Illustrator", "Figma"],
    colors: {
      primary: "#3b82f6",
      secondary: "#1d4ed8",
      accent: "#60a5fa",
    },
  },
  {
    id: "restaurant-branding",
    title: "Bella Vista",
    type: "Graphic Design",
    year: "2025",
    image: "/images/hero-banner-project-2.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F55176dffb7e640618937b93cbbd983ea",
    description: "Complete branding package for upscale restaurant",
    role: "Brand Designer",
    tools: ["Adobe Creative Suite", "InDesign"],
    colors: {
      primary: "#dc2626",
      secondary: "#991b1b",
      accent: "#f87171",
    },
  },
  {
    id: "3d-product-visualization",
    title: "Product Render",
    type: "3D Projects",
    year: "2025",
    image: "/images/hero-banner-project-1.svg",
    appIcon: "/images/app-icon-brand.svg",
    description: "Photorealistic 3D product visualization",
    role: "3D Artist",
    tools: ["Blender", "Substance Painter", "Keyshot"],
    colors: {
      primary: "#6366f1",
      secondary: "#4f46e5",
      accent: "#818cf8",
    },
  },
  {
    id: "architectural-rendering",
    title: "Architecture",
    type: "3D Projects",
    year: "2024",
    image: "/images/hero-banner-project-2.svg",
    appIcon: "/images/app-icon-brand.svg",
    description: "Architectural visualization and rendering",
    role: "3D Visualizer",
    tools: ["3ds Max", "V-Ray", "Photoshop"],
    colors: {
      primary: "#059669",
      secondary: "#047857",
      accent: "#10b981",
    },
  },
  {
    id: "character-modeling",
    title: "Character Design",
    type: "3D Projects",
    year: "2024",
    image: "/images/hero-banner-project-3.svg",
    appIcon: "/images/app-icon-brand.svg",
    description: "3D character modeling and animation",
    role: "Character Artist",
    tools: ["ZBrush", "Maya", "Substance Designer"],
    colors: {
      primary: "#dc2626",
      secondary: "#b91c1c",
      accent: "#ef4444",
    },
  },
];

export const categories = [
  "Graphic Design",
  "Video Editing",
  "Photography",
  "3D Projects",
];

export function getProjectsByType(type: Project["type"]): Project[] {
  return projects.filter((project) => project.type === type);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
