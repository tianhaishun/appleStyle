import { useEffect, useState } from "react";
import { supabase, type Article } from "@/lib/supabase";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { generateSlug } from "@/lib/utils";
import MDEditor from "@uiw/react-md-editor";

export default function Editor() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchParams] = useSearchParams(); // Support ?id=...
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

  // Check auth and load article if id is present
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }

      // Check for ?id=... in URL
      const idFromUrl = searchParams.get("id");
      if (idFromUrl) {
         const { data: article } = await supabase.from('articles').select('*').eq('id', idFromUrl).single();
         if (article && article.user_id === session.user.id) {
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
         }
      }
    };
    checkUser();
    fetchArticles();
  }, [navigate, searchParams]);

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
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="-ml-2">
              ← 返回
            </Button>
            <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />
            <input
              className="bg-transparent text-lg font-bold focus:outline-none w-[300px] md:w-[500px]"
              placeholder="输入文章标题..."
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
            />
          </div>
          <div className="flex items-center gap-3">
             <span className="text-xs text-muted-foreground hidden md:inline-block">
               {loading ? "正在保存..." : "修改已保存"}
             </span>
             <Button 
               onClick={handleSubmit} 
               disabled={loading} 
               className="rounded-full px-6"
             >
               {editingId ? "更新" : "发布"}
             </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0 lg:gap-8 min-h-[calc(100vh-64px)]">
        
        {/* Main Editor Area */}
        <div className="p-6 md:p-10 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Editor */}
            <div data-color-mode="auto" className="min-h-[500px]">
                <MDEditor
                    value={formData.content}
                    onChange={(val) => setFormData({...formData, content: val || ""})}
                    height={800}
                    preview="edit"
                    visibleDragbar={false}
                    className="!border-none !shadow-none !bg-transparent"
                    style={{ backgroundColor: 'transparent' }}
                    textareaProps={{
                        placeholder: "开始讲述您的故事...",
                        style: { fontSize: 18, lineHeight: 1.8, fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }
                    }}
                />
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="border-l border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20 p-6 space-y-8 hidden lg:block h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
          
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">文章设置</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">URL 别名 (Slug)</label>
                <input
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">分类</label>
                <input
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="例如：生活, 技术"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">发布日期</label>
                <input
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">阅读时间</label>
                <input
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                  value={formData.read_time}
                  onChange={(e) => setFormData({...formData, read_time: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">摘要</label>
                <textarea
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
             <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">历史记录</h3>
             <div className="space-y-2">
                {articles.slice(0, 5).map((article) => (
                  <div key={article.id} className="group flex items-center justify-between text-sm p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors" onClick={() => handleEdit(article)}>
                      <span className="truncate max-w-[180px]">{article.title}</span>
                      <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(article.id); }}
                          className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-500"
                      >
                          ×
                      </button>
                  </div>
                ))}
             </div>
          </div>

          <div className="pt-6">
             <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={handleLogout}>
               退出登录
             </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
