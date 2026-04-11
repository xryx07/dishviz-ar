import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Box, Loader2 } from "lucide-react";
import kebabImage from "@/assets/dish-kebab.jpg";
import pastaImage from "@/assets/dish-pasta.jpg";
import manchurianImage from "@/assets/dish-manchurian.jpg";
import { ARPreviewModal, preloadModel, preloadAllModels } from "@/components/ARPreviewModal";

const dishes = [
  {
    name: "Hara Bhara Kebab",
    description: "Crispy spinach & pea patties with mint chutney",
    price: "₹249",
    image: kebabImage,
    model: "/models/falafel_dish.glb",
    poster: kebabImage,
  },
  {
    name: "Fresh Pasta",
    description: "Creamy Alfredo with herbs & parmesan",
    price: "₹349",
    image: pastaImage,
    model: "/models/pasta_dish.glb",
    poster: pastaImage,
  },
  {
    name: "Manchurian",
    description: "Indo-Chinese veg balls in spicy sauce",
    price: "₹279",
    image: manchurianImage,
    model: "/models/manchurian_dish.glb",
    poster: manchurianImage,
  },
];

export const Demo = () => {
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadedModels, setLoadedModels] = useState<Set<number>>(new Set());
  const [loadingModels, setLoadingModels] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => preloadAllModels(), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleARClick = (e: React.MouseEvent, dishName: string) => {
    e.stopPropagation();
    setSelectedDish(dishName);
    setIsModalOpen(true);
  };

  const handleLoad3D = (e: React.MouseEvent, index: number, modelPath: string) => {
    e.stopPropagation();
    setLoadingModels(prev => new Set([...prev, index]));
    preloadModel(modelPath);
    setTimeout(() => {
      setLoadedModels(prev => new Set([...prev, index]));
      setLoadingModels(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 300);
  };

  return (
    <section id="demo" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-xs font-inter text-muted-foreground uppercase tracking-[0.3em] mb-4">
            Our Work
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            Gallery
          </h2>
        </motion.div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-8 md:hidden">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl overflow-hidden glow-border"
              onMouseEnter={() => preloadModel(dish.model)}
            >
              <div className="relative">
                {loadedModels.has(index) ? (
                  <div className="w-full aspect-square bg-background/50">
                    <model-viewer
                      src={dish.model}
                      alt={`3D model of ${dish.name}`}
                      poster={dish.poster}
                      camera-controls
                      auto-rotate
                      shadow-intensity="0.5"
                      exposure="1"
                      loading="eager"
                      reveal="auto"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                ) : loadingModels.has(index) ? (
                  <div className="w-full aspect-square bg-background/50 flex flex-col items-center justify-center gap-3">
                    <Skeleton className="w-24 h-24 rounded-full bg-muted" />
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-foreground" />
                      <span className="text-sm text-muted-foreground">Loading 3D model...</span>
                    </div>
                  </div>
                ) : (
                  <img src={dish.image} alt={dish.name} loading="lazy" className="w-full aspect-square object-cover" />
                )}
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-playfair font-bold text-foreground">{dish.name}</h3>
                  <span className="text-lg font-bold text-accent whitespace-nowrap">{dish.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">{dish.description}</p>
                <div className="flex gap-3 pt-1">
                  {!loadedModels.has(index) && (
                    <Button
                      onClick={(e) => handleLoad3D(e, index, dish.model)}
                      variant="outline"
                      size="default"
                      className="flex-1 gap-2 border-foreground/20 text-foreground hover:bg-foreground/10"
                      disabled={loadingModels.has(index)}
                    >
                      {loadingModels.has(index) ? <Loader2 className="w-4 h-4 animate-spin" /> : <Box className="w-4 h-4" />}
                      {loadingModels.has(index) ? "Loading..." : "View 3D"}
                    </Button>
                  )}
                  <Button
                    onClick={(e) => handleARClick(e, dish.name)}
                    size="default"
                    className={`gap-2 bg-foreground text-background hover:bg-foreground/80 ${loadedModels.has(index) ? 'flex-1' : ''}`}
                  >
                    <Eye className="w-4 h-4" />
                    View in AR
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
              onMouseEnter={() => preloadModel(dish.model)}
            >
              <div className="relative rounded-2xl overflow-hidden glow-border">
                <img src={dish.image} alt={dish.name} loading="lazy" className="w-full aspect-square object-cover" />
              </div>

              {loadingModels.has(index) && !loadedModels.has(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 200 }}
                  className="mt-3 rounded-2xl overflow-hidden glass"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <Skeleton className="w-24 h-24 rounded-full bg-muted" />
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-foreground" />
                      <span className="text-sm text-muted-foreground">Loading 3D model...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {loadedModels.has(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 200 }}
                  className="mt-3 rounded-2xl overflow-hidden glass"
                >
                  <model-viewer
                    src={dish.model}
                    alt={`3D model of ${dish.name}`}
                    poster={dish.poster}
                    camera-controls
                    auto-rotate
                    shadow-intensity="0.5"
                    exposure="1"
                    loading="eager"
                    reveal="auto"
                    style={{ width: '100%', height: '200px' }}
                  />
                </motion.div>
              )}

              <div className="mt-4 text-center space-y-2">
                <p className="text-foreground font-playfair font-bold text-lg">{dish.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{dish.description}</p>
                <p className="text-accent font-bold">{dish.price}</p>
                <div className="flex gap-2 justify-center pt-1">
                  {!loadedModels.has(index) && (
                    <Button
                      onClick={(e) => handleLoad3D(e, index, dish.model)}
                      variant="outline"
                      size="sm"
                      className="gap-2 border-foreground/20 text-foreground hover:bg-foreground/10"
                      disabled={loadingModels.has(index)}
                    >
                      {loadingModels.has(index) ? <Loader2 className="w-4 h-4 animate-spin" /> : <Box className="w-4 h-4" />}
                      {loadingModels.has(index) ? "Loading..." : "View 3D"}
                    </Button>
                  )}
                  <Button
                    onClick={(e) => handleARClick(e, dish.name)}
                    size="sm"
                    className="gap-2 bg-foreground text-background hover:bg-foreground/80"
                  >
                    <Eye className="w-4 h-4" />
                    View in AR
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedDish && (
        <ARPreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          dishName={selectedDish}
        />
      )}
    </section>
  );
};
