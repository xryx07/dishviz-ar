import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";

export const Hero = () => {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair font-bold text-foreground leading-[1.1] mb-8"
        >
          Amazing Visual Menus.
          <br />
          <span className="text-foreground/60">Made Simple</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full overflow-hidden glow-border mb-10"
        >
          <model-viewer
            src="/models/falafel_dish.glb"
            alt="3D falafel dish preview"
            camera-controls
            auto-rotate
            shadow-intensity="1"
            exposure="1.2"
            loading="eager"
            reveal="auto"
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          onClick={scrollToDemo}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-foreground/30 flex items-center justify-center text-foreground font-playfair text-lg tracking-widest hover:bg-foreground/10 transition-smooth cursor-pointer"
        >
          Explore
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6 text-sm text-muted-foreground tracking-wider"
        >
          Drag to rotate • Pinch to zoom
        </motion.p>
      </div>
    </section>
  );
};
