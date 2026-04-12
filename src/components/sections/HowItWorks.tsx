import { motion } from "framer-motion";
import { TextRevealHeading, RevealLine, StaggerContainer, StaggerItem, CharReveal } from "@/components/TextReveal";

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
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs font-inter text-muted-foreground uppercase mb-4"
          >
            The Process
          </motion.p>
          <TextRevealHeading className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            It's Easy to Get Started
          </TextRevealHeading>
        </div>

        <StaggerContainer className="space-y-20 sm:space-y-28" staggerDelay={0.2}>
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <div className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-12 items-start">
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-7xl sm:text-8xl font-playfair font-bold text-foreground/15 leading-none"
                >
                  {step.number}
                </motion.p>
                <div>
                  <RevealLine delay={index * 0.15} className="mb-6" />
                  <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                    <CharReveal delay={0.2}>{step.description}</CharReveal>
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
