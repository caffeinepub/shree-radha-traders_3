import { useState, useEffect } from 'react';
import { useAddProduct, useUpdateProduct, useGetCategories } from '../../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ExternalBlob } from '../../backend';
import type { Product } from '../../backend';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data: categories = [] } = useGetCategories();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price.toString());
      setImagePreview(product.image.getDirectURL());
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !category || !price) {
      return;
    }

    if (!product && !imageFile) {
      return;
    }

    try {
      let imageBlob: ExternalBlob;

      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
      } else {
        imageBlob = product!.image;
      }

      const productData = {
        name,
        description,
        category,
        price: BigInt(price),
        image: imageBlob,
      };

      if (product) {
        await updateProduct.mutateAsync({ productId: product.id, product: productData });
      } else {
        await addProduct.mutateAsync(productData);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitting = addProduct.isPending || updateProduct.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="product-name" className="text-maroon">
          Product Name *
        </Label>
        <Input
          id="product-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          required
          className="border-gold/30 focus:border-gold"
        />
      </div>

      <div>
        <Label htmlFor="product-category" className="text-maroon">
          Category *
        </Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger className="border-gold/30 focus:border-gold">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="product-description" className="text-maroon">
          Description *
        </Label>
        <Textarea
          id="product-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          rows={4}
          required
          className="border-gold/30 focus:border-gold"
        />
      </div>

      <div>
        <Label htmlFor="product-price" className="text-maroon">
          Price (₹) *
        </Label>
        <Input
          id="product-price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          required
          min="0"
          className="border-gold/30 focus:border-gold"
        />
      </div>

      <div>
        <Label htmlFor="product-image" className="text-maroon">
          Product Image {!product && '*'}
        </Label>
        <Input
          id="product-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!product}
          className="border-gold/30 focus:border-gold"
        />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="Preview" className="h-32 w-32 rounded-lg object-cover" />
          </div>
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-2">
            <Progress value={uploadProgress} className="h-2" />
            <p className="mt-1 text-sm text-maroon/60">Uploading: {uploadProgress}%</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting} className="flex-1 bg-gold text-maroon hover:bg-gold/90">
          {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
