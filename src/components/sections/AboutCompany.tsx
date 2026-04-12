import { motion } from "framer-motion";
import { TextRevealHeading, RevealLine, StaggerContainer, StaggerItem } from "@/components/TextReveal";

export const AboutCompany = () => {
  return (
    <section id="about-dishviz" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs font-inter text-muted-foreground uppercase mb-4"
          >
            Our Story
          </motion.p>
          <TextRevealHeading className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            About DishViz
          </TextRevealHeading>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass rounded-2xl p-8 sm:p-12 glow-border">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8"
            >
              DishViz is an AR menu platform that helps restaurants show their dishes in 3D before guests order.
              Instead of guessing from text or low-quality photos, customers can scan a QR code, rotate the dish,
              see portions clearly, and order with confidence.
            </motion.p>

            <RevealLine delay={0.5} />

            <div className="pt-8 space-y-6">
              <h3 className="text-xl font-playfair font-bold text-foreground">
                We're building DishViz to:
              </h3>
              <StaggerContainer className="space-y-3" staggerDelay={0.1}>
                {[
                  "Reduce confusion and disappointments at the table",
                  "Help restaurants increase average order value",
                  "Create a modern, memorable dining experience",
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <li className="flex items-start text-muted-foreground list-none">
                      <span className="text-accent mr-3 mt-1">—</span>
                      <span>{item}</span>
                    </li>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <RevealLine delay={0.7} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-6"
              >
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Started in 2025</strong> — Currently working with
                  early pilot restaurants to bring "see before you order" to menus across India and beyond.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
