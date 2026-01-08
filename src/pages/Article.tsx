import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, type Article } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { Button } from "@/components/ui/Button";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  
  // Comments state
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    async function fetchArticleAndUser() {
      if (!slug) return;
      
      try {
        // Get Current User
        const { data: { session } } = await supabase.auth.getSession();
        setCurrentUser(session?.user || null);

        // Get Article
        const { data: articleData, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error('Error fetching article:', error);
        } else {
          setArticle(articleData);
          // Fetch comments for this article
          fetchComments(articleData.id);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticleAndUser();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchComments = async (articleId: string) => {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: true });
      setComments(data || []);
  };

  const handleDelete = async () => {
    if (!article) return;
    if (!confirm("Are you sure you want to delete this article?")) return;
    
    await supabase.from('articles').delete().eq('id', article.id);
    navigate('/');
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser || !article) return;

    setIsSubmittingComment(true);
    const { error } = await supabase.from('comments').insert([{
        article_id: article.id,
        user_id: currentUser.id,
        content: newComment,
        author_email: currentUser.email // Storing email for display as per migration
    }]);

    if (error) {
        alert("Failed to post comment");
    } else {
        setNewComment("");
        fetchComments(article.id);
    }
    setIsSubmittingComment(false);
  };

  const handleDeleteComment = async (commentId: string) => {
      if (!confirm("Delete this comment?")) return;
      await supabase.from('comments').delete().eq('id', commentId);
      if (article) fetchComments(article.id);
  };

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
            <div className="mb-10 text-center relative group">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 block">{article.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <time>{article.date}</time>
                <span>•</span>
                <span>{article.read_time}</span>
              </div>
              
              {/* Owner Controls */}
              {currentUser && currentUser.id === article.user_id && (
                  <div className="mt-6 flex justify-center gap-4">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/editor?id=${article.id}`)}>
                          Edit Article
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleDelete}>
                          Delete Article
                      </Button>
                  </div>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
             <div className="prose prose-lg prose-neutral dark:prose-invert mx-auto mb-20">
               <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                 {article.content}
               </ReactMarkdown>
             </div>
          </FadeIn>

          {/* Comments Section */}
          <FadeIn delay={0.3}>
              <div className="max-w-2xl mx-auto border-t border-neutral-200 dark:border-neutral-800 pt-12">
                  <h3 className="text-2xl font-bold mb-8">Comments ({comments.length})</h3>
                  
                  {/* Comment List */}
                  <div className="space-y-8 mb-12">
                      {comments.map((comment) => (
                          <div key={comment.id} className="flex gap-4">
                              <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-sm font-bold text-neutral-500">
                                  {comment.author_email?.[0].toUpperCase() || "?"}
                              </div>
                              <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                      <span className="font-semibold text-sm">{comment.author_email?.split('@')[0] || "Anonymous"}</span>
                                      <span className="text-xs text-muted-foreground">{new Date(comment.created_at).toLocaleDateString()}</span>
                                  </div>
                                  <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">{comment.content}</p>
                                  {currentUser && (currentUser.id === comment.user_id || currentUser.id === article.user_id) && (
                                      <button onClick={() => handleDeleteComment(comment.id)} className="text-xs text-red-500 hover:underline mt-2">Delete</button>
                                  )}
                              </div>
                          </div>
                      ))}
                      {comments.length === 0 && (
                          <p className="text-muted-foreground text-center py-4 italic">No comments yet. Be the first to share your thoughts.</p>
                      )}
                  </div>

                  {/* Comment Form */}
                  {currentUser ? (
                      <form onSubmit={handlePostComment} className="relative">
                          <textarea
                              className="w-full p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                              rows={4}
                              placeholder="Write a thoughtful comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              required
                          />
                          <div className="mt-2 flex justify-end">
                              <Button disabled={isSubmittingComment}>
                                  {isSubmittingComment ? "Posting..." : "Post Comment"}
                              </Button>
                          </div>
                      </form>
                  ) : (
                      <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-2xl text-center border border-neutral-200 dark:border-neutral-800">
                          <p className="mb-4 text-neutral-600 dark:text-neutral-400">Join the conversation.</p>
                          <Button onClick={() => navigate('/admin/login')}>Sign in to Comment</Button>
                      </div>
                  )}
              </div>
          </FadeIn>
        </article>
      </main>
      <Footer />
    </div>
  );
}
