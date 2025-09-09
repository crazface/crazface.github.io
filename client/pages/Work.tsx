import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { CategorySelector } from "@/components/CategorySelector";
import { AppTile } from "@/components/AppTile";
import {
  projects,
  categories,
  getProjectsByType,
  Project,
} from "@/lib/projects";

export default function Work() {
  const [activeCategory, setActiveCategory] =
    useState<Project["type"]>("Graphic Design");
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Memoize filtered projects to prevent unnecessary re-renders
  const filteredProjects = useMemo(() => {
    return getProjectsByType(activeCategory);
  }, [activeCategory]);

  // Derive display order: allow placing specific projects into the last row columns
  const displayProjects = useMemo(() => {
    const list = [...filteredProjects];
    // Determine number of columns used for the current category (desktop/lg)
    const columns = activeCategory === "Video Editing" ? 2 : 3;
    const len = list.length;

    // When viewing Photography, show only the portrait-series centered
    if (activeCategory === "Photography") {
      const portrait = list.find((p) => p.id === "portrait-series");
      if (portrait) return [portrait];
      return list.slice(0, 1);
    }

    // Targets: place Posters at start of last row, and Schtuff at end of last row
    const posterId = "posters-2022";
    const schtuffId = "schtuff-ad-campaign-2022";

    // Only attempt reorder when there are at least 'columns' items
    if (len >= columns) {
      // Remove any existing occurrences
      const without = list.filter((p) => p.id !== posterId && p.id !== schtuffId);

      // Compute target indices
      const posterTarget = Math.max(0, len - columns);
      const schtuffTarget = len - 1;

      // Insert placeholders array copy to build final
      const result: typeof list = [];
      // Fill with items from 'without', inserting placeholders where needed
      // We'll iterate through indices 0..len-1 and pick items from 'without' sequentially,
      // but when reaching posterTarget or schtuffTarget we'll insert the specific project if it exists.
      let withoutIdx = 0;
      for (let i = 0; i < len; i++) {
        if (i === posterTarget) {
          const found = list.find((p) => p.id === posterId);
          if (found) {
            result.push(found);
            continue;
          }
        }
        if (i === schtuffTarget) {
          const found = list.find((p) => p.id === schtuffId);
          if (found) {
            result.push(found);
            continue;
          }
        }
        // Otherwise take next from without
        if (withoutIdx < without.length) {
          result.push(without[withoutIdx]);
          withoutIdx++;
        }
      }

      // If any leftover (unlikely), append
      while (withoutIdx < without.length) {
        result.push(without[withoutIdx++]);
      }

      return result;
    }

    return list;
  }, [filteredProjects, activeCategory]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Only trigger animation key change when category actually changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-32 pb-20">
        <div className="grid-container">
          {/* Category Selector */}
          <div
            className={`
              transition-all duration-500 ease-out
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            <CategorySelector
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={(category) =>
                setActiveCategory(category as Project["type"])
              }
            />
          </div>

          {/* Projects Grid */}
          <div
            className={`
              grid gap-6 lg:gap-8 max-w-5xl mx-auto
              transition-all duration-500 ease-out
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              ${
                activeCategory === "Video Editing"
                  ? "grid-cols-1 md:grid-cols-2"
                  : activeCategory === "Photography"
                  ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-1 justify-items-center"
                  : "grid-cols-2 lg:grid-cols-3"
              }
            `}
            style={{ animationDelay: "0.2s" }}
          >
            {displayProjects.map((project, index) => (
              <div
                key={`${project.id}-${animationKey}`}
                className="animate-scale-in"
                style={{
                  animationDelay: `${0.3 + index * 0.1}s`,
                  animationFillMode: "both",
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
