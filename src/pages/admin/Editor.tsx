import { useEffect, useState } from "react";
import { supabase, type Article } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { generateSlug } from "@/lib/utils";
import MDEditor from "@uiw/react-md-editor";

export default function Editor() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: new Date().toISOString().split('T')[0], // Default to today YYYY-MM-DD
    read_time: "5 分钟阅读",
    description: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check auth
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
      }
    };
    checkUser();
    fetchArticles();
  }, [navigate]);

  const fetchArticles = async () => {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    setArticles(data || []);
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      slug: article.slug,
      category: article.category,
      date: article.date,
      read_time: article.read_time,
      description: article.description,
      content: article.content,
    });
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      read_time: "5 分钟阅读",
      description: "",
      content: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      const payload = { 
        ...formData, 
        category: formData.category.trim() || "随笔", // Default to "随笔" if empty
        user_id: session.user.id 
      };

      if (editingId) {
        await supabase.from('articles').update(payload).eq('id', editingId);
      } else {
        await supabase.from('articles').insert([payload]);
      }
      fetchArticles();
      handleReset();
      alert("Success!");
    } catch (error) {
      console.error(error);
      alert("Error saving article");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await supabase.from('articles').delete().eq('id', id);
    fetchArticles();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Article Editor</h1>
          <div className="space-x-4">
             <Button variant="outline" onClick={() => navigate("/")}>View Site</Button>
             <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section - Takes up more space now (8/12 columns) */}
          <div className="lg:col-span-9">
            <FadeIn>
              <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200/60 dark:border-neutral-800">
                <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Article" : "New Article"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-6">
                      <label className="block text-sm font-medium mb-1 ml-1">Title</label>
                      <input
                        className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                        value={formData.title}
                        onChange={(e) => {
                           const title = e.target.value;
                           const shouldUpdateSlug = !formData.slug || formData.slug === generateSlug(formData.title);
                           setFormData({
                             ...formData, 
                             title,
                             slug: shouldUpdateSlug ? generateSlug(title) : formData.slug
                           });
                        }}
                        required
                      />
                    </div>
                    <div className="md:col-span-6">
                      <label className="block text-sm font-medium mb-1 ml-1">Slug (URL)</label>
                      <input
                        className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Compact Metadata Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 ml-1">Category</label>
                      <input
                        className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 ml-1">Date</label>
                      <input
                        className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 ml-1">Read Time</label>
                      <input
                        className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                        value={formData.read_time}
                        onChange={(e) => setFormData({...formData, read_time: e.target.value})}
                      />
                    </div>
                    <div className="flex items-end">
                       <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Saving..." : (editingId ? "Update" : "Publish")}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 ml-1">Description</label>
                    <textarea
                      className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 ml-1">Content</label>
                    <div data-color-mode="auto">
                        <MDEditor
                            value={formData.content}
                            onChange={(val) => setFormData({...formData, content: val || ""})}
                            height={600}
                            preview="edit"
                            className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 !bg-transparent"
                            style={{ backgroundColor: 'transparent' }}
                            textareaProps={{
                                placeholder: "Start writing your masterpiece...",
                                style: { fontSize: 16, lineHeight: 1.6 }
                            }}
                        />
                    </div>
                  </div>
                  
                  {editingId && (
                      <div className="flex justify-end">
                        <Button type="button" variant="outline" onClick={handleReset}>
                            Cancel Edit
                        </Button>
                      </div>
                  )}
                </form>
              </div>
            </FadeIn>
          </div>

          {/* List Section - Moved to side and made compact */}
          <div className="lg:col-span-3">
             <FadeIn delay={0.2}>
               <div className="sticky top-24 space-y-4">
                 <h2 className="text-xl font-semibold mb-4">History</h2>
                 <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                    {articles.map((article) => (
                    <div key={article.id} className="bg-white dark:bg-neutral-900 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-2 hover:border-blue-500/50 transition-colors cursor-pointer" onClick={() => handleEdit(article)}>
                        <h3 className="font-medium text-sm line-clamp-1">{article.title}</h3>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{article.date}</span>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleDelete(article.id); }}
                                className="text-red-500 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                Del
                            </button>
                        </div>
                    </div>
                    ))}
                 </div>
                 {articles.length === 0 && (
                   <p className="text-muted-foreground text-center py-8 text-sm">No articles yet.</p>
                 )}
               </div>
             </FadeIn>
          </div>
        </div>
      </Container>
    </div>
  );
}
