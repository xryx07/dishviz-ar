import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useRef } from "react";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const modelScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const titleWords = "Amazing Visual Menus.".split(" ");
  const subtitleWords = "Made Simple".split(" ");

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-background overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        <motion.h1
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair font-bold text-foreground leading-[1.1] mb-8"
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {subtitleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.7 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-block mr-[0.3em] text-foreground/60"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ scale: modelScale }}
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
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={scrollToDemo}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-foreground/30 flex items-center justify-center text-foreground font-playfair text-lg tracking-widest hover:bg-foreground/10 transition-smooth cursor-pointer"
        >
          Explore
        </motion.button>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-6 text-sm text-muted-foreground tracking-wider"
        >
          Drag to rotate • Pinch to zoom
        </motion.p>
      </div>
    </section>
  );
};
