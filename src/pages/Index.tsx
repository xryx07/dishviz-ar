import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { Pricing } from "@/components/sections/Pricing";
import { Demo } from "@/components/sections/Demo";
import { AboutCompany } from "@/components/sections/AboutCompany";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AIChatButton } from "@/components/AIChatButton";
import { SafariBanner } from "@/components/SafariBanner";
import { LoadingScreen } from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="min-h-screen bg-background">
        <SafariBanner />
        <Navigation />
        <main>
          <Hero />
          <HowItWorks />
          <Benefits />
          <Pricing />
          <Demo />
          <AboutCompany />
          <About />
          <Contact />
        </main>
        <Footer />
        <FloatingContactButton />
        <ScrollToTop />
        <AIChatButton />
      </div>
    </>
  );
};

export default Index;
