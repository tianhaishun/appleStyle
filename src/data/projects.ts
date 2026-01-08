export interface Project {
  title: string;
  category: string;
  description: string;
  href: string;
  imageClass?: string;
  dark?: boolean;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Apple Style Blog",
    category: "Full Stack",
    description: "当前正在开发的极简主义博客系统。支持 Markdown 编辑、用户管理与评论互动。",
    href: "https://github.com/tianhaishun/appleStyle",
    imageClass: "bg-neutral-100 dark:bg-neutral-800",
    featured: true,
  }
];
