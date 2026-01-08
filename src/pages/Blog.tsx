import { Section } from "@/components/ui/Container";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, type Article } from "@/lib/supabase";
import { ArrowUpRight, PenSquare } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Error fetching articles:', error);
        } else {
          setArticles(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans selection:bg-black selection:text-white">
      <Navbar />
      <main className="flex-grow pt-20">
        <Section id="articles">
          <FadeIn>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">最新文章</h2>
              {user && (
                <Button onClick={() => navigate('/editor')} className="gap-2">
                  <PenSquare size={16} />
                  写文章
                </Button>
              )}
            </div>
          </FadeIn>
          
          {isLoading ? (
            <div className="py-20 text-center text-neutral-500">Loading articles...</div>
          ) : articles.length > 0 ? (
            <FadeInStagger>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                {articles.map((article) => (
                  <FadeIn key={article.id} className="relative group overflow-hidden rounded-[2rem] border border-neutral-200/60 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:scale-[1.01] bg-white dark:bg-neutral-900">
                      {/* Link needs z-index to stay on top */}
                      <Link to={`/articles/${article.slug}`} className="absolute inset-0 z-20 block">
                        <span className="sr-only">阅读文章</span>
                      </Link>
                      
                      {/* Content with lower z-index */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-between h-full z-10 pointer-events-none">
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

                {/* About Me Card */}
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
          ) : (
            <div className="py-20 text-center text-neutral-500">
              <p>暂无文章。</p>
              {!user && (
                 <p className="mt-4">
                   <Link to="/register" className="text-blue-600 hover:underline">注册账号</Link> 成为第一个作者。
                 </p>
              )}
            </div>
          )}
        </Section>
      </main>
      <Footer />
    </div>
  );
}
