import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FloatingContactButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToContact}
      className={`fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      size="icon"
    >
      <MessageCircle size={24} />
    </Button>
  );
};
