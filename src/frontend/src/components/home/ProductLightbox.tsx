import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Product } from '../../backend';

interface ProductLightboxProps {
  product: Product;
  onClose: () => void;
}

export default function ProductLightbox({ product, onClose }: ProductLightboxProps) {
  const formatPrice = (price: bigint) => {
    return `₹${price.toString()}`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-maroon">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg">
            <img src={product.image.getDirectURL()} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-maroon/60">Category</h3>
              <p className="text-maroon">{product.category}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-maroon/60">Description</h3>
              <p className="text-maroon">{product.description}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-maroon/60">Price</h3>
              <p className="text-3xl font-bold text-gold">{formatPrice(product.price)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
