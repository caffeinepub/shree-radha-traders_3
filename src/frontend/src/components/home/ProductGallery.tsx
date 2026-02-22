import { useState } from 'react';
import { useGetAllProducts, useGetCategories } from '../../hooks/useQueries';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import ProductLightbox from './ProductLightbox';
import type { Product } from '../../backend';

export default function ProductGallery() {
  const { data: products = [], isLoading } = useGetAllProducts();
  const { data: categories = [] } = useGetCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts =
    selectedCategory === 'All' ? products : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="bg-softPink/20 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-maroon md:text-4xl">Our Product Collection</h2>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-12 text-center text-maroon/60">
            <p className="text-lg">No products available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onImageClick={() => setSelectedProduct(product)} />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && <ProductLightbox product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  );
}
