import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    restaurant: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 4 business hours.",
    });

    setFormData({
      name: "",
      restaurant: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-foreground">
            Contact Us
          </h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-foreground">
                    Your Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-background border-input"
                  />
                </div>

                <div>
                  <Label htmlFor="restaurant" className="text-foreground">
                    Restaurant Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="restaurant"
                    name="restaurant"
                    value={formData.restaurant}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-background border-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Your Work Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-background border-input"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-background border-input"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-destructive">
                  Message (e.g., How many locations?)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="mt-2 bg-background border-input"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Send Contact Request
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pt-12 space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-playfair font-bold text-foreground mb-4 sm:mb-6">
                Get in Touch
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                Need answers right now? Our team is ready to help with your questions about using the technology.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="border-t border-border pt-4 sm:pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Email</h4>
                <a 
                  href="mailto:contact@dishviz.com" 
                  className="text-base sm:text-lg text-primary hover:underline"
                >
                  contact@dishviz.com
                </a>
              </div>

              <div className="border-t border-border pt-4 sm:pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Phone</h4>
                <a 
                  href="tel:+919876543210" 
                  className="text-base sm:text-lg text-primary hover:underline"
                >
                  +91 98765 43210
                </a>
              </div>

              <div className="border-t border-border pt-4 sm:pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Location</h4>
                <p className="text-base sm:text-lg text-muted-foreground">
                  India
                </p>
              </div>

              <div className="border-t border-border pt-4 sm:pt-6">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We usually reply in under 4 business hours.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
