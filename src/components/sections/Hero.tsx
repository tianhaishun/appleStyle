import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0.02)_0%,_rgba(0,0,0,0)_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.02)_0%,_rgba(0,0,0,0)_50%)] pointer-events-none" />
      
      <Container className="relative z-10 flex flex-col items-center text-center">
        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-[1.1]">
            Simplicity is the ultimate sophistication.
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-normal">
            Exploring the intersection of design, technology, and minimalist living.
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="flex gap-4">
             <Button size="lg" className="rounded-full px-8 text-lg h-14">
               Read Articles
             </Button>
             <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-14 border-neutral-300 dark:border-neutral-700">
               My Projects
             </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
