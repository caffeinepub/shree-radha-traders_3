import { useState } from 'react';
import { useGetAllBanners, useDeleteBanner } from '../../hooks/useQueries';
import BannerForm from './BannerForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';
import type { Banner } from '../../backend';

export default function BannerManager() {
  const { data: banners = [], isLoading } = useGetAllBanners();
  const deleteBanner = useDeleteBanner();
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = async (bannerId: string) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      await deleteBanner.mutateAsync(bannerId);
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBanner(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-maroon">Banner Management</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-maroon hover:bg-gold/90" onClick={() => setEditingBanner(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-maroon">{editingBanner ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
            </DialogHeader>
            <BannerForm banner={editingBanner} onClose={handleCloseForm} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
        </div>
      ) : banners.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-maroon/60">
            <p>No banners yet. Add your first banner to customize the hero section.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {banners.map((banner) => (
            <Card key={banner.id} className="border-gold/20">
              <CardHeader className="p-0">
                <div className="aspect-[1920/800] overflow-hidden rounded-t-lg">
                  <img src={banner.image.getDirectURL()} alt="Banner" className="h-full w-full object-cover" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {banner.link && (
                  <p className="text-sm text-maroon/70">
                    Link: <span className="text-gold">{banner.link}</span>
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex gap-2 border-t border-gold/20 p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(banner)}
                  className="flex-1 border-maroon text-maroon hover:bg-maroon/10"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(banner.id)}
                  disabled={deleteBanner.isPending}
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
