import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-inter text-muted-foreground uppercase tracking-[0.3em] mb-4">
            The Team
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            Our Team
          </h2>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 sm:p-10 glow-border max-w-lg w-full"
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full border border-foreground/20 text-foreground flex items-center justify-center text-3xl font-playfair font-bold mx-auto mb-6">
                AJ
              </div>
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">Arya Jain</h3>
              <p className="text-accent font-medium text-sm tracking-wider uppercase">Founder & CEO</p>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-muted-foreground leading-relaxed">
                Passionate about bringing immersive technology to the restaurant
                industry, making dining experiences more engaging and transparent.
              </p>
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Concept started in 2025</strong> —
                  Currently onboarding pilot restaurants and refining our AR menu platform.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
