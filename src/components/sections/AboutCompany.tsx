import { motion } from "framer-motion";

export const AboutCompany = () => {
  return (
    <section id="about-dishviz" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-4 sm:mb-6">
            About DishViz
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-card">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              DishViz is an AR menu platform that helps restaurants show their dishes in 3D before guests order. 
              Instead of guessing from text or low-quality photos, customers can scan a QR code, rotate the dish, 
              see portions clearly, and order with confidence.
            </p>

            <div className="border-t border-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-playfair font-bold text-foreground mb-3 sm:mb-4">
                  We're building DishViz to:
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span className="text-sm sm:text-base">Reduce confusion and disappointments at the table</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span className="text-sm sm:text-base">Help restaurants increase average order value</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span className="text-sm sm:text-base">Create a modern, memorable dining experience</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-border">
                <p className="text-sm sm:text-base text-muted-foreground">
                  <strong className="text-foreground">Started in 2025</strong>, DishViz is currently working with 
                  early pilot restaurants to bring "see before you order" to menus across India and beyond.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
