import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            About Us
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-3xl p-8 md:p-12 shadow-soft"
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              We help restaurants upgrade their menu experience using AR technology. 
              Our mission is to bridge the gap between what customers expect and what 
              they receive, creating delightful dining experiences while helping 
              restaurants increase their revenue.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-2xl font-bold mb-6">Our Team</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                    AJ
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Arya Jain</h4>
                    <p className="text-primary font-medium mb-2">Founder & AR Developer</p>
                    <p className="text-muted-foreground">
                      Passionate about bringing immersive technology to the restaurant 
                      industry, making dining experiences more engaging and transparent.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-2xl font-bold mb-4">Our Journey</h3>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Concept started in 2025</strong> — 
                  Currently onboarding pilot restaurants and refining our AR menu platform 
                  to deliver the best possible experience for restaurant owners and their guests.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
