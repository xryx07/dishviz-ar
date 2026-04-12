import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import { TextRevealHeading, RevealLine, StaggerContainer, StaggerItem } from "@/components/TextReveal";

export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", restaurant: "", email: "", phone: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: formData });
      if (error) throw error;
      toast({ title: "Message sent!", description: "We'll get back to you within 4 business hours." });
      setFormData({ name: "", restaurant: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs font-inter text-muted-foreground uppercase mb-4"
          >
            Reach Out
          </motion.p>
          <TextRevealHeading className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground">
            Contact Us
          </TextRevealHeading>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-foreground/80 text-sm tracking-wider uppercase">
                    Your Name <span className="text-destructive">*</span>
                  </Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required
                    className="mt-2 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/40" />
                </div>
                <div>
                  <Label htmlFor="restaurant" className="text-foreground/80 text-sm tracking-wider uppercase">
                    Restaurant Name <span className="text-destructive">*</span>
                  </Label>
                  <Input id="restaurant" name="restaurant" value={formData.restaurant} onChange={handleChange} required
                    className="mt-2 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/40" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-foreground/80 text-sm tracking-wider uppercase">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required
                    className="mt-2 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/40" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground/80 text-sm tracking-wider uppercase">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required
                    className="mt-2 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/40" />
                </div>
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground/80 text-sm tracking-wider uppercase">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                  className="mt-2 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/40" />
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-foreground/80 tracking-wider uppercase text-sm">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pt-8 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                Need answers right now? Our team is ready to help with your questions about using the technology.
              </p>
            </div>
            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
              {[
                { label: "Email", content: <a href="mailto:dishviz.ar@gmail.com" className="text-foreground hover:text-accent transition-smooth">dishviz.ar@gmail.com</a> },
                { label: "Phone", content: <p className="text-foreground">+91 98765 xxxxx</p> },
                { label: "Location", content: <p className="text-foreground">India</p> },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <RevealLine />
                  <div className="pt-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{item.label}</p>
                    {item.content}
                  </div>
                </StaggerItem>
              ))}
              <StaggerItem>
                <RevealLine />
                <div className="pt-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Follow Us</p>
                  <div className="flex gap-4">
                    {[
                      { href: "https://www.linkedin.com/in/dishviz-ar-3768aa3a2", icon: Linkedin, label: "LinkedIn" },
                      { href: "https://www.instagram.com/dishviz.ar", icon: Instagram, label: "Instagram" },
                      { href: "https://x.com/dishviz_ar", icon: Twitter, label: "X (Twitter)" },
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full border border-foreground/20 text-foreground hover:bg-foreground/10 transition-smooth"
                        aria-label={social.label}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <social.icon size={18} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
