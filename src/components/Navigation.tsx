import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "How It Works", href: "how-it-works" },
  { name: "Benefits", href: "benefits" },
  { name: "Pricing", href: "pricing" },
  { name: "Demo", href: "demo" },
  { name: "About", href: "about" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              AR Menu
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground/70 hover:text-foreground font-medium transition-smooth"
                >
                  {link.name}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('contact')}
                className="hero-gradient shadow-glow hover:opacity-90 transition-smooth"
              >
                Book Demo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-background pt-20 md:hidden"
        >
          <div className="flex flex-col items-center gap-6 p-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-xl font-medium text-foreground/70 hover:text-foreground transition-smooth"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="hero-gradient shadow-glow hover:opacity-90 transition-smooth w-full max-w-xs"
            >
              Book Demo
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
};
