export interface Project {
  id: string;
  title: string;
  type: "Graphic Design" | "Video Editing" | "Photography" | "3D Projects";
  year: string;
  image: string;
  appIcon?: string;
  description?: string;
  longDescription?: string;
  processPdf?: string;
  finalPdf?: string;
  gallery?: string[];
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F1cae4b2af07e49f1b8f60df05864d17a",
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F1e15615a7f8041c5b290ff9d6b6b14dc",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fba4b3743e61947488aa6e0867d99c9d8",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F706526fd94b841d6a4238cf22f87a917",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fbf5ecc157dfa4da08bc34da6c680f649",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff506d1cd8b1142b4abf9c6477d1f8594",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fa6ed5ff4c4834e3da6c97557bc2c7cc7",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F1cc78cb42ee7484b9c4efc78d694804d",
    ],
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fe71f4c1a27344269bdb189d9fcb983fc",
    description: "A brand transforming e-waste into luxury accessories.",
    longDescription:
      "ReGenB is a jewellery brand concept that transforms electronic waste into luxury accessories. Inspired by RGB colour systems and digital culture, the brand combines sustainability with a clean, luxury aesthetic. The project included developing a full brand identity, designing and 3D-modelling jewellery pieces, creating sustainable packaging, and producing campaign visuals. The outcome demonstrates how e-waste can be transformed into desirable fashion items while maintaining a modern, tech-driven visual language.",
    processPdf:
      "https://cdn.builder.io/o/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F17914742715f45178f55bef0427100ef?alt=media&token=451c8e9d-7fc9-4c20-a89a-1a38c934c6d3&apiKey=1a7d8b4d8c7d4879aa4c7843b68daea6",
    finalPdf:
      "https://cdn.builder.io/o/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F59407eedee1844b88aca9212e7a11273?alt=media&token=3e9b04e6-b519-43bd-89fd-51b6ab69ce7f&apiKey=1a7d8b4d8c7d4879aa4c7843b68daea6",
    role: "Creative Director",
    tools: [
      "Photoshop",
      "Illustrator",
      "Blender",
      "Canon 850D 18 - 135mm",
      "InDesign",
      "Visual Studio Code",
    ],
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F0f8ce88b154f4108ad614046b5ab6e21",
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
      background: "#f66d51",
      highlight: "#ffe2ba",
      text: "#ffe2ba",
    },
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F853d126e8f7149fe914f0ab16f113ec9",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F230e1cab82214a7681357a6fcbb1d431",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fb8444b803f02422892059639efe837cf",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff87e10bd62d848388a58684940b9a49d",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fb3fac4652a9643e5a6f9ea89841bd416",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F51029c9f88604c03aae1d215777ab324",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fe6fc3326bafd4679b08ead293ee5eb14",
    ],
  },
  {
    id: "fuzed",
    title: "Fuzed",
    type: "Graphic Design",
    year: "2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F94a591128cba4298a326e975eabf6a55",
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
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fa08b68e31dd84a7fa5c3a73051e89060",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F13288fb46db843f193cbe8088ac1eeaf",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F528b6020b2684f9fbbd5c1357734f4c5",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F7b3120778944432380c122649c84111e",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F16114d617d2c4131bd378e7f7557209f",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F733d0f39c645429b895f108c42d5441b",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3e764228697e4ee2bb94bf7289b9e8fb",
    ],
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
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F9a1ac5c18e7247dcb468746b3a485e7a",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F4020bf7f063f407fba74e1f3bfe3986b",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F012d5dca0e794d1ba1044af2a5902912",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fc227ff0177ff4c5d9488d449bb4734a3",
    ],
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F6ae44cd4cd424fcead386ce0f891b346",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F6ae44cd4cd424fcead386ce0f891b346",
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
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff9217337643a4183a2cb29c3edd1e0b7",
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
    id: "pisk-kitchen",
    title: "Pisk Kitchen",
    type: "Graphic Design",
    year: "2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff070ce8c04d14acd8fb7fd40a69cb6c2",
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
      highlight: "#a4dfcf",
      text: "#a4dfcf",
    },
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F59b19d0724324f17a121b434f7c8d884",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F76510689fad841529971206793ac5b58",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F546205c8124b4e1db8d882c3d879ec52",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fcb85e8a39bd64d9091cdc6e3d6ce8c6f",
    ],
  },
  {
    id: "published-book-cover",
    title: "Published Book Cover",
    type: "Graphic Design",
    year: "2023",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fd20d487e035b4360ba74e9b310c89d8d",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F5f959d69d0304d3eb460cf93ca388639",
    description: "Cover design for a published book.",
    role: "Designer",
    tools: ["Illustrator", "InDesign"],
    colors: {
      primary: "#1f2937",
      secondary: "#6b7280",
      accent: "#9ca3af",
    },
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F66408f3558c948018c76733a582c8a07",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3c5d874b6f54427c872f0a4b9209f40b",
    ],
    brandTheme: {
      background: "#000000",
      highlight: "#ffffff",
      text: "#ffffff",
    },
  },
  {
    id: "bedroom-recreation",
    title: "Bedroom Recreation",
    type: "3D Projects",
    year: "2025",
    image: "/images/hero-banner-project-1.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fa7612b852273400db4f1fd62ed79ce1e",
    description: "Photorealistic bedroom interior recreation",
    role: "3D Artist",
    tools: ["Blender", "Substance Painter", "Photoshop"],
    colors: { primary: "#6366f1", secondary: "#4f46e5", accent: "#818cf8" },
  },
  {
    id: "green-signal",
    title: "Green Signal",
    type: "3D Projects",
    year: "2025",
    image: "/images/hero-banner-project-2.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F28cc6b2a17fc490fb507bf40c731a35d",
    description: "Environmental 3D concept focusing on lighting and atmosphere",
    role: "3D Artist",
    tools: ["Blender", "Cycles", "Photoshop"],
    colors: { primary: "#059669", secondary: "#047857", accent: "#10b981" },
  },
  {
    id: "realistic-house",
    title: "Realistic House",
    type: "3D Projects",
    year: "2024",
    image: "/images/hero-banner-project-3.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fa2a49e0cb2614c46a4966c2032a609bd",
    description: "Exterior and interior renders of a realistic house",
    role: "3D Artist",
    tools: ["3ds Max", "V-Ray", "Photoshop"],
    colors: { primary: "#dc2626", secondary: "#b91c1c", accent: "#ef4444" },
  },
  {
    id: "gang-beasts-map",
    title: "Gang Beasts Map",
    type: "3D Projects",
    year: "2024",
    image: "/images/hero-banner-project-1.svg",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F5eaa0ffc6ad14962855e30373fee8b9f",
    description: "Level/environment design inspired by Gang Beasts",
    role: "3D Artist",
    tools: ["Blender", "Unity", "Substance Designer"],
    colors: { primary: "#8b5cf6", secondary: "#a855f7", accent: "#c4b5fd" },
  },
  {
    id: "cacophony-album-cover",
    title: "Cacophony Album Cover",
    type: "Graphic Design",
    year: "2022",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fde24784bb5e047dc903ae7b8ed6d1870",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fa0d9c4f9b9c54e3385a8bfdbc8d39322",
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff88ad4eb76154aff82e49be511c22e54",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff88ad4eb76154aff82e49be511c22e54",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff88ad4eb76154aff82e49be511c22e54",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff88ad4eb76154aff82e49be511c22e54",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff88ad4eb76154aff82e49be511c22e54",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff88ad4eb76154aff82e49be511c22e54",
    ],
    description: "Album cover artwork for Cacophony",
    role: "Designer",
    tools: ["Illustrator", "Photoshop"],
    brandTheme: {
      background: "#1e2226",
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
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3bcd1f3ab80d4eb4b232e075cc1f7b20",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F635e3c838b264f0a92507b8484b45f33",
    description: "Advertising campaign for Schtuff",
    role: "Art Director",
    tools: ["Figma", "Illustrator"],
    brandTheme: {
      background: "#ffa7ac",
      highlight: "#ffffff",
      text: "#ffffff",
    },
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F53a8d5b0fc9c488f9785ae68a0702a8e",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fdbad814639844c06ba09d8d998cf5900",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F95c99adf37bb4c1c8f4f4ea0b29afe02",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F2a37dc9dd7124a1ca92a150a2d4c486b",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff46ff21f91ac455282fbd226f547a8b0",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F5ff600d0df96482288f04cc9a76fb216",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Faa2cfecd1ccc41119ed1e85ef81d2724",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F99dd6c0fa74a42d8b38777e684e5328c",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fab937a4f396d464680c3fb99ff64b069",
    ],
  },
  {
    id: "posters-2022",
    title: "Posters",
    type: "Graphic Design",
    year: "2022",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F6a1fa9529eea454e9d9e82be72289910",
    appIcon:
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F952d7fc52d0a44ea8bb44a6f429a9dfe",
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3df5d978b2e64d2891912b9a966af282",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F62ed94f5559346d7abf8fdc456adb5b8",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F1149e00e571d452699971df7fe9a418a",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F59a86f92af1a4d79a8687d5883d9b3f3",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F6267697b6c1249009845920e9a1d6c0d",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F348f6af2748642718df647be9c06d3a4",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fcd6f5cc053d54d34a2f600819468a7d9",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F34f308e7185247d88d406ef5799e6274",
      "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fb5ce8bff609b47fb87dca9a35ca5a72c",
    ],
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
