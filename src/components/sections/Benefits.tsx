import { motion } from "framer-motion";
import { TextRevealHeading, StaggerContainer, StaggerItem } from "@/components/TextReveal";

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
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs font-inter text-muted-foreground uppercase mb-4"
          >
            Why Choose Us
          </motion.p>
          <TextRevealHeading className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            Key Benefits for You
          </TextRevealHeading>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.15}>
          {benefits.map((benefit, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8, borderColor: "hsl(30 25% 88% / 0.25)" }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-8 sm:p-10 glow-border group hover:bg-card/80 h-full"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 0.1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="block text-6xl font-playfair font-bold text-foreground mb-4"
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
                <h3 className="text-xl sm:text-2xl font-playfair font-bold text-foreground mb-4 group-hover:text-accent transition-smooth">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
