import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ProductGallery from '../components/home/ProductGallery';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <ProductGallery />
      <WhyChooseUsSection />
      <ContactSection />
    </div>
  );
}
