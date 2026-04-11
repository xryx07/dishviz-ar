import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Take Photos",
    description: "Just take clear, high-quality photos of the dishes you want to show off.",
  },
  {
    number: "02",
    title: "We Build the 3D Model",
    description: "Our team turns your photos into realistic 3D models and hosts them on our fast servers.",
  },
  {
    number: "03",
    title: "Guests View and Order",
    description: "Guests scan a QR code at their table, see the 3D dish, and place their order easily.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-inter text-muted-foreground uppercase tracking-[0.3em] mb-4">
            The Process
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            It's Easy to Get Started
          </h2>
        </motion.div>

        <div className="space-y-20 sm:space-y-28">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-12 items-start"
            >
              <p className="text-7xl sm:text-8xl font-playfair font-bold text-foreground/15 leading-none">
                {step.number}
              </p>
              <div className="border-t border-border pt-6">
                <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
