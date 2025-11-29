import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              AR Menu
            </h3>
            <p className="text-muted-foreground mb-4">
              Helping restaurants upgrade their menu experience using AR technology.
              Show 3D dishes on customers' phones and increase order value.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:contact@armenu.com"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+919876543210"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('benefits')}
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Benefits
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('demo')}
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="mailto:contact@armenu.com" className="hover:text-primary transition-smooth">
                  contact@armenu.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-primary transition-smooth">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 AR Menu. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <button className="text-muted-foreground hover:text-primary transition-smooth">
              Privacy Policy
            </button>
            <button className="text-muted-foreground hover:text-primary transition-smooth">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
