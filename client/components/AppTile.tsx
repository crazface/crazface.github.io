import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/lib/projects';

interface AppTileProps {
  project: Project;
}

export function AppTile({ project }: AppTileProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/project/${project.id}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full aspect-square rounded-3xl overflow-hidden
          transition-all duration-300 ease-out cursor-pointer
          ${isHovered 
            ? 'transform scale-105 shadow-2xl shadow-black/20' 
            : 'shadow-lg shadow-black/10'
          }
        `}
        style={{
          background: `linear-gradient(135deg, ${project.colors?.primary || '#6366f1'}, ${project.colors?.secondary || '#8b5cf6'})`
        }}
      >
        {/* Background Pattern/Texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
        
        {/* App Icon Content */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          {project.appIcon ? (
            <img 
              src={project.appIcon} 
              alt={project.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center">
              <div className="text-white font-bold text-2xl mb-2 leading-tight">
                {project.title.split(' ').map((word, i) => (
                  <div key={i} className="leading-none">
                    {word}
                  </div>
                ))}
              </div>
              <div className="text-white/80 text-sm font-medium uppercase tracking-wider">
                {project.type}
              </div>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div
          className={`
            absolute inset-0 bg-black/20 flex items-end p-6
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="text-white">
            <div className="font-semibold text-lg leading-tight mb-1">
              {project.title}
            </div>
            <div className="text-white/80 text-sm">
              {project.year}
            </div>
          </div>
        </div>

        {/* Shine Effect on Hover */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent
            transform -translate-x-full -translate-y-full rotate-45
            transition-transform duration-700
            ${isHovered ? 'translate-x-full translate-y-full' : ''}
          `}
          style={{ width: '200%', height: '200%' }}
        />
      </div>
    </Link>
  );
}
