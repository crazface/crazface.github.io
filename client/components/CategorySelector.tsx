interface CategorySelectorProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategorySelector({
  categories,
  activeCategory,
  onCategoryChange,
}: CategorySelectorProps) {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center gap-1 glass rounded-full p-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300
              ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "text-foreground hover:bg-foreground/10 hover:scale-105"
              }
            `}
            style={{
              boxShadow: activeCategory === category
                ? "0 8px 16px -4px rgba(0,0,0,0.3), 0 4px 8px -2px rgba(0,0,0,0.2)"
                : "none",
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
