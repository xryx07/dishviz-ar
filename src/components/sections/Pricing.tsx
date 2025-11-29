import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small cafés",
    price: "Contact",
    features: [
      "Up to 20 dishes",
      "AR menu for one location",
      "QR code generation",
      "Email support",
      "Monthly updates",
    ],
  },
  {
    name: "Pro",
    description: "For restaurants",
    price: "Contact",
    features: [
      "Up to 50 dishes",
      "Multiple locations",
      "Menu management dashboard",
      "Analytics & insights",
      "Priority support",
      "Weekly updates",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For chains & hotels",
    price: "Custom",
    features: [
      "Unlimited dishes",
      "Unlimited locations",
      "Custom integrations",
      "On-site onboarding",
      "Dedicated manager",
      "Real-time updates",
      "White-label options",
    ],
  },
];

export const Pricing = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your restaurant's needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-card rounded-3xl p-8 shadow-soft hover:shadow-glow transition-smooth ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="hero-gradient text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="text-4xl font-extrabold mb-2">{plan.price}</div>
                {plan.price !== "Custom" && (
                  <p className="text-sm text-muted-foreground">for a quote</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "hero-gradient shadow-glow"
                    : "bg-secondary hover:bg-secondary/90"
                }`}
                size="lg"
                onClick={scrollToContact}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-muted-foreground"
        >
          Pricing depends on number of dishes and locations. Contact us for a detailed quote.
        </motion.p>
      </div>
    </section>
  );
};
