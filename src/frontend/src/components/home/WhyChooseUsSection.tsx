export default function WhyChooseUsSection() {
  const benefits = [
    {
      icon: '/assets/generated/quality-icon.dim_128x128.png',
      title: 'Premium Quality Material',
      description: 'Handcrafted with finest fabrics and materials for lasting elegance',
    },
    {
      icon: '/assets/generated/wholesale-icon.dim_128x128.png',
      title: 'Wholesale Prices',
      description: 'Competitive bulk pricing for wedding planners and event organizers',
    },
    {
      icon: '/assets/generated/delivery-icon.dim_128x128.png',
      title: 'Fast Delivery',
      description: 'Pan India delivery with timely dispatch for your special occasions',
    },
    {
      icon: '/assets/generated/trust-icon.dim_128x128.png',
      title: 'Trusted by Wedding Planners',
      description: 'Preferred choice of professionals across India for grand celebrations',
    },
  ];

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-maroon md:text-4xl">Why Choose Us</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-lg border-2 border-gold/30 bg-white p-6 text-center transition-all hover:border-gold hover:shadow-lg"
            >
              <div className="mb-4 flex justify-center">
                <img src={benefit.icon} alt={benefit.title} className="h-20 w-20 transition-transform group-hover:scale-110" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-maroon">{benefit.title}</h3>
              <p className="text-maroon/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
