import { motion } from "framer-motion";
import { TrendingUp, MessageCircleX, Sparkles, Globe } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Higher Order Value",
    description: "People order more when they see realistic portions & toppings. Increase average checks by up to 35%.",
  },
  {
    icon: MessageCircleX,
    title: "Less Confusion / Fewer Complaints",
    description: "Guests know exactly what they're getting before ordering, reducing returns and dissatisfaction.",
  },
  {
    icon: Sparkles,
    title: "Modern, Premium Experience",
    description: "Make your restaurant feel tech-forward and unique. Stand out from competitors with immersive menus.",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Perfect for tourists, malls, and airports. Show dishes universally without language barriers.",
  },
];

const features = [
  "3D / AR models for dishes",
  "QR-based AR viewing",
  "Menu management dashboard",
  "Update dishes, prices, availability",
  "Analytics: dish views & clicks",
  "Multi-location support",
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Why Restaurants Love AR Menus
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your menu experience and boost your bottom line
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-smooth"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            Everything You Need
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-soft"
              >
                <div className="w-6 h-6 rounded-full hero-gradient flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-primary-foreground"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
