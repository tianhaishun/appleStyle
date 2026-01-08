import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { Container } from "@/components/ui/Container";

export default function About() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-12">
                关于我
              </h1>
            </FadeIn>
            
            <FadeInStagger>
              <FadeIn>
                <div className="prose prose-lg prose-neutral dark:prose-invert mb-12">
                  <p className="lead text-xl text-foreground/80 font-medium leading-relaxed">
                    你好，我是田海顺 (Tianhaishun)。
                  </p>
                  <p>
                    我是一名热爱开源、设计与技术探索的开发者。我相信技术应当服务于人，而好的设计则是连接技术与用户的桥梁。
                  </p>
                  <p>
                    在这个博客中，我分享关于软件工程、系统架构以及极简主义生活方式的思考。我致力于构建优雅、高效且富有意义的数字产品。
                  </p>
                </div>
              </FadeIn>

              <FadeIn>
                <h2 className="text-2xl font-semibold mb-6">联系方式</h2>
                <ul className="space-y-4 text-lg">
                  <li>
                    <span className="text-muted-foreground w-24 inline-block">GitHub:</span>
                    <a href="https://github.com/tianhaishun" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                      github.com/tianhaishun
                    </a>
                  </li>
                  {/* Add more contact info here if needed */}
                </ul>
              </FadeIn>
            </FadeInStagger>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
