import { useState } from 'react';
import { useGetAllProducts, useDeleteProduct } from '../../hooks/useQueries';
import ProductForm from './ProductForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';
import type { Product } from '../../backend';

export default function ProductManager() {
  const { data: products = [], isLoading } = useGetAllProducts();
  const deleteProduct = useDeleteProduct();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct.mutateAsync(productId);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-maroon">Product Management</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-maroon hover:bg-gold/90" onClick={() => setEditingProduct(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-maroon">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm product={editingProduct} onClose={handleCloseForm} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
        </div>
      ) : products.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-maroon/60">
            <p>No products yet. Add your first product to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="border-gold/20">
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image.getDirectURL()}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-2 text-lg text-maroon">{product.name}</CardTitle>
                <p className="mb-2 text-sm text-maroon/60">{product.category}</p>
                <p className="line-clamp-2 text-sm text-maroon/70">{product.description}</p>
                <p className="mt-2 text-xl font-bold text-gold">₹{product.price.toString()}</p>
              </CardContent>
              <CardFooter className="flex gap-2 border-t border-gold/20 p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(product)}
                  className="flex-1 border-maroon text-maroon hover:bg-maroon/10"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                  disabled={deleteProduct.isPending}
                  className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
