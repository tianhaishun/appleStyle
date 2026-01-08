import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Menu, X, Sun, Moon, User } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

const blogLinks = [
  { name: "首页", href: "/" },
  { name: "文章", href: "/blog" },
  { name: "关于我", href: "/about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
              {/* Internal anchor links for home page only */}
              {location.pathname === "/" && (
                <>
                  <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground transition-colors">项目</button>
                </>
              )}
            </nav>

            {/* Dark Mode Toggle - Right side */}
            <div className="absolute right-6 lg:right-8 flex items-center gap-4">
               {user ? (
                 <Link to="/editor" className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                    <User size={18} />
                 </Link>
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
                   <Link to="/editor" onClick={() => setIsMobileMenuOpen(false)} className="block text-foreground/80 hover:text-foreground">我的文章</Link>
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
