import { Container, Section } from "@/components/ui/Container";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface BentoItem {
  title: string;
  category: string;
  description?: string;
  image?: string; // In real app, this would be an image URL
  className?: string; // For col-span
  href?: string;
  dark?: boolean; // For white text on dark background cards
}

const items: BentoItem[] = [
  {
    title: "The Art of Minimalism",
    category: "Design Philosophy",
    description: "Why less is effectively more in modern web design.",
    className: "md:col-span-2 md:row-span-2 min-h-[400px]",
    image: "bg-neutral-100 dark:bg-neutral-800", // Placeholder for image
    href: "/articles/minimalism"
  },
  {
    title: "SwiftUI Experiments",
    category: "Development",
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    image: "bg-blue-50 dark:bg-blue-950/30",
    href: "/projects/swiftui"
  },
  {
    title: "Photography",
    category: "Hobby",
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    image: "bg-orange-50 dark:bg-orange-950/30",
    href: "/hobbies/photo"
  },
  {
    title: "System Design",
    category: "Architecture",
    description: "Scalable patterns for large applications.",
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    image: "bg-green-50 dark:bg-green-950/30",
    href: "/articles/system-design"
  },
  {
    title: "About Me",
    category: "Personal",
    description: "Frontend Engineer based in Cupertino.",
    className: "md:col-span-2 md:row-span-1 min-h-[200px]",
    dark: true,
    image: "bg-neutral-900", // Dark card
    href: "/about"
  },
];

export function BentoGrid() {
  return (
    <Section>
      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-semibold mb-12 tracking-tight">Latest Work</h2>
      </FadeIn>
      
      <FadeInStagger>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {items.map((item, index) => (
            <FadeIn key={index} className={cn("relative group overflow-hidden rounded-[2rem] border border-neutral-200/60 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:scale-[1.01]", item.image, item.className)}>
              <a href={item.href} className="absolute inset-0 z-10 block" aria-label={`Read more about ${item.title}`}>
                 <span className="sr-only">Read more</span>
              </a>
              
              <div className={cn("absolute inset-0 p-8 flex flex-col justify-between h-full", item.dark ? "text-white" : "text-foreground")}>
                <div className="flex justify-between items-start">
                   <span className={cn("text-xs font-semibold uppercase tracking-wider opacity-70", item.dark ? "text-neutral-300" : "text-neutral-500")}>
                      {item.category}
                   </span>
                   <ArrowUpRight className={cn("w-5 h-5 opacity-0 -translate-y-2 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0", item.dark ? "text-white" : "text-foreground")} />
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2 leading-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className={cn("text-base opacity-80", item.dark ? "text-neutral-300" : "text-neutral-600")}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeInStagger>
    </Section>
  );
}
