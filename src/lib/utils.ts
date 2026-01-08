import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string): string {
  // Simple slug generator that supports Chinese characters
  // It replaces spaces with dashes and removes special chars, but keeps Chinese/Unicode
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '') // Remove all non-word chars except Chinese and -
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}
