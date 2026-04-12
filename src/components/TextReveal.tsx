import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Word-by-word text reveal on scroll
export const TextRevealHeading = ({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) => {
  const words = children.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

// Character-by-character reveal for smaller text
export const CharReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) => {
  const chars = children.split("");

  return (
    <motion.span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.03,
            delay: delay + i * 0.02,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Parallax wrapper - moves content at different scroll speed
export const ParallaxSection = ({
  children,
  speed = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

// Horizontal line that expands on scroll
export const RevealLine = ({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={`h-px bg-foreground/20 origin-left ${className}`}
  />
);

// Fade-up with stagger for groups
export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: staggerDelay } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Parallax image with scale effect
export const ParallaxImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
