import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, lazy } from "react";

const PastaGLBModel = lazy(() => import("../PastaGLBModel").then(m => ({ default: m.PastaGLBModel })));

export const Hero = () => {
  return (
    <section id="hero" className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground leading-tight">
              Amazing Visual Menus. Made Simple
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-background shadow-soft">
              <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                <Suspense fallback={null}>
                  <PastaGLBModel />
                  <OrbitControls 
                    enableZoom={false} 
                    autoRotate={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                  />
                </Suspense>
              </Canvas>
            </div>
            <p className="text-center mt-4 text-sm sm:text-base text-muted-foreground">
              Drag to rotate • Interactive 3D preview
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
