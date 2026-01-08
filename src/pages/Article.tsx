import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { useParams, Navigate } from "react-router-dom";
import { articles } from "@/data/articles";
import { useEffect } from "react";

export default function Article() {
  const { slug } = useParams();
  
  // Find article by slug
  const article = articles.find((a) => a.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If article not found, redirect to home (or 404 page in a real app)
  if (!article) {
    return <Navigate to="/" replace />;
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
                <span>{article.readTime}</span>
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
