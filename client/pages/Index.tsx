import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CategorySelector } from '@/components/CategorySelector';
import { AppTile } from '@/components/AppTile';
import { projects, categories, getProjectsByType, Project } from '@/lib/projects';

export default function Index() {
  const [activeCategory, setActiveCategory] = useState<Project['type']>('Graphic Design');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const filtered = getProjectsByType(activeCategory);
    setFilteredProjects(filtered);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="grid-container">
          {/* Category Selector */}
          <div
            className={`
              transition-all duration-500 ease-out
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <CategorySelector
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={(category) => setActiveCategory(category as Project['type'])}
            />
          </div>

          {/* Projects Grid */}
          <div
            className={`
              grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto
              transition-all duration-500 ease-out
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{ animationDelay: '0.2s' }}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-scale-in bubble-float"
                style={{
                  animationDelay: `${0.3 + (index * 0.1)}s, ${index * 0.5}s`,
                  animationFillMode: 'both'
                }}
              >
                <AppTile project={project} />
              </div>
            ))}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="col-span-full flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-muted-foreground/20 rounded-lg" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No projects found
                  </h3>
                  <p className="text-muted-foreground">
                    Check back soon for new work in this category.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
