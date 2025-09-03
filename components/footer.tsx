import { Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>+27 84 389-2067</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>dboniwe@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=-32.9149036,27.4195700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Shop no 5 Zwelitsha Complex</span>
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4" />
                <div>
                  <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p>Sat: 10:00 AM - 6:00 PM</p>
                  <p>Sun: 12:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/zanmvula"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span>@zanmvula</span>
              </a>
            </div>
            <p className="text-sm mt-4 text-primary-foreground/80">
              Follow us for the latest traditional African fashion inspiration
              and custom garment showcases.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm text-primary-foreground/80">
            © 2025 Zanemvula. All rights reserved. Celebrating African heritage
            through traditional craftsmanship.
          </p>
          <p className="text-xs text-primary-foreground/60 mt-2">
            Developed by Subgen IT Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
