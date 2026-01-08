import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Apple CNY Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbf5e9] via-[#fbf5e9] to-white dark:from-[#1a1a1a] dark:to-background pointer-events-none" />
      
      {/* Decorative Golden Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] bg-[radial-gradient(circle_at_50%_50%,_#f5e6c8_0%,_rgba(255,255,255,0)_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,_#3a3a3a_0%,_rgba(0,0,0,0)_60%)] opacity-60 blur-3xl pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center text-center pt-20">
        <FadeIn delay={0.2}>
           <h2 className="text-[#b68832] dark:text-[#d4af37] text-lg md:text-xl font-bold mb-4 tracking-wide uppercase">
             设计哲学
           </h2>
        </FadeIn>

        <FadeIn delay={0.3}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6 max-w-5xl mx-auto leading-[1.05]">
            代码与艺术，<br className="hidden md:block" />在此交汇。
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.5}>
          <p className="text-xl md:text-2xl text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80 mb-10 max-w-2xl mx-auto font-medium">
             分享技术心得，记录生活点滴。<br/>
             探索设计、技术与极简生活的交汇点。
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="flex gap-6 z-20 relative">
             <Button size="lg" className="rounded-full px-8 text-lg h-12 bg-[#0071e3] hover:bg-[#0077ed] text-white border-none shadow-none font-normal" onClick={() => navigate('/blog')}>
               阅读文章
             </Button>
             <a href="/projects" className="flex items-center text-[#0066cc] hover:underline text-lg font-normal h-12">
               探索项目 ›
             </a>
          </div>
        </FadeIn>
        
        {/* Apple Style Device/Image Placeholder */}
        <FadeIn delay={0.8} className="mt-16 md:mt-24 w-full max-w-5xl mx-auto">
             <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[30px] overflow-hidden shadow-2xl bg-white dark:bg-[#1d1d1f]">
                 <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-800 dark:to-neutral-900">
                      {/* Abstract Art representing 'Apple Style' */}
                      <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-orange-300 to-yellow-200 blur-2xl opacity-80" />
                      <div className="absolute w-40 h-40 md:w-60 md:h-60 rounded-full bg-gradient-to-bl from-blue-300 to-purple-200 blur-2xl opacity-60 translate-x-10 -translate-y-10" />
                      <span className="relative z-10 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-white dark:to-neutral-400">
                          Apple Style
                      </span>
                 </div>
             </div>
        </FadeIn>

      </Container>
    </section>
  );
}
