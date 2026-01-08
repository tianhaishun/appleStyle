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
    <div className="min-h-screen bg-background py-20">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Article Editor</h1>
          <div className="space-x-4">
             <Button variant="outline" onClick={() => navigate("/")}>View Site</Button>
             <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <FadeIn>
              <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200/60 dark:border-neutral-800">
                <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Article" : "New Article"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 ml-1">Title</label>
                      <input
                        className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                        value={formData.title}
                        onChange={(e) => {
                           const title = e.target.value;
                           // Auto-generate slug if it's empty or looks like an auto-generated one
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
                    <div>
                      <label className="block text-sm font-medium mb-1 ml-1">Slug (URL)</label>
                      <input
                        className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <label className="block text-sm font-medium mb-1 ml-1">Content (Markdown)</label>
                    <div data-color-mode="auto">
                        <MDEditor
                            value={formData.content}
                            onChange={(val) => setFormData({...formData, content: val || ""})}
                            height={400}
                            preview="edit"
                            className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700"
                        />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : (editingId ? "Update Article" : "Create Article")}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={handleReset}>
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </FadeIn>
          </div>

          {/* List Section */}
          <div className="lg:col-span-1">
             <FadeIn delay={0.2}>
               <div className="space-y-4">
                 <h2 className="text-xl font-semibold mb-4">Existing Articles</h2>
                 {articles.map((article) => (
                   <div key={article.id} className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-2">
                     <h3 className="font-semibold">{article.title}</h3>
                     <p className="text-xs text-muted-foreground">{article.date} • {article.category}</p>
                     <div className="flex gap-2 mt-2">
                       <button 
                         onClick={() => handleEdit(article)}
                         className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                       >
                         Edit
                       </button>
                       <button 
                         onClick={() => handleDelete(article.id)}
                         className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                       >
                         Delete
                       </button>
                     </div>
                   </div>
                 ))}
                 {articles.length === 0 && (
                   <p className="text-muted-foreground text-center py-8">No articles yet.</p>
                 )}
               </div>
             </FadeIn>
          </div>
        </div>
      </Container>
    </div>
  );
}
