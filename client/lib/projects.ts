export interface Project {
  id: string;
  title: string;
  type: 'Graphic Design' | 'Web Design' | 'Branding' | 'Photography';
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
    id: 'brand-identity-system',
    title: 'Brand Identity',
    type: 'Graphic Design',
    year: '2025',
    image: '/placeholder.svg',
    description: 'Complete brand identity system for modern tech startup',
    role: 'Creative Director',
    tools: ['Adobe Illustrator', 'Figma', 'After Effects'],
    colors: {
      primary: '#1a1a1a',
      secondary: '#ff6b6b',
      accent: '#4ecdc4'
    }
  },
  {
    id: 'huel-rebrand',
    title: 'Huel',
    type: 'Branding',
    year: '2025',
    image: '/placeholder.svg',
    description: 'Complete rebrand for nutrition company',
    role: 'Brand Designer',
    tools: ['Adobe Creative Suite', 'Sketch'],
    colors: {
      primary: '#ff4500',
      secondary: '#ff6b35',
      accent: '#ff8c42'
    }
  },
  {
    id: 'eco-app',
    title: 'EcoTrack',
    type: 'Web Design',
    year: '2024',
    image: '/placeholder.svg',
    description: 'Sustainability tracking mobile application',
    role: 'UI/UX Designer',
    tools: ['Figma', 'Principle', 'Adobe XD'],
    colors: {
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#dcfce7'
    }
  },
  {
    id: 'coffee-brand',
    title: 'Pak Co.',
    type: 'Graphic Design',
    year: '2024',
    image: '/placeholder.svg',
    description: 'Artisan coffee roasting company brand identity',
    role: 'Brand Designer',
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
    colors: {
      primary: '#8b4513',
      secondary: '#d2691e',
      accent: '#f4a460'
    }
  },
  {
    id: 'design-tools',
    title: 'DesignKit',
    type: 'Web Design',
    year: '2024',
    image: '/placeholder.svg',
    description: 'Design tool and resource platform',
    role: 'Product Designer',
    tools: ['Figma', 'React', 'Framer'],
    colors: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      accent: '#67e8f9'
    }
  },
  {
    id: 'crypto-wallet',
    title: 'CoinVault',
    type: 'Web Design',
    year: '2024',
    image: '/placeholder.svg',
    description: 'Cryptocurrency wallet and trading platform',
    role: 'UI Designer',
    tools: ['Figma', 'Principle', 'Lottie'],
    colors: {
      primary: '#1e293b',
      secondary: '#334155',
      accent: '#64748b'
    }
  }
];

export const categories = ['Graphic Design', 'Web Design', 'Branding', 'Photography'];

export function getProjectsByType(type: Project['type']): Project[] {
  return projects.filter(project => project.type === type);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}
