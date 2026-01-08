import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-neutral-100 dark:border-white/10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground space-y-4 md:space-y-0">
          <p>Copyright © {new Date().getFullYear()} Tianhaishun. 保留所有权利。</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">隐私政策</a>
            <a href="#" className="hover:underline">使用条款</a>
            <a href="#" className="hover:underline">法律信息</a>
            <a href="#" className="hover:underline">站点地图</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
