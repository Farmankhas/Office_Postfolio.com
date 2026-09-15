export interface SocialLink {
  id: string;
  name: string;
  url: string;
  displayHandle: string;
  icon: 'whatsapp' | 'instagram' | 'facebook' | 'linkedin' | 'github' | 'mail';
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
}

export interface SkillItem {
  name: string;
  level?: number;
  highlight?: boolean;
  tag?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  featured?: boolean;
  deliverables: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web Design' | 'Game Development' | 'AI Creativity' | 'Graphic Design' | 'Branding / Business';
  description: string;
  tools: string[];
  projectImage: string;
  projectUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  highlights?: string[];
}

export interface JourneyStep {
  id: string;
  stepNumber: string;
  title: string;
  period?: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface ToolItem {
  id: string;
  name: string;
  category: 'Design' | 'Development' | 'AI & 3D' | 'Productivity';
  badge: string;
  icon: string;
  color: string;
}

export interface WhyWorkItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioData {
  portfolioName: string;
  companyName: string;
  companyTagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroRole: string;
  heroDescription: string;
  heroBadge: string;
  profileImage: string; // Documented variable for easy replacement
  aboutHeading: string;
  aboutBio: string;
  aboutFALink: string;
  identities: string[];
  stats: StatItem[];
  skills: SkillCategory[];
  services: ServiceItem[];
  projects: ProjectItem[];
  journey: JourneyStep[];
  tools: ToolItem[];
  whyWorkWithMe: WhyWorkItem[];
  socialLinks: SocialLink[];
  contactEmail: string;
  contactLocation: string;
  companyDescription: string;
}
