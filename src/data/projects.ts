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
    title: "清华大学计算机系课程攻略",
    category: "开源社区",
    description: "REKCARC-TSC-UHT - 计算机系课程资源共享计划，为同学们提供课程指导。",
    href: "https://github.com/tianhaishun/REKCARC-TSC-UHT",
    imageClass: "bg-purple-50 dark:bg-purple-950/30",
    featured: true,
  },
  {
    title: "软件测试技能指南",
    category: "技术指南",
    description: "Master the skills of software testing - 为初学者和资深测试人员设计的综合指南。",
    href: "https://github.com/tianhaishun/software-testing-guide",
    imageClass: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "JenPy CI/CD",
    category: "DevOps",
    description: "结合 Python 灵活性与 Jenkins 自动化能力的现代 CI/CD 工具。",
    href: "https://github.com/tianhaishun/JenPy",
    imageClass: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  {
    title: "Robot Powered Training",
    category: "AI & 机器人",
    description: "基于机器人的自动化训练仓库。",
    href: "https://github.com/tianhaishun/robot-powered-training",
    imageClass: "bg-green-50 dark:bg-green-950/30",
  },
];
