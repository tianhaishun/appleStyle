import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Projects from "@/pages/Projects";
import Article from "@/pages/Article";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/admin/Login";
import Register from "@/pages/Register";
import Editor from "@/pages/admin/Editor";
import Dashboard from "@/pages/Dashboard";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles/:slug" element={<Article />} />
        
        {/* Auth Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/admin/editor" element={<Editor />} /> {/* Keep old route just in case */}
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
