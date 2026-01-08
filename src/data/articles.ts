export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  content: string; // In a real app, this might be MDX or HTML
}

export const articles: Article[] = [
  // 在这里添加您的文章
  // 示例格式:
  /*
  {
    slug: "my-first-post",
    title: "我的第一篇文章",
    category: "生活随笔",
    date: "2024年1月1日",
    readTime: "5 分钟阅读",
    description: "这是文章的简短描述...",
    content: "<p>这是文章的正文内容...</p>",
  },
  */
];
