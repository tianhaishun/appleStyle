import { Section } from "@/components/ui/Container";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";
import { Link } from "react-router-dom";

export function BentoGrid() {
  return (
    <>
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

      {articles.length > 0 && (
        <Section id="articles" className="pt-0">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-semibold mb-12 tracking-tight">最新文章</h2>
          </FadeIn>
          
          <FadeInStagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
              {articles.map((article, index) => (
                <FadeIn key={index} className="relative group overflow-hidden rounded-[2rem] border border-neutral-200/60 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:scale-[1.01] bg-white dark:bg-neutral-900">
                    <Link to={`/articles/${article.slug}`} className="absolute inset-0 z-10 block">
                      <span className="sr-only">阅读文章</span>
                    </Link>
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold uppercase tracking-wider opacity-70 text-neutral-500">
                            {article.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-2 leading-tight text-foreground">
                          {article.title}
                        </h3>
                        <p className="text-sm text-neutral-500 mb-4">{article.date}</p>
                        <p className="text-base text-neutral-600 dark:text-neutral-400 line-clamp-2">
                          {article.description}
                        </p>
                      </div>
                    </div>
                </FadeIn>
              ))}

              {/* About Me Card - Only show in grid if we have articles, otherwise it might look lonely or we rely on the main About page */}
              <FadeIn className="relative group overflow-hidden rounded-[2rem] border border-neutral-200/60 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:scale-[1.01] bg-neutral-900 text-white md:col-span-1">
                  <a href="https://github.com/tianhaishun" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 block">
                    <span className="sr-only">关于我</span>
                  </a>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold uppercase tracking-wider opacity-70 text-neutral-300">
                          关于我
                        </span>
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-2 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-white" />
                    </div>

                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold mb-2 leading-tight">
                        Tianhaishun
                      </h3>
                      <p className="text-base opacity-80 text-neutral-300">
                        热爱开源与分享的开发者。
                      </p>
                    </div>
                  </div>
              </FadeIn>
            </div>
          </FadeInStagger>
        </Section>
      )}
    </>
  );
}
