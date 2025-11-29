import { motion } from "framer-motion";
import { Upload, Sparkles, QrCode, Smartphone } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Menu / Photos",
    description: "Send us your dish images, details, and pricing. We handle the rest.",
  },
  {
    icon: Sparkles,
    title: "We Create AR Dishes",
    description: "Our team converts your dishes into stunning 3D/AR models.",
  },
  {
    icon: QrCode,
    title: "Place QR Codes on Tables",
    description: "We provide QR codes or links for each dish or your full menu.",
  },
  {
    icon: Smartphone,
    title: "Guests Scan & View in AR",
    description: "Customers scan with their phone → see dish in AR → order confidently.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your restaurant's menu experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-smooth h-full">
                <div className="w-16 h-16 hero-gradient rounded-xl flex items-center justify-center mb-6">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="absolute top-4 right-4 text-5xl font-bold text-muted/20">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground bg-card px-6 py-3 rounded-full inline-block shadow-soft">
            ✨ No app required — works in the browser on most modern smartphones
          </p>
        </motion.div>
      </div>
    </section>
  );
};
