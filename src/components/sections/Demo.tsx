import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
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

  const handleARClick = (e: React.MouseEvent, dishName: string) => {
    e.stopPropagation();
    setSelectedDish(dishName);
    setIsModalOpen(true);
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
              <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-smooth">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                
                {/* 3D Model Preview (inline) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-32 rounded-xl overflow-hidden bg-background/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-smooth transform translate-y-4 group-hover:translate-y-0">
                  <model-viewer
                    src={dish.model}
                    alt={`3D model of ${dish.name}`}
                    camera-controls
                    auto-rotate
                    shadow-intensity="0.5"
                    exposure="1"
                    loading="lazy"
                    reveal="auto"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
              
              <div className="mt-4 text-center space-y-2">
                <p className="text-foreground font-medium text-lg">{dish.name}</p>
                <Button 
                  onClick={(e) => handleARClick(e, dish.name)}
                  className="gap-2"
                  size="sm"
                >
                  <Eye className="w-4 h-4" />
                  View in AR
                </Button>
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
