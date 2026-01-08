import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Menu, X, Sun, Moon, User, LogOut, LayoutDashboard, PenSquare } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

const blogLinks = [
  { name: "首页", href: "/" },
  { name: "文章", href: "/blog" },
  { name: "项目", href: "/projects" },
  { name: "关于我", href: "/about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Click outside listener for user menu
    const handleClickOutside = (event: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
            setIsUserMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        subscription.unsubscribe();
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
      await supabase.auth.signOut();
      setIsUserMenuOpen(false);
      navigate("/");
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  // Handle anchor links vs router links
  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
       const element = document.getElementById(href.substring(1));
       if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
       }
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-white/10 support-[backdrop-filter]:bg-background/60"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="h-12 flex items-center justify-between md:justify-center relative">
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground/80 hover:text-foreground transition-colors p-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Logo */}
            <Link to="/" className="text-xl font-semibold tracking-tight md:absolute md:left-6 lg:left-8 z-50 flex items-center gap-2">
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5 mb-1"
                aria-hidden="true"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.07-3.12-1.05.05-2.31.72-3.06 1.64-.65.79-1.2 2.09-1.05 3.08 1.15.09 2.32-.64 3.04-1.6" />
              </svg>
              <span>tianhaishun</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-foreground/80">
              {blogLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "hover:text-foreground transition-colors",
                    location.pathname === link.href ? "text-foreground font-semibold" : ""
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Dark Mode Toggle - Right side */}
            <div className="absolute right-6 lg:right-8 flex items-center gap-4">
               {user ? (
                 <div className="relative" ref={userMenuRef}>
                     <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-foreground/80 hover:text-foreground transition-colors"
                     >
                        {user.email?.[0].toUpperCase() || <User size={18} />}
                     </button>

                     <AnimatePresence>
                         {isUserMenuOpen && (
                             <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className="absolute right-0 top-12 w-48 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden py-1"
                             >
                                 <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                                     <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                 </div>
                                 <Link to="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                     <LayoutDashboard size={16} /> 仪表盘
                                 </Link>
                                 <Link to="/editor" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                     <PenSquare size={16} /> 写文章
                                 </Link>
                                 <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
                                     <LogOut size={16} /> 退出登录
                                 </button>
                             </motion.div>
                         )}
                     </AnimatePresence>
                 </div>
               ) : (
                 <Link to="/admin/login" className="hidden md:block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                   登录
                 </Link>
               )}
               <button
                 onClick={toggleTheme}
                 className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-foreground/80 hover:text-foreground"
                 aria-label="Toggle dark mode"
               >
                 {isDark ? <Sun size={18} /> : <Moon size={18} />}
               </button>
            </div>
            
            {/* Mobile Spacer to balance layout if needed */}
            <div className="w-8 md:hidden" />
        </Container>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl absolute top-12 left-0 right-0 border-t border-neutral-200/50 dark:border-white/10 p-6 h-screen"
          >
            <div className="flex flex-col space-y-6 text-xl font-medium">
               {blogLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-foreground/80 hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
               <button onClick={() => { handleLinkClick('#projects'); }} className="text-left text-foreground/80 hover:text-foreground">项目</button>
               <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
                 {user ? (
                   <>
                       <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-foreground/80 hover:text-foreground">
                            <LayoutDashboard size={20} /> Dashboard
                       </Link>
                       <Link to="/editor" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-foreground/80 hover:text-foreground">
                            <PenSquare size={20} /> Write Article
                       </Link>
                       <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 py-2 text-red-500">
                            <LogOut size={20} /> Logout
                       </button>
                   </>
                 ) : (
                   <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-foreground/80 hover:text-foreground">登录 / 注册</Link>
                 )}
               </div>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
