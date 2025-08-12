export interface Project {
  id: string;
  title: string;
  type: 'branding' | 'video' | 'photography';
  year: string;
  image: string;
  description?: string;
  role?: string;
  tools?: string[];
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  gridSpan: {
    cols: number;
    rows: number;
  };
}

export const projects: Project[] = [
  {
    id: 'brand-project-one',
    title: 'Brand Project One',
    type: 'branding',
    year: '2025',
    image: '/placeholder.svg',
    description: 'A comprehensive brand identity for a modern tech startup',
    role: 'Brand Designer',
    tools: ['Adobe Illustrator', 'Figma', 'After Effects'],
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4'
    },
    gridSpan: { cols: 3, rows: 3 }
  },
  {
    id: 'short-film-trailer',
    title: 'Short Film Trailer',
    type: 'video',
    year: '2025',
    image: '/placeholder.svg',
    description: 'Cinematic trailer for an independent short film',
    role: 'Director & Editor',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    colors: {
      primary: '#f59e0b',
      secondary: '#ef4444',
      accent: '#10b981'
    },
    gridSpan: { cols: 6, rows: 3 }
  },
  {
    id: 'portrait-series',
    title: 'Portrait Series',
    type: 'photography',
    year: '2024',
    image: '/placeholder.svg',
    description: 'Intimate portraits exploring identity and expression',
    role: 'Photographer',
    tools: ['Canon R5', 'Lightroom', 'Photoshop'],
    colors: {
      primary: '#ec4899',
      secondary: '#f97316',
      accent: '#8b5cf6'
    },
    gridSpan: { cols: 3, rows: 4 }
  },
  {
    id: 'digital-campaign',
    title: 'Digital Campaign',
    type: 'branding',
    year: '2024',
    image: '/placeholder.svg',
    description: 'Multi-platform digital campaign for sustainable fashion',
    role: 'Creative Director',
    tools: ['Figma', 'Adobe CC', 'Notion'],
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#06b6d4'
    },
    gridSpan: { cols: 3, rows: 3 }
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics Reel',
    type: 'video',
    year: '2024',
    image: '/placeholder.svg',
    description: 'Collection of motion graphics and animations',
    role: 'Motion Designer',
    tools: ['After Effects', 'Cinema 4D', 'Blender'],
    colors: {
      primary: '#8b5cf6',
      secondary: '#a855f7',
      accent: '#ec4899'
    },
    gridSpan: { cols: 6, rows: 3 }
  },
  {
    id: 'architecture-photography',
    title: 'Architecture Study',
    type: 'photography',
    year: '2024',
    image: '/placeholder.svg',
    description: 'Geometric exploration of modern architecture',
    role: 'Photographer',
    tools: ['Sony A7R IV', 'Capture One', 'Photoshop'],
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#06b6d4'
    },
    gridSpan: { cols: 3, rows: 4 }
  }
];

export function getProjectsByType(type: Project['type']): Project[] {
  return projects.filter(project => project.type === type);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}
