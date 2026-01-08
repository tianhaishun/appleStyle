import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Link, useLocation } from "react-router-dom";

const blogLinks = [
  { name: "首页", href: "/" },
  { name: "关于我", href: "/about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

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
            <Link to="/" className="text-xl font-semibold tracking-tight md:absolute md:left-6 lg:left-8 z-50">
               tianhaishun
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
                  <button onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground transition-colors">文章</button>
                  <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground transition-colors">项目</button>
                </>
              )}
            </nav>

            {/* Dark Mode Toggle - Right side */}
            <div className="absolute right-6 lg:right-8 flex items-center">
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
               <button onClick={() => { handleLinkClick('#articles'); }} className="text-left text-foreground/80 hover:text-foreground">文章</button>
               <button onClick={() => { handleLinkClick('#projects'); }} className="text-left text-foreground/80 hover:text-foreground">项目</button>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
