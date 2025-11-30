import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 sm:mb-8">
            Our Team
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-card"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-6">
                AJ
              </div>
              <h3 className="text-xl sm:text-2xl font-playfair font-bold text-foreground mb-2">Arya Jain</h3>
              <p className="text-primary font-medium mb-3 sm:mb-4 text-sm sm:text-base">Founder & CEO</p>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                Passionate about bringing immersive technology to the restaurant 
                industry, making dining experiences more engaging and transparent.
              </p>

              <div className="pt-4 sm:pt-6 border-t border-border">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  <strong className="text-foreground">Concept started in 2025</strong> — 
                  Currently onboarding pilot restaurants and refining our AR menu platform.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-card"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-6">
                KS
              </div>
              <h3 className="text-xl sm:text-2xl font-playfair font-bold text-foreground mb-2">Kabeer Singh</h3>
              <p className="text-primary font-medium mb-3 sm:mb-4 text-sm sm:text-base">Chief Technology Officer</p>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                Leading the technical vision and development of DishViz's AR platform, 
                bringing cutting-edge technology to transform how restaurants showcase their menus.
              </p>

              <div className="pt-4 sm:pt-6 border-t border-border">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  <strong className="text-foreground">Joined in 2025</strong> — 
                  Building scalable infrastructure and innovative AR solutions for the restaurant industry.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
