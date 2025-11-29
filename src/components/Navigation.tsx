import { useState, useEffect } from "react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-primary shadow-soft"
          : "bg-primary"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-playfair font-bold text-primary-foreground"
            >
              DishViz
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-smooth text-base font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-smooth text-base font-medium"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-smooth text-base font-medium"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-smooth text-base font-medium"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-smooth text-base font-medium"
            >
              Founder
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
