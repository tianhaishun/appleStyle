import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-[980px] px-6 lg:px-8", className)} {...props}>
      {children}
    </div>
  );
}

// Apple often uses 980px for standard content, but 1200px+ for full width sections. 
// We can add a "Section" component for larger layouts.

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Section({ children, className, fullWidth = false, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className={cn("mx-auto px-6 lg:px-8", fullWidth ? "max-w-screen-2xl" : "max-w-[980px]")}>
        {children}
      </div>
    </section>
  );
}
