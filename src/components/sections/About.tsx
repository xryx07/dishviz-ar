import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-8">
            Founder
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-3xl p-8 md:p-12 shadow-card"
        >
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              AJ
            </div>
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">Arya Jain</h3>
            <p className="text-primary font-medium mb-4">Founder & AR Developer</p>
          </div>

          <div className="space-y-6 text-center">
            <p className="text-lg text-muted-foreground">
              Passionate about bringing immersive technology to the restaurant 
              industry, making dining experiences more engaging and transparent.
            </p>

            <div className="pt-6 border-t border-border">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Concept started in 2025</strong> — 
                Currently onboarding pilot restaurants and refining our AR menu platform.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
