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
  {
    slug: "minimalism",
    title: "数字空间中的极简主义艺术",
    category: "设计哲学",
    date: "2023年10月24日",
    readTime: "5 分钟阅读",
    description: "为什么在现代网页设计中，少即是多。",
    content: `
      <p class="lead text-xl text-foreground/80 font-medium leading-relaxed mb-8">
        极简主义不仅仅是减法，更是为了增加意义。在这个数字噪音充斥的世界里，留白是一种奢侈。
      </p>
      
      <p class="mb-6 text-lg leading-relaxed text-foreground/90">
        当我们回顾用户界面的演变时，可以看到一个明显的趋势：做减法。但真正的减法不是空洞，而是聚焦。Apple 的设计哲学一直教导我们，每一个元素都必须有其目的。如果它不能帮助用户达成目标，那它就仅仅是装饰。
      </p>

      <h2 class="text-2xl font-semibold mt-12 mb-6 tracking-tight">留白的力量</h2>
      
      <p class="mb-6 text-lg leading-relaxed text-foreground/90">
        留白是主动的，而非被动的。它引导视线，构建层级，给内容以呼吸的空间。通过增加边距和填充，我们向用户传达什么是真正重要的。
      </p>

      <blockquote class="border-l-4 border-foreground pl-6 py-2 my-10 italic text-xl font-medium text-foreground">
        "完美不是无以复加，而是无以复减。"
      </blockquote>

      <h2 class="text-2xl font-semibold mt-12 mb-6 tracking-tight">字体即界面</h2>
      
      <p class="mb-6 text-lg leading-relaxed text-foreground/90">
        在内容优先的方法中，排版就是界面本身。字体的字重、大小和行高可以取代传统的边框和背景色。San Francisco，作为 Apple 的系统字体，在这方面表现卓越——既中性到足以“消失”，又独特到在任何尺寸下都清晰可辨。
      </p>
      
      <p class="mb-6 text-lg leading-relaxed text-foreground/90">
        当我们继续构建 Web 时，请记住，我们的工作不是填满屏幕，而是清理道路。
      </p>
    `,
  },
  {
    slug: "system-design",
    title: "可扩展的系统架构设计",
    category: "技术架构",
    date: "2024年1月15日",
    readTime: "8 分钟阅读",
    description: "探讨构建高性能、高可用的大型应用系统的关键模式。",
    content: `
      <p class="lead text-xl text-foreground/80 font-medium leading-relaxed mb-8">
        随着用户规模的增长，系统架构的复杂性呈指数级上升。如何在保证开发效率的同时，维持系统的高可用性和可扩展性？
      </p>
      
      <h2 class="text-2xl font-semibold mt-12 mb-6 tracking-tight">微服务 vs 单体</h2>
      
      <p class="mb-6 text-lg leading-relaxed text-foreground/90">
        并没有绝对正确的架构，只有最适合当前业务阶段的架构。过早的微服务化会带来不必要的运维负担，而坚持单体架构则可能在后期成为瓶颈。
      </p>
    `,
  },
];
