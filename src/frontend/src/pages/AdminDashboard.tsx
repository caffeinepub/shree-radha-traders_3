import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductManager from '../components/admin/ProductManager';
import BannerManager from '../components/admin/BannerManager';
import InquiryManager from '../components/admin/InquiryManager';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-maroon">Admin Dashboard</h1>
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-cream">
          <TabsTrigger value="products" className="data-[state=active]:bg-maroon data-[state=active]:text-cream">
            Products
          </TabsTrigger>
          <TabsTrigger value="banners" className="data-[state=active]:bg-maroon data-[state=active]:text-cream">
            Banners
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="data-[state=active]:bg-maroon data-[state=active]:text-cream">
            Inquiries
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductManager />
        </TabsContent>
        <TabsContent value="banners">
          <BannerManager />
        </TabsContent>
        <TabsContent value="inquiries">
          <InquiryManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
