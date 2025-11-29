import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { Pricing } from "@/components/sections/Pricing";
import { Demo } from "@/components/sections/Demo";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <Demo />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
