import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { LifeGallery } from "@/components/sections/LifeGallery";

export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-sans selection:bg-black selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <LifeGallery />
        <BentoGrid />
      </main>
      <Footer />
    </div>
  );
}
