import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '../../backend';

interface ProductCardProps {
  product: Product;
  onImageClick: () => void;
}

export default function ProductCard({ product, onImageClick }: ProductCardProps) {
  const formatPrice = (price: bigint) => {
    return `₹${price.toString()}`;
  };

  return (
    <Card className="group overflow-hidden border-gold/20 transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-square cursor-pointer overflow-hidden" onClick={onImageClick}>
          <img
            src={product.image.getDirectURL()}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="mb-2 text-lg text-maroon">{product.name}</CardTitle>
        <p className="line-clamp-2 text-sm text-maroon/70">{product.description}</p>
      </CardContent>
      <CardFooter className="border-t border-gold/20 bg-cream/50 p-4">
        <p className="text-xl font-bold text-gold">{formatPrice(product.price)}</p>
      </CardFooter>
    </Card>
  );
}
