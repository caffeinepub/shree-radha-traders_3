import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const allCategories = ['All', ...categories];

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-3">
      {allCategories.map((category) => (
        <Button
          key={category}
          onClick={() => onSelectCategory(category)}
          variant={selectedCategory === category ? 'default' : 'outline'}
          className={
            selectedCategory === category
              ? 'bg-maroon text-cream hover:bg-maroon/90'
              : 'border-maroon text-maroon hover:bg-maroon/10'
          }
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
