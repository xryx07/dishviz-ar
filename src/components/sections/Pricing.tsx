import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Pricing = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Pricing
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our pricing is customized based on your restaurant's needs, including the number of dishes and locations.
          </p>
          <p className="text-lg text-foreground mb-12">
            Get a personalized quote tailored to your business.
          </p>
          <Button
            className="hero-gradient shadow-glow text-lg px-8"
            size="lg"
            onClick={scrollToContact}
          >
            Contact Us for Pricing
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
