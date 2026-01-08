import { Container } from "@/components/ui/Container";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

const lifeMoments = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000", // Water/Architecture
    date: "2026.01.03 雨后",
    note: "听见城市呼吸的声音。",
    layout: "full", // Full width
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800", // Cat
    date: "2026.01.02 午后",
    note: "偶遇一只晒太阳的猫。",
    layout: "half",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?auto=format&fit=crop&q=80&w=800", // Night Building/Hankyu vibe
    date: "2026.01.02 夜色",
    note: "阪急的流光，不仅是繁华。",
    layout: "half",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&q=80&w=800", // Moon
    date: "2026.01.02 抬头",
    note: "也是一种风景。",
    layout: "vertical",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1436891620132-ffa958f3d7d3?auto=format&fit=crop&q=80&w=800", // Plane
    date: "2026.01.02 远方",
    note: "飞往下一个目的地。",
    layout: "vertical",
  },
];

export function LifeGallery() {
  return (
    <section className="bg-white dark:bg-black py-24 md:py-32 border-t border-neutral-100 dark:border-neutral-900">
      <Container>
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
              生活印记
            </h2>
            <p className="text-lg text-neutral-500">
              技术之外，我是真实的人。记录那些让时间静止的瞬间。
            </p>
          </div>
        </FadeIn>

        <FadeInStagger>
          <div className="space-y-8">
            {/* 1. Full Width Water Scene */}
            <FadeIn>
                <div className="group relative overflow-hidden rounded-[24px] aspect-[21/9] md:aspect-[2.4/1]">
                    <img 
                        src={lifeMoments[0].src} 
                        alt="Water Scene" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 flex flex-col justify-end">
                        <span className="text-white/80 font-mono text-sm mb-1">{lifeMoments[0].date}</span>
                        <p className="text-white text-xl font-medium">{lifeMoments[0].note}</p>
                    </div>
                </div>
            </FadeIn>

            {/* 2. Side by Side: Cat & Hankyu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {lifeMoments.slice(1, 3).map((item) => (
                    <FadeIn key={item.id}>
                        <div className="group relative overflow-hidden rounded-[24px] aspect-[4/3]">
                            <img 
                                src={item.src} 
                                alt={item.note} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 flex flex-col justify-end">
                                <span className="text-white/80 font-mono text-sm mb-1">{item.date}</span>
                                <p className="text-white text-xl font-medium">{item.note}</p>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>

            {/* 3. Vertical Stack: Moon & Plane (Centered Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-start-4 md:col-span-6 space-y-8">
                    {lifeMoments.slice(3, 5).map((item) => (
                        <FadeIn key={item.id}>
                            <div className="group relative overflow-hidden rounded-[24px] aspect-[16/9]">
                                <img 
                                    src={item.src} 
                                    alt={item.note} 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 flex flex-col justify-end items-center text-center">
                                    <span className="text-white/80 font-mono text-sm mb-1">{item.date}</span>
                                    <p className="text-white text-xl font-medium">{item.note}</p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>

          </div>
        </FadeInStagger>
      </Container>
    </section>
  );
}
