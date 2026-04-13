import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Subtle ambient glow */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--foreground) / 0.06) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.8, 0.4] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Logo text */}
          <motion.h1
            className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-wider relative z-10"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.15em" }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            DishViz
          </motion.h1>

          {/* Expanding line beneath */}
          <motion.div
            className="h-px bg-foreground/30 mt-6 relative z-10"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Tagline */}
          <motion.p
            className="text-muted-foreground text-sm tracking-[0.3em] mt-4 font-inter relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            VISUAL MENUS
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
