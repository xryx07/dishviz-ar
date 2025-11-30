import { useState } from "react";
import { motion } from "framer-motion";
import burgerImage from "@/assets/dish-burger.jpg";
import dessertImage from "@/assets/dish-dessert.jpg";
import pastaImage from "@/assets/dish-pasta.jpg";
import { ARPreviewModal } from "@/components/ARPreviewModal";

const dishes = [
  {
    name: "Gourmet Burger",
    image: burgerImage,
  },
  {
    name: "Chocolate Dessert",
    image: dessertImage,
  },
  {
    name: "Fresh Pasta",
    image: pastaImage,
  },
];

export const Demo = () => {
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDishClick = (dishName: string) => {
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

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleDishClick(dish.name)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-smooth">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-smooth" />
              </div>
              <div className="mt-3 text-center">
                <p className="text-foreground font-medium mb-1">{dish.name}</p>
                <p className="text-sm text-primary font-medium">AR View →</p>
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
