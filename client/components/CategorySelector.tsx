import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategorySelectorProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategorySelector({ categories, activeCategory, onCategoryChange }: CategorySelectorProps) {
  const currentIndex = categories.indexOf(activeCategory);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < categories.length - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onCategoryChange(categories[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onCategoryChange(categories[currentIndex + 1]);
    }
  };

  return (
    <div className="flex items-center justify-center mb-12">
      <div
        className="flex items-center bg-black rounded-full px-6 py-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        style={{
          boxShadow: `
            0 20px 40px -12px rgba(0,0,0,0.4),
            0 8px 16px -8px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `
        }}
      >
        <button
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          className={`p-1 rounded-full transition-all duration-200 ${
            canGoPrevious 
              ? 'text-white hover:bg-white/10' 
              : 'text-white/30 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <span className="text-white font-medium text-lg px-6 min-w-[140px] text-center">
          {activeCategory}
        </span>
        
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`p-1 rounded-full transition-all duration-200 ${
            canGoNext 
              ? 'text-white hover:bg-white/10' 
              : 'text-white/30 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
