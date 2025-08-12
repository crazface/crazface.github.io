import { useState, useEffect } from 'react';
import { ProjectTile } from '@/components/ProjectTile';
import { projects, Project } from '@/lib/projects';

export default function Index() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeFilter, setActiveFilter] = useState<'all' | Project['type']>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleFilter = (filter: 'all' | Project['type']) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.type === filter));
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Work' },
    { value: 'branding', label: 'Branding' },
    { value: 'video', label: 'Video' },
    { value: 'photography', label: 'Photography' }
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="grid-container pt-20 pb-12">
        <div
          className={`
            animate-slide-up
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <h1 className="text-5xl font-bold leading-none tracking-tight text-text-primary mb-4">
            Work
          </h1>
          <p className="text-lg font-normal leading-relaxed text-text-secondary max-w-2xl">
            Branding, video, photography — selected projects
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="grid-container mb-12">
        <div
          className={`
            flex flex-wrap gap-3 animate-slide-up
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ animationDelay: '0.1s' }}
        >
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilter(option.value)}
              className={`
                glass rounded-full px-6 py-3 text-sm font-medium
                transition-all duration-200 ease-out focus-visible
                ${activeFilter === option.value
                  ? 'bg-text-primary text-white shadow-glass-lg'
                  : 'text-text-primary hover:bg-white/80 hover:shadow-glass'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="grid-container pb-section">
        <div
          className={`
            grid-12 auto-rows-max animate-slide-up
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ animationDelay: '0.2s' }}
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-scale-in"
              style={{ 
                animationDelay: `${0.3 + (index * 0.1)}s`,
                animationFillMode: 'both'
              }}
            >
              <ProjectTile project={project} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="glass rounded-lg p-8 text-center max-w-md">
              <h3 className="text-2xl font-semibold leading-snug tracking-tight text-text-primary mb-2">
              No projects found
            </h3>
            <p className="text-lg font-normal leading-relaxed text-text-secondary">
                Try adjusting your filters to see more work.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="grid-container py-12 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-normal leading-relaxed text-text-secondary">
          <p>© 2025 — All rights reserved</p>
          <div className="flex gap-6">
            <a 
              href="/about" 
              className="hover:text-text-primary transition-colors duration-200 focus-visible"
            >
              About
            </a>
            <a 
              href="/contact" 
              className="hover:text-text-primary transition-colors duration-200 focus-visible"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
