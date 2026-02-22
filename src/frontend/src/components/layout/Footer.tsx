import { SiWhatsapp, SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Contact', id: 'contact' },
  ];

  const appIdentifier = encodeURIComponent(window.location.hostname || 'shree-radha-traders');

  return (
    <footer className="border-t border-gold/20 bg-maroon text-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div>
            <h3 className="mb-4 text-2xl font-bold text-gold">Shree Radha Traders</h3>
            <p className="text-cream/80">
              Premium Wedding Gift Packaging
              <br />
              Churu, Rajasthan, India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-cream/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-gold">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/919876543210?text=Hello%20Shree%20Radha%20Traders"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream transition-colors hover:text-gold"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/shreeradhatraders"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream transition-colors hover:text-gold"
                aria-label="Instagram"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gold/20 pt-8 text-center text-sm text-cream/60">
          <p>© {new Date().getFullYear()} Shree Radha Traders. All rights reserved.</p>
          <p className="mt-2">
            Built with <Heart className="inline h-4 w-4 text-softPink" fill="currentColor" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
