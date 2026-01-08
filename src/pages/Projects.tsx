import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BentoGrid } from "@/components/sections/BentoGrid";

export default function Projects() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-sans selection:bg-black selection:text-white">
      <Navbar />
      <main className="flex-grow pt-20">
        <BentoGrid />
      </main>
      <Footer />
    </div>
  );
}
