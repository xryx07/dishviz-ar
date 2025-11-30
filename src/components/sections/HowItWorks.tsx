import { motion } from "framer-motion";

const steps = [
  {
    number: "Step 1",
    title: "Take Photos",
    description: "Just take clear, high-quality photos of the dishes you want to show off.",
  },
  {
    number: "Step 2",
    title: "We Build the 3D Model",
    description: "Our team turns your photos into realistic 3D models and hosts them on our fast servers.",
  },
  {
    number: "Step 3",
    title: "Guests View and Order",
    description: "Guests scan a QR code at their table, see the 3D dish, and place their order easily.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            THE STEPS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-3">
            It's Easy to Get Started.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We do all the hard work creating the 3D models; you just focus on your customers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-soft transition-smooth"
            >
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground mb-4">{step.number}</p>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
