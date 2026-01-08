import { Section } from "@/components/ui/Container";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export function BentoGrid() {
  return (
    <Section id="projects" className="bg-[#f5f5f7] dark:bg-black py-24 md:py-32">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
           <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
                精选项目
              </h2>
              <p className="text-xl text-neutral-500 max-w-xl">
                 每一件作品，都凝聚着对细节的极致追求。
              </p>
           </div>
           <a href="/projects" className="hidden md:block text-[#0066cc] hover:underline text-lg font-medium mt-4 md:mt-0">
              查看全部 ›
           </a>
        </div>
      </FadeIn>
      
      <FadeInStagger>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {projects.map((project, index) => (
            <FadeIn key={index} className={cn(
                "relative group overflow-hidden rounded-[30px] transition-all duration-500 hover:scale-[1.02] cursor-pointer", 
                "bg-white dark:bg-[#1d1d1f]", 
                "shadow-sm hover:shadow-2xl hover:shadow-black/10",
                "h-[500px] flex flex-col", // Fixed height for Apple card look
                project.featured ? "md:col-span-2 lg:col-span-2" : ""
            )}>
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 block" aria-label={`查看项目 ${project.title}`}>
                 <span className="sr-only">查看项目</span>
              </a>
              
              {/* Content Top */}
              <div className="p-10 relative z-10 flex flex-col items-start h-full">
                 <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    {project.category}
                 </span>
                 <h3 className="text-3xl font-bold mb-3 text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight group-hover:text-[#0066cc] transition-colors">
                    {project.title}
                 </h3>
                 <p className="text-lg text-neutral-500 line-clamp-3 mb-8">
                    {project.description}
                 </p>
                 
                 <div className="mt-auto">
                    <span className="inline-flex items-center justify-center rounded-full bg-[#0071e3] text-white px-5 py-2 text-sm font-medium group-hover:bg-[#0077ed] transition-colors">
                       了解更多
                    </span>
                 </div>
              </div>

              {/* Decorative Image/Background Area (Bottom or Full) */}
              <div className={cn(
                  "absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105",
                  project.imageClass || "bg-neutral-100 dark:bg-neutral-800"
              )}>
                 {/* This would be the project image. Using gradient for now. */}
                 <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-[#1d1d1f]/90" />
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeInStagger>

      <div className="mt-12 text-center md:hidden">
          <a href="/projects" className="text-[#0066cc] hover:underline text-lg font-medium">
              查看全部项目 ›
          </a>
      </div>
    </Section>
  );
}
