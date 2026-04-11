const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 15,
  duration: Math.random() * 10 + 12,
  opacity: Math.random() * 0.4 + 0.1,
}));

export const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: p.left,
            bottom: '-5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
};
