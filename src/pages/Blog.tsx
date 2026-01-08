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
        <Section id="articles" className="bg-[#f5f5f7] dark:bg-black py-24 md:py-32">
          <FadeIn>
            <div className="flex justify-between items-end mb-12 px-4">
              <div>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">最新文章</h2>
                  <p className="text-xl text-neutral-500 max-w-xl">
                    记录思维的火花，分享技术的见解。
                  </p>
              </div>
              {user && (
                <Button onClick={() => navigate('/editor')} className="gap-2 rounded-full px-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {articles.map((article) => (
                  <FadeIn key={article.id} className="relative group overflow-hidden rounded-[30px] transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-white dark:bg-[#1d1d1f] shadow-sm hover:shadow-2xl hover:shadow-black/10 h-[500px] flex flex-col">
                      {/* Link needs z-index to stay on top */}
                      <Link to={`/articles/${article.slug}`} className="absolute inset-0 z-20 block">
                        <span className="sr-only">阅读文章</span>
                      </Link>
                      
                      {/* Content */}
                      <div className="p-10 relative z-10 flex flex-col items-start h-full">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                            {article.category}
                        </span>
                        
                        <h3 className="text-3xl font-bold mb-3 text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight group-hover:text-[#0066cc] transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-sm text-neutral-500 mb-4 font-medium">{article.date}</p>
                        
                        <p className="text-lg text-neutral-500 line-clamp-3 mb-8">
                          {article.description}
                        </p>

                         <div className="mt-auto">
                            <span className="inline-flex items-center justify-center rounded-full bg-[#0071e3] text-white px-5 py-2 text-sm font-medium group-hover:bg-[#0077ed] transition-colors">
                               阅读全文
                            </span>
                         </div>
                      </div>
                      
                      {/* Decorative Background */}
                      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105 bg-neutral-100 dark:bg-neutral-800">
                         <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-[#1d1d1f]/90" />
                      </div>
                  </FadeIn>
                ))}
              </div>
            </FadeInStagger>
          ) : (
            <div className="py-20 text-center text-neutral-500">
              <p className="text-xl mb-4">暂无文章。</p>
              {!user && (
                 <p>
                   <Link to="/register" className="text-[#0066cc] hover:underline font-medium">注册账号</Link> 成为第一个作者。
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
