import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Pricing = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <p className="text-xs font-inter text-muted-foreground uppercase tracking-[0.3em]">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            Tailored to Your Needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Our pricing is customized based on your restaurant's needs, including the number of dishes and locations.
          </p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={scrollToContact}
            className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-foreground/30 flex items-center justify-center text-foreground font-playfair text-base tracking-widest hover:bg-foreground/10 transition-smooth cursor-pointer mx-auto"
          >
            Get a Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
