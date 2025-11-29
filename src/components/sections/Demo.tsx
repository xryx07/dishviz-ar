import { motion } from "framer-motion";
import burgerImage from "@/assets/dish-burger.jpg";
import dessertImage from "@/assets/dish-dessert.jpg";
import pastaImage from "@/assets/dish-pasta.jpg";

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
  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-4">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See examples of our AR menu dishes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
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
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-foreground font-medium">{dish.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
