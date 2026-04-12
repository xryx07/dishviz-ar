import { motion } from "framer-motion";
import { TextRevealHeading, RevealLine } from "@/components/TextReveal";

export const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs font-inter text-muted-foreground uppercase mb-4"
          >
            The Team
          </motion.p>
          <TextRevealHeading className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            Our Team
          </TextRevealHeading>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-8 sm:p-10 glow-border max-w-lg w-full"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-24 h-24 rounded-full border border-foreground/20 text-foreground flex items-center justify-center text-3xl font-playfair font-bold mx-auto mb-6"
              >
                AJ
              </motion.div>
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">Arya Jain</h3>
              <p className="text-accent font-medium text-sm tracking-wider uppercase">Founder & CEO</p>
            </div>

            <RevealLine delay={0.5} className="my-6" />

            <div className="space-y-4 text-center">
              <p className="text-muted-foreground leading-relaxed">
                Passionate about bringing immersive technology to the restaurant
                industry, making dining experiences more engaging and transparent.
              </p>
              <RevealLine delay={0.7} />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="pt-4"
              >
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Concept started in 2025</strong> —
                  Currently onboarding pilot restaurants and refining our AR menu platform.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
