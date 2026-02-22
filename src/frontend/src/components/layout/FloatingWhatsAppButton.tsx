import { SiWhatsapp } from 'react-icons/si';

export default function FloatingWhatsAppButton() {
  const handleClick = () => {
    window.open(
      'https://wa.me/919876543210?text=Hello%20Shree%20Radha%20Traders%2C%20I%20am%20interested%20in%20your%20wedding%20gift%20packaging%20products.',
      '_blank'
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Contact us on WhatsApp"
    >
      <SiWhatsapp className="h-7 w-7 text-maroon" />
    </button>
  );
}
