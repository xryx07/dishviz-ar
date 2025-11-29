export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-playfair font-bold text-primary-foreground mb-4">
              DishViz
            </h3>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Helping restaurants upgrade their menu experience using AR technology.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
            >
              Founder
            </button>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 DishViz. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
