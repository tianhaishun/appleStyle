import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, type Article } from "@/lib/supabase";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error('Error fetching article:', error);
        } else {
          setArticle(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  // If article not found, redirect to home (or 404 page in a real app)
  if (!article) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <article className="mx-auto max-w-[680px] px-6">
          <FadeIn>
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 block">{article.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <time>{article.date}</time>
                <span>•</span>
                <span>{article.read_time}</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
             <div 
               className="prose prose-lg prose-neutral dark:prose-invert mx-auto"
               dangerouslySetInnerHTML={{ __html: article.content }}
             />
          </FadeIn>
        </article>
      </main>
      <Footer />
    </div>
  );
}
