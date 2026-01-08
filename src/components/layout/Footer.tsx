import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-neutral-100 dark:border-white/10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground space-y-4 md:space-y-0">
          <p>Copyright © {new Date().getFullYear()} My Blog. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Sales and Refunds</a>
            <a href="#" className="hover:underline">Legal</a>
            <a href="#" className="hover:underline">Site Map</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
