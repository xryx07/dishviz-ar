export const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'demo', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
    { id: 'about', label: 'Founder' },
  ];

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-playfair font-bold text-foreground mb-6 tracking-wider">
          DishViz
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-10 text-sm leading-relaxed">
          Helping restaurants upgrade their menu experience using AR technology.
        </p>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-12">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-muted-foreground hover:text-foreground transition-smooth text-sm tracking-wider uppercase"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-muted-foreground/60 text-xs tracking-wider">
            © 2025 DishViz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
