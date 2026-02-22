import { useState, useEffect } from 'react';
import { useAddBanner, useUpdateBanner } from '../../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ExternalBlob } from '../../backend';
import type { Banner } from '../../backend';

interface BannerFormProps {
  banner: Banner | null;
  onClose: () => void;
}

export default function BannerForm({ banner, onClose }: BannerFormProps) {
  const [link, setLink] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const addBanner = useAddBanner();
  const updateBanner = useUpdateBanner();

  useEffect(() => {
    if (banner) {
      setLink(banner.link);
      setImagePreview(banner.image.getDirectURL());
    }
  }, [banner]);

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

    if (!banner && !imageFile) {
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
        imageBlob = banner!.image;
      }

      if (banner) {
        await updateBanner.mutateAsync({ bannerId: banner.id, image: imageBlob, link });
      } else {
        await addBanner.mutateAsync({ image: imageBlob, link });
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitting = addBanner.isPending || updateBanner.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="banner-image" className="text-maroon">
          Banner Image {!banner && '*'}
        </Label>
        <Input
          id="banner-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!banner}
          className="border-gold/30 focus:border-gold"
        />
        <p className="mt-1 text-sm text-maroon/60">Recommended size: 1920x800 pixels</p>
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="Preview" className="h-32 w-full rounded-lg object-cover" />
          </div>
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-2">
            <Progress value={uploadProgress} className="h-2" />
            <p className="mt-1 text-sm text-maroon/60">Uploading: {uploadProgress}%</p>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="banner-link" className="text-maroon">
          Link (Optional)
        </Label>
        <Input
          id="banner-link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://example.com"
          className="border-gold/30 focus:border-gold"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting} className="flex-1 bg-gold text-maroon hover:bg-gold/90">
          {isSubmitting ? 'Saving...' : banner ? 'Update Banner' : 'Add Banner'}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
