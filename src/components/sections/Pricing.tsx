import { motion } from "framer-motion";
import { TextRevealHeading, CharReveal, RevealLine } from "@/components/TextReveal";

export const Pricing = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs font-inter text-muted-foreground uppercase"
          >
            Pricing
          </motion.p>
          <TextRevealHeading className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            Tailored to Your Needs
          </TextRevealHeading>

          <RevealLine delay={0.3} className="max-w-xs mx-auto" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            <CharReveal delay={0.5}>
              Our pricing is customized based on your restaurant's needs, including the number of dishes and locations.
            </CharReveal>
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-foreground/30 flex items-center justify-center text-foreground font-playfair text-base tracking-widest hover:bg-foreground/10 transition-smooth cursor-pointer mx-auto"
          >
            Get a Quote
          </motion.button>
        </div>
      </div>
    </section>
  );
};
