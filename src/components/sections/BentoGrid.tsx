import { Section } from "@/components/ui/Container";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export function BentoGrid() {
  return (
    <Section id="projects">
      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-semibold mb-12 tracking-tight">精选项目</h2>
      </FadeIn>
      
      <FadeInStagger>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(240px,auto)]">
          {projects.map((project, index) => (
            <FadeIn key={index} className={cn("relative group overflow-hidden rounded-[2rem] border border-neutral-200/60 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:scale-[1.01] bg-neutral-50 dark:bg-neutral-900/50", project.imageClass, project.featured ? "md:col-span-2 md:row-span-1 min-h-[300px]" : "")}>
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 block" aria-label={`查看项目 ${project.title}`}>
                 <span className="sr-only">查看项目</span>
              </a>
              
              <div className={cn("absolute inset-0 p-8 flex flex-col justify-between h-full", project.dark ? "text-white" : "text-foreground")}>
                <div className="flex justify-between items-start">
                   <span className={cn("text-xs font-semibold uppercase tracking-wider opacity-70", project.dark ? "text-neutral-300" : "text-neutral-500")}>
                      {project.category}
                   </span>
                   <ArrowUpRight className={cn("w-5 h-5 opacity-0 -translate-y-2 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0", project.dark ? "text-white" : "text-foreground")} />
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className={cn("text-base opacity-80", project.dark ? "text-neutral-300" : "text-neutral-600")}>
                    {project.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeInStagger>
    </Section>
  );
}
