import { motion } from "framer-motion";

const benefits = [
  {
    title: "Guests Order with Confidence",
    description: "No more guessing. Guests see the exact size and look of the dish before they buy it.",
  },
  {
    title: "Sell More High-Profit Items",
    description: "Visually stunning specials and desserts are easier to sell, which increases your total order value.",
  },
  {
    title: "Helps All Your Customers",
    description: "Pictures are understood by everyone. Serve all guests easily, even if they don't speak the local language.",
  },
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-xs font-inter text-muted-foreground uppercase tracking-[0.3em] mb-4">
            Why Choose Us
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            Key Benefits for You
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass rounded-2xl p-8 sm:p-10 glow-border group hover:bg-card/80 transition-smooth"
            >
              <h3 className="text-xl sm:text-2xl font-playfair font-bold text-foreground mb-4 group-hover:text-accent transition-smooth">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
