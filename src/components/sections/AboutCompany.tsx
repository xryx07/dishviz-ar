import { motion } from "framer-motion";

export const AboutCompany = () => {
  return (
    <section id="about-dishviz" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-inter text-muted-foreground uppercase tracking-[0.3em] mb-4">
            Our Story
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            About DishViz
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass rounded-2xl p-8 sm:p-12 glow-border">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              DishViz is an AR menu platform that helps restaurants show their dishes in 3D before guests order.
              Instead of guessing from text or low-quality photos, customers can scan a QR code, rotate the dish,
              see portions clearly, and order with confidence.
            </p>

            <div className="border-t border-border pt-8 space-y-6">
              <h3 className="text-xl font-playfair font-bold text-foreground">
                We're building DishViz to:
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">—</span>
                  <span>Reduce confusion and disappointments at the table</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">—</span>
                  <span>Help restaurants increase average order value</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">—</span>
                  <span>Create a modern, memorable dining experience</span>
                </li>
              </ul>

              <div className="pt-6 border-t border-border">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Started in 2025</strong> — Currently working with
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
