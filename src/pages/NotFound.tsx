import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <Container className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            找不到您要访问的页面。
          </p>
          <Link to="/">
            <Button>返回首页</Button>
          </Link>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
