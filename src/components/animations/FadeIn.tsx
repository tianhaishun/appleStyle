import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  fullWidth?: boolean;
  padding?: boolean; // If true, adds padding to compensate for potential clipping if needed, though usually handled by layout
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  fullWidth = false,
}: FadeInProps) {
  const directionOffset = {
    up: 20,
    down: -20,
    left: 20,
    right: -20,
  };

  const xOffset = direction === "left" || direction === "right" ? directionOffset[direction] : 0;
  const yOffset = direction === "up" || direction === "down" ? directionOffset[direction] : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, y: yOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Apple-esque ease-out
      }}
      className={cn(fullWidth ? "w-full" : "", className)}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className,
  faster = false,
}: {
  children: React.ReactNode;
  className?: string;
  faster?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: faster ? 0.1 : 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
