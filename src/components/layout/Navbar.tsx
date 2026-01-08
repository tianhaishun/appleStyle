import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { name: "Store", href: "#" },
  { name: "Mac", href: "#" },
  { name: "iPad", href: "#" },
  { name: "iPhone", href: "#" },
  { name: "Watch", href: "#" },
  { name: "Vision", href: "#" },
  { name: "AirPods", href: "#" },
  { name: "TV & Home", href: "#" },
  { name: "Entertainment", href: "#" },
  { name: "Accessories", href: "#" },
  { name: "Support", href: "#" },
];

// For a blog, let's adapt:
const blogLinks = [
  { name: "Articles", href: "#articles" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border-b border-white/10 support-[backdrop-filter]:bg-background/60"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="h-12 flex items-center justify-between md:justify-center">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Logo - Centered on mobile, Left/Center on Desktop */}
            <a href="/" className="text-xl font-semibold tracking-tight md:absolute md:left-6 lg:left-8">
               Blog
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-foreground/80">
              {blogLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Mobile Spacer to center logo */}
            <div className="w-5 md:hidden" />
        </Container>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl absolute top-12 left-0 right-0 border-t border-white/10 p-6"
          >
            <div className="flex flex-col space-y-6 text-xl font-medium">
               {blogLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground/80 hover:text-foreground"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
