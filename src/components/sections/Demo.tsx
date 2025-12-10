import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, Box } from "lucide-react";
import kebabImage from "@/assets/dish-kebab.jpg";
import pastaImage from "@/assets/dish-pasta.jpg";
import manchurianImage from "@/assets/dish-manchurian.jpg";
import { ARPreviewModal } from "@/components/ARPreviewModal";

const dishes = [
  {
    name: "Hara Bhara Kebab",
    image: kebabImage,
    model: "/models/falafel_dish.glb",
  },
  {
    name: "Fresh Pasta",
    image: pastaImage,
    model: "/models/pasta_dish.glb",
  },
  {
    name: "Manchurian",
    image: manchurianImage,
    model: "/models/manchurian_dish.glb",
  },
];

export const Demo = () => {
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadedModels, setLoadedModels] = useState<Set<number>>(new Set());

  const handleARClick = (e: React.MouseEvent, dishName: string) => {
    e.stopPropagation();
    setSelectedDish(dishName);
    setIsModalOpen(true);
  };

  const handleLoad3D = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setLoadedModels(prev => new Set([...prev, index]));
  };

  return (
    <section id="demo" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-3">
            Gallery
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            See examples of our AR menu dishes
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-smooth bg-background">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
              </div>

              {/* 3D Model Viewer - Only loads when user clicks */}
              {loadedModels.has(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 200 }}
                  className="mt-3 rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-background shadow-card"
                >
                  <model-viewer
                    src={dish.model}
                    alt={`3D model of ${dish.name}`}
                    camera-controls
                    auto-rotate
                    shadow-intensity="0.5"
                    exposure="1"
                    loading="lazy"
                    reveal="auto"
                    style={{ width: '100%', height: '200px' }}
                  />
                </motion.div>
              )}
              
              <div className="mt-4 text-center space-y-3">
                <p className="text-foreground font-medium text-lg">{dish.name}</p>
                
                <div className="flex gap-2 justify-center">
                  {!loadedModels.has(index) && (
                    <Button 
                      onClick={(e) => handleLoad3D(e, index)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Box className="w-4 h-4" />
                      View 3D
                    </Button>
                  )}
                  <Button 
                    onClick={(e) => handleARClick(e, dish.name)}
                    size="sm"
                    className="gap-2"
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
