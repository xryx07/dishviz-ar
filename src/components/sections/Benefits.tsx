import { motion } from "framer-motion";

const benefits = [
  {
    number: "1",
    title: "Guests Order with Confidence",
    description: "No more guessing. Guests see the exact size and look of the dish before they buy it.",
  },
  {
    number: "2",
    title: "Sell More High-Profit Items",
    description: "Visually stunning specials and desserts are easier to sell, which increases your total order value.",
  },
  {
    number: "3",
    title: "Helps All Your Customers",
    description: "Pictures are understood by everyone. Serve all guests easily, even if they don't speak the local language.",
  },
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-6">
            Key Benefits for You
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our solution fixes small issues that slow down the guest experience and hurt your business profits.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-soft transition-smooth"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {benefit.number}. {benefit.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
