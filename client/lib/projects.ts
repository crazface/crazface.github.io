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
    id: "regenb",
    title: "ReGenB",
    type: "Graphic Design",
    year: "2025",
    image: "/images/hero-banner-project-1.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fe71f4c1a27344269bdb189d9fcb983fc",
    description:
      "Complete brand identity system for regenerative business platform",
    role: "Creative Director",
    tools: ["Adobe Illustrator", "Figma", "After Effects"],
    colors: {
      primary: "#8b4513",
      secondary: "#d2691e",
      accent: "#f4a460",
    },
    brandTheme: {
      background: "#0a0e0d",
      highlight: "#deffcf",
      text: "#deffcf",
    },
  },
  {
    id: "huel-rebrand",
    title: "Huel Rebrand",
    type: "Graphic Design",
    year: "2024",
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
    brandTheme: {
      background: "#fcbd9b",
      highlight: "#f66d51",
      text: "#f66d51",
    },
  },
  {
    id: "deefa",
    title: "Deefa",
    type: "Graphic Design",
    year: "2023",
    image: "/images/hero-banner-project-3.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F4d36a9c00a5748b09d8b629aad9c9e19",
    description: "Modern fintech platform brand identity",
    role: "Brand Designer",
    tools: ["Illustrator", "Photoshop", "InDesign"],
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399",
    },
    brandTheme: {
      background: "#15542c",
      highlight: "#fee1ed",
      text: "#fee1ed",
    },
  },
  {
    id: "old-west-starter-kit",
    title: "Old West Starter Kit",
    type: "Graphic Design",
    year: "2024",
    image: "/images/brand-identity-1.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F0cf5f83875634d468081c91fb3dab076",
    description: "Western-themed design assets and brand kit",
    role: "Brand Designer",
    tools: ["Figma", "Principle", "Illustrator"],
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
    title: "Wedding",
    type: "Photography",
    year: "2025",
    image: "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F6ae44cd4cd424fcead386ce0f891b346",
    appIcon: "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F6ae44cd4cd424fcead386ce0f891b346",
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3eee8772ebeb43ed81ca67f526fe2eb8",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F6ae44cd4cd424fcead386ce0f891b346",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F8e97c6a73faa4e37b71201757bbc5097",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fec3e00ced9dc4a98b965964f18270942",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fbf039bc721cc4084b29dfb5bd46859fc",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F8e97c6a73faa4e37b71201757bbc5097",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fa3c4b3fc0d384a63967e41f6ba9875ed",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F6dfe3e8fc0264ab19571b5a60723c5df",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F4d74fd74108f49bfa6d421e2906af732",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F9d7a2e315bc643328676d21863287461",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fad5385772c934981b3e82ab089d80e91",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fa06e1c54d7cd4df4972784defea912a6",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F0b5b245dfb504e168b67b41d69c1dbc8",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fc0b74f538d6e439d998c6fbb1e124f81",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff9217337643a4183a2cb29c3edd1e0b7"
    ],
    description: "Wedding photography series",
    role: "Photographer",
    tools: ["Canon 850D", "18 - 135mm", "Lightroom", "Photoshop"],
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
    id: "fuzed",
    title: "Fuzed",
    type: "Graphic Design",
    year: "2024",
    image: "/images/hero-banner-project-1.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F0465afe7575f43219f2168ad9b16ab15",
    description: "Modern brand identity for fusion restaurant concept",
    role: "Brand Designer",
    tools: ["Adobe Illustrator", "Figma"],
    colors: {
      primary: "#3b82f6",
      secondary: "#1d4ed8",
      accent: "#60a5fa",
    },
    brandTheme: {
      background: "#39c3be",
      highlight: "#ffffff",
      text: "#ffffff",
    },
  },
  {
    id: "pisk-kitchen",
    title: "Pisk Kitchen",
    type: "Graphic Design",
    year: "2024",
    image: "/images/hero-banner-project-2.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F55176dffb7e640618937b93cbbd983ea",
    description: "Complete branding package for artisan kitchen studio",
    role: "Brand Designer",
    tools: ["Adobe Creative Suite", "InDesign"],
    colors: {
      primary: "#dc2626",
      secondary: "#991b1b",
      accent: "#f87171",
    },
    brandTheme: {
      background: "#146b55",
      highlight: "#6fb29f",
      text: "#6fb29f",
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
  {
    id: "cacophony-album-cover",
    title: "Cacophony Album Cover",
    type: "Graphic Design",
    year: "2022",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fa0d9c4f9b9c54e3385a8bfdbc8d39322",
    description: "Album cover artwork for Cacophony",
    role: "Designer",
    tools: ["Illustrator", "Photoshop"],
    brandTheme: {
      background: "#1f1f1f",
      highlight: "#e8e8e8",
      text: "#e8e8e8",
    },
  },
  {
    id: "schtuff-ad-campaign-2022",
    title: "Schtuff Ad Campaign",
    type: "Graphic Design",
    year: "2022",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F635e3c838b264f0a92507b8484b45f33",
    description: "Advertising campaign for Schtuff",
    role: "Art Director",
    tools: ["Figma", "Illustrator"],
    brandTheme: {
      background: "#ffc1c5",
      highlight: "#ffffff",
      text: "#ffffff",
    },
  },
  {
    id: "posters-2022",
    title: "Posters",
    type: "Graphic Design",
    year: "2022",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F952d7fc52d0a44ea8bb44a6f429a9dfe",
    description: "Poster series",
    role: "Designer",
    tools: ["Illustrator", "InDesign"],
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
