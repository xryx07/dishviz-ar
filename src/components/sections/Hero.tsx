import { motion } from "framer-motion";
import heroImage from "@/assets/hero-ar-menu.jpg";

export const Hero = () => {
  return (
    <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-foreground leading-tight">
              Amazing Visual Menus. Made Simple
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              <img
                src={heroImage}
                alt="AR Menu Preview"
                className="w-full h-auto rounded-3xl shadow-soft"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
