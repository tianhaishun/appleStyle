import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animations/FadeIn";

export default function Article() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <article className="mx-auto max-w-[680px] px-6">
          <FadeIn>
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 block">Design Philosophy</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                The Art of Minimalism in Digital Spaces
              </h1>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <time dateTime="2023-10-24">October 24, 2023</time>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
             <div className="prose prose-lg prose-neutral dark:prose-invert mx-auto">
               <p className="lead text-xl text-foreground/80 font-medium leading-relaxed mb-8">
                 Minimalism isn't just about subtracting elements; it's about adding meaning. In a world of digital noise, silence is a luxury.
               </p>
               
               <p className="mb-6 text-lg leading-relaxed text-foreground/90">
                 When we look at the evolution of user interfaces, we see a clear trend towards reduction. But true reduction isn't empty—it's focused. Apple's design philosophy has always taught us that every element must serve a purpose. If it doesn't help the user achieve their goal, it's merely decoration.
               </p>

               <h2 className="text-2xl font-semibold mt-12 mb-6 tracking-tight">The Power of White Space</h2>
               
               <p className="mb-6 text-lg leading-relaxed text-foreground/90">
                 White space is active, not passive. It guides the eye, creates hierarchy, and gives content room to breathe. By increasing the margins and padding, we signal to the user what is truly important.
               </p>

               <blockquote className="border-l-4 border-foreground pl-6 py-2 my-10 italic text-xl font-medium text-foreground">
                 "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
               </blockquote>

               <h2 className="text-2xl font-semibold mt-12 mb-6 tracking-tight">Typography as UI</h2>
               
               <p className="mb-6 text-lg leading-relaxed text-foreground/90">
                 In a content-first approach, typography becomes the interface. The weight, size, and leading of your type system can replace traditional borders and background colors. San Francisco, Apple's system font, excels at this—neutral enough to disappear, yet distinct enough to be legible at any size.
               </p>
               
               <div className="my-12 p-8 bg-neutral-100 dark:bg-neutral-900 rounded-2xl">
                 <p className="text-center text-sm font-mono text-muted-foreground">
                   Figure 1: The relationship between spacing and cognitive load.
                 </p>
               </div>

               <p className="mb-6 text-lg leading-relaxed text-foreground/90">
                 As we continue to build for the web, let's remember that our job is not to fill the screen, but to clear the path.
               </p>
             </div>
          </FadeIn>
        </article>
      </main>
      <Footer />
    </div>
  );
}
