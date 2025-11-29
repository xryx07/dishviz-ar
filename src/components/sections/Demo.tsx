import { motion } from "framer-motion";
import { Play } from "lucide-react";
import burgerImage from "@/assets/dish-burger.jpg";
import dessertImage from "@/assets/dish-dessert.jpg";
import pastaImage from "@/assets/dish-pasta.jpg";

const dishes = [
  {
    name: "Gourmet Burger",
    image: burgerImage,
    description: "Double patty with melted cheese",
  },
  {
    name: "Chocolate Dessert",
    image: dessertImage,
    description: "Rich chocolate with fresh berries",
  },
  {
    name: "Fresh Pasta",
    image: pastaImage,
    description: "Handmade pasta with vegetables",
  },
];

export const Demo = () => {
  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            See It in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience how AR menus bring dishes to life for your customers
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
              <div className="relative rounded-2xl overflow-hidden shadow-soft hover:shadow-glow transition-smooth">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-1">
                      {dish.name}
                    </h3>
                    <p className="text-white/80 text-sm">{dish.description}</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center shadow-glow">
                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="text-primary hover:text-primary/80 font-medium transition-smooth">
                  Tap to view AR preview (sample)
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Want to see your dishes in AR?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a free demo and we'll create a sample AR model of one of your signature dishes
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hero-gradient text-primary-foreground px-8 py-3 rounded-xl font-semibold shadow-glow hover:opacity-90 transition-smooth"
          >
            Request Free Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
};
