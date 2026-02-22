import InquiryForm from './InquiryForm';
import { Phone, MapPin } from 'lucide-react';
import { SiWhatsapp, SiInstagram } from 'react-icons/si';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-softPink/20 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-maroon md:text-4xl">Get In Touch</h2>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="rounded-lg border-2 border-gold/30 bg-white p-6">
              <h3 className="mb-6 text-2xl font-semibold text-maroon">Contact Information</h3>

              <div className="space-y-4">
                <a
                  href="tel:+919876543210"
                  className="flex items-center space-x-3 text-maroon transition-colors hover:text-gold"
                >
                  <Phone className="h-5 w-5" />
                  <span>+91 98765 43210</span>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-maroon transition-colors hover:text-gold"
                >
                  <SiWhatsapp className="h-5 w-5" />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href="https://instagram.com/shreeradhatraders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-maroon transition-colors hover:text-gold"
                >
                  <SiInstagram className="h-5 w-5" />
                  <span>@shreeradhatraders</span>
                </a>

                <div className="flex items-start space-x-3 text-maroon">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0" />
                  <span>Churu, Rajasthan, India</span>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="overflow-hidden rounded-lg border-2 border-gold/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113647.4!2d74.9647!3d28.3019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917b1e67e1e1e1f%3A0x1e1e1e1e1e1e1e1e!2sChuru%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Churu, Rajasthan Location"
              ></iframe>
            </div>
          </div>

          {/* Inquiry Form */}
          <div>
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
