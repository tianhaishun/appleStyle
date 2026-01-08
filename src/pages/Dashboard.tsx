import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { User, Mail, Shield, LogOut, PenSquare, FileText } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }
      setUser(session.user);

      // Fetch user's articles
      const { data: userArticles } = await supabase
        .from('articles')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      setArticles(userArticles || []);
      setIsLoading(false);
    }
    getUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
        alert("Error updating password: " + error.message);
    } else {
        alert("Password updated successfully!");
        setNewPassword("");
        setIsResettingPassword(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
      if(!confirm("Are you sure you want to delete this article?")) return;
      await supabase.from('articles').delete().eq('id', id);
      setArticles(articles.filter(a => a.id !== id));
  };

  if (isLoading) return null;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* Sidebar / Profile Card */}
                <div className="w-full md:w-1/3 space-y-6">
                   <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200/60 dark:border-neutral-800 text-center">
                       <div className="w-24 h-24 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-3xl font-bold text-blue-600 dark:text-blue-400">
                           {user?.email?.[0].toUpperCase()}
                       </div>
                       <h2 className="text-xl font-bold mb-1">{user?.email?.split('@')[0]}</h2>
                       <p className="text-sm text-neutral-500 mb-6">{user?.email}</p>
                       
                       <div className="space-y-3">
                           <Button onClick={() => navigate('/editor')} className="w-full gap-2 justify-center">
                               <PenSquare size={16} /> 写文章
                           </Button>
                           <Button variant="outline" onClick={() => setIsResettingPassword(!isResettingPassword)} className="w-full gap-2 justify-center">
                               <Shield size={16} /> 修改密码
                           </Button>
                           <Button variant="ghost" onClick={handleLogout} className="w-full gap-2 justify-center text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                               <LogOut size={16} /> 退出登录
                           </Button>
                       </div>
                   </div>

                   {/* Password Reset Form */}
                   {isResettingPassword && (
                       <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200/60 dark:border-neutral-800 animate-in fade-in slide-in-from-top-4">
                           <h3 className="font-semibold mb-4">修改密码</h3>
                           <form onSubmit={handleUpdatePassword} className="space-y-4">
                               <input 
                                   type="password" 
                                   placeholder="新密码"
                                   className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                                   value={newPassword}
                                   onChange={(e) => setNewPassword(e.target.value)}
                                   required
                               />
                               <div className="flex gap-2">
                                   <Button type="submit" className="flex-1">更新</Button>
                                   <Button type="button" variant="outline" onClick={() => setIsResettingPassword(false)}>取消</Button>
                               </div>
                           </form>
                       </div>
                   )}
                </div>

                {/* Main Content / Articles */}
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <FileText className="text-blue-500" /> 我的文章 ({articles.length})
                    </h2>

                    <div className="space-y-4">
                        {articles.map((article) => (
                            <div key={article.id} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-blue-500/30 transition-all">
                                <div>
                                    <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                                        <a href={`/articles/${article.slug}`} target="_blank" rel="noreferrer">{article.title}</a>
                                    </h3>
                                    <div className="text-sm text-neutral-500 flex gap-3">
                                        <span>{article.date}</span>
                                        <span>•</span>
                                        <span>{article.category}</span>
                                        <span>•</span>
                                        <span className={article.published ? "text-green-500" : "text-amber-500"}>已发布</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <Button variant="outline" size="sm" onClick={() => navigate(`/editor?id=${article.id}`)}>编辑</Button>
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDeleteArticle(article.id)}>删除</Button>
                                </div>
                            </div>
                        ))}

                        {articles.length === 0 && (
                            <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200/60 dark:border-neutral-800">
                                <p className="text-neutral-500 mb-4">您还没有发布任何文章。</p>
                                <Button onClick={() => navigate('/editor')}>开始创作</Button>
                            </div>
                        )}
                    </div>
                </div>

              </div>
            </div>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
