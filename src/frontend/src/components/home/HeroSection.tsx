import { Button } from '@/components/ui/button';
import { useGetAllBanners } from '../../hooks/useQueries';

export default function HeroSection() {
  const { data: banners } = useGetAllBanners();

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppOrder = () => {
    window.open(
      'https://wa.me/919876543210?text=Hello%20Shree%20Radha%20Traders%2C%20I%20would%20like%20to%20place%20a%20bulk%20order.',
      '_blank'
    );
  };

  const backgroundImage =
    banners && banners.length > 0 ? banners[0].image.getDirectURL() : '/assets/generated/hero-banner.dim_1920x800.png';

  return (
    <section id="home" className="relative h-[600px] w-full overflow-hidden md:h-[800px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 to-maroon/60"></div>
      </div>

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-cream md:text-6xl">
              Premium Wedding Gift Packaging for Grand Celebrations
            </h1>
            <p className="text-xl text-gold md:text-2xl">Bulk Orders | Pan India Delivery</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={scrollToProducts}
                size="lg"
                className="bg-gold text-maroon hover:bg-gold/90 hover:shadow-lg"
              >
                View Collection
              </Button>
              <Button
                onClick={handleWhatsAppOrder}
                size="lg"
                variant="outline"
                className="border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-maroon"
              >
                Order on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
