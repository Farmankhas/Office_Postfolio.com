import { PortfolioData } from './types.ts';

/**
 * ====================================================================
 *  MY SKILLS PORTFOLIO & FA GROUP COMPANY CONFIGURATION
 * ====================================================================
 * 
 * QUICK INSTRUCTIONS:
 * 1. You can replace `profileImage` below with:
 *    - An image URL (e.g. 'https://your-domain.com/photo.jpg')
 *    - A local public asset path (e.g. '/my-photo.jpg')
 *    - Or leave it as '' to use the interactive upload button on the website!
 *    Any image uploaded through the website's "Upload Profile Image" button
 *    is also saved in your browser's persistent storage.
 * 
 * 2. Update stats, bio, social handles, projects, and contact info in this file.
 */

export const INITIAL_PORTFOLIO_CONFIG: PortfolioData = {
  // Brand & Company Identity
  portfolioName: 'MY SKILLS',
  companyName: 'FA GROUP COMPANY',
  companyTagline: 'PREMIUM INTERNATIONAL BUSINESS',
  companyDescription:
    'FA GROUP is a professional digital and creative brand focused on modern technology, design, digital services, innovation, and business solutions.',

  // Hero Section
  heroHeadline: 'Turning Ideas Into Digital Experiences',
  heroSubtitle: 'Graphic Design • Web Development • AI Creativity • 3D Design • Digital Solutions',
  heroRole: 'Founder / Creative Professional at FA GROUP COMPANY',
  heroDescription:
    'I create modern digital experiences, professional websites, visual designs, AI-generated content, and creative technology solutions.',
  heroBadge: 'FA GROUP COMPANY',

  /**
   * PROFILE IMAGE CONFIGURATION:
   * Leave empty ('') to use the metallic 3D placeholder avatar, or enter your image URL here.
   * You can also click "Upload Profile Image" on the site at any time to upload JPG, PNG, or WebP.
   */
  profileImage: '',

  // About Section
  aboutHeading: 'About Me',
  aboutBio:
    'I am a versatile creative professional and digital builder passionate about the intersection of graphic design, modern web architecture, artificial intelligence, and interactive 3D media. Through rigorous practice and entrepreneurial drive, I transform bold ideas into sleek, functional realities.',
  aboutFALink: 'Building creative digital solutions through my personal work and FA GROUP COMPANY.',
  identities: [
    'Graphic Designer',
    'Web Designer',
    'AI Creator',
    'Digital Creator',
    'Freelancer',
    'Game Development Learner',
    'Technology Enthusiast',
  ],

  // Editable Statistics
  stats: [
    { id: 'stat-1', value: '10+', label: 'Skills', sublabel: 'Design & Code' },
    { id: 'stat-2', value: '20+', label: 'Projects', sublabel: 'Shipped & Live' },
    { id: 'stat-3', value: '10+', label: 'Creative Tools', sublabel: 'Industry Standard' },
    { id: 'stat-4', value: '2+', label: 'Years Learning & Creating', sublabel: 'Continuous Growth' },
  ],

  // Skills Categories
  skills: [
    {
      id: 'graphic-design',
      name: 'Graphic Design',
      icon: 'Palette',
      description: 'High-impact visual communication, branding, and typography aesthetics.',
      skills: [
        { name: 'Photoshop', level: 92, highlight: true },
        { name: 'Illustrator', level: 88, highlight: true },
        { name: 'Canva', level: 95 },
        { name: 'Logo Design', level: 90, highlight: true },
        { name: 'Branding', level: 87 },
        { name: 'Poster Design', level: 90 },
        { name: 'Social Media Design', level: 94 },
        { name: 'Photo Editing', level: 89 },
      ],
    },
    {
      id: 'web-dev',
      name: 'Web Development',
      icon: 'Code2',
      description: 'Fast, responsive, semantic front-end systems and digital user interfaces.',
      skills: [
        { name: 'HTML', level: 95 },
        { name: 'CSS', level: 92 },
        { name: 'JavaScript', level: 85, highlight: true },
        { name: 'Bootstrap', level: 90 },
        { name: 'Responsive Design', level: 96, highlight: true },
        { name: 'Landing Pages', level: 94 },
        { name: 'Portfolio Websites', level: 96, highlight: true },
      ],
    },
    {
      id: 'ai-tech',
      name: 'AI & Creative Technology',
      icon: 'Cpu',
      description: 'Harnessing generative AI models for video, image, content, and code workflows.',
      skills: [
        { name: 'AI Image Generation', level: 95, highlight: true },
        { name: 'AI Video Generation', level: 88, highlight: true },
        { name: 'AI Content Creation', level: 92 },
        { name: 'Prompt Engineering', level: 94, highlight: true },
        { name: 'AI-assisted Design', level: 91 },
        { name: 'AI-assisted Development', level: 89 },
      ],
    },
    {
      id: '3d-game',
      name: '3D & Game Development',
      icon: 'Box',
      description: 'Interactive real-time environments, game design fundamentals, and 3D objects.',
      skills: [
        { name: 'Unity', level: 78, highlight: true },
        { name: '3D Concepts', level: 82 },
        { name: 'Game UI', level: 85, highlight: true },
        { name: 'Game Assets', level: 80 },
        { name: 'Interactive Experiences', level: 84 },
      ],
    },
    {
      id: 'office-admin',
      name: 'Microsoft Office',
      icon: 'FileSpreadsheet',
      description: 'Executive documentation, data sheets, presentations, and specialized typing.',
      skills: [
        { name: 'Word', level: 95 },
        { name: 'Excel', level: 90, highlight: true },
        { name: 'PowerPoint', level: 96, highlight: true },
        { name: 'Urdu Typing', level: 92, highlight: true },
        { name: 'Data Entry', level: 94 },
        { name: 'Documentation', level: 92 },
      ],
    },
    {
      id: 'freelancing',
      name: 'Freelancing',
      icon: 'Briefcase',
      description: 'End-to-end client consultation, milestone execution, and service delivery.',
      skills: [
        { name: 'Client Communication', level: 94, highlight: true },
        { name: 'Project Planning', level: 90 },
        { name: 'Digital Services', level: 92 },
        { name: 'Online Work', level: 95, highlight: true },
      ],
    },
  ],

  // Services
  services: [
    {
      id: 'service-graphic-design',
      title: 'Graphic Design',
      category: 'Creative Design',
      description: 'Professional logos, posters, social media designs, branding, and promotional materials tailored for brand impact.',
      icon: 'Palette',
      featured: true,
      deliverables: ['Custom Vector Logos', 'Marketing Posters & Banners', 'Social Media Asset Kits', 'Print & Packaging Prep'],
    },
    {
      id: 'service-web-development',
      title: 'Website Development',
      category: 'Engineering',
      description: 'Modern responsive websites for businesses, portfolios, personal brands, and startups with lightning-fast load times.',
      icon: 'Layout',
      featured: true,
      deliverables: ['Mobile-First Responsive Layouts', 'Landing Pages & Sales Funnels', 'Clean Semantic Code', 'Interactive Animations'],
    },
    {
      id: 'service-ai-creativity',
      title: 'AI Creative Services',
      category: 'Generative AI',
      description: 'AI-generated images, videos, creative concepts, and visual storytelling pushed to cinematic fidelity.',
      icon: 'Sparkles',
      featured: true,
      deliverables: ['Hyper-Realistic Generative Art', 'Concept Design & Storyboards', 'AI Video Production', 'Prompt Optimization'],
    },
    {
      id: 'service-3d-interactive',
      title: '3D & Interactive Design',
      category: '3D Experiences',
      description: '3D visuals, interactive experiences, animated objects, and creative digital presentations.',
      icon: 'Glasses',
      deliverables: ['Interactive WebGL Elements', 'Real-time 3D Product Viewers', 'Spatial Depth & Tilt Effects', 'Animated Brand Assets'],
    },
    {
      id: 'service-branding',
      title: 'Branding',
      category: 'Brand Strategy',
      description: 'Professional brand identity, logo concepts, social media visuals, and business presentation materials.',
      icon: 'Award',
      deliverables: ['Brand Guidelines & Color Schemes', 'Typography Hierarchies', 'Stationery & Pitch Decks', 'Iconography Sets'],
    },
    {
      id: 'service-portfolio-websites',
      title: 'Portfolio Websites',
      category: 'Web Design',
      description: 'Professional personal portfolios designed to showcase skills and projects with maximum aesthetic prestige.',
      icon: 'Globe',
      deliverables: ['Personal Brand Storytelling', 'Dynamic Project Galleries', 'Interactive Resume & Skills', 'Custom Contact & Lead Capture'],
    },
    {
      id: 'service-fa-group',
      title: 'FA GROUP Digital Solutions',
      category: 'Corporate Solutions',
      description: 'Creative and technology-driven digital solutions under the FA GROUP COMPANY brand for modern enterprise growth.',
      icon: 'ShieldCheck',
      featured: true,
      deliverables: ['Enterprise Digital Presence', 'Custom Growth Tooling', 'Creative Direction Strategy', 'Full-Cycle Agency Support'],
    },
  ],

  // Featured Projects
  projects: [
    {
      id: 'proj-1',
      title: 'Fairy Beauty Salon Website',
      category: 'Web Design',
      description:
        'A luxurious, high-end responsive salon website crafted with elegant typography, booking service showcase, and modern beauty aesthetics.',
      tools: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Figma'],
      projectImage: '', // Supports custom upload or auto-styled fallback
      projectUrl: '#',
      githubUrl: 'https://github.com',
      featured: true,
      highlights: ['Interactive Service Menu', 'Mobile Booking Flow', 'Luxury Visual Styling'],
    },
    {
      id: 'proj-2',
      title: 'Jungle Survival Game',
      category: 'Game Development',
      description:
        'A Unity-based 3D survival game prototype with dynamic jungle environment, resource collection, player inventory mechanics, and responsive Game UI.',
      tools: ['Unity', 'C#', '3D Environment', 'Game UI', 'Audio FX'],
      projectImage: '',
      projectUrl: '#',
      githubUrl: 'https://github.com',
      featured: true,
      highlights: ['Resource Gathering System', 'Custom Terrain Shaders', 'Immersive Audio Engine'],
    },
    {
      id: 'proj-3',
      title: 'AI Creative Projects',
      category: 'AI Creativity',
      description:
        'An experimental generative portfolio combining high-resolution synthetic image generation, character design, and AI cinematic storytelling.',
      tools: ['Midjourney', 'Stable Diffusion', 'Runway', 'Prompt Engineering', 'Photoshop'],
      projectImage: '',
      projectUrl: '#',
      githubUrl: 'https://github.com',
      featured: true,
      highlights: ['Prompt Architecture', 'Consistent Character Studies', 'Visual Narrative Generation'],
    },
    {
      id: 'proj-4',
      title: 'Graphic Design Collection',
      category: 'Graphic Design',
      description:
        'A curated showcase of commercial posters, social media banners, brand identity logos, and promotional typography compositions.',
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva Pro', 'Typography', 'Color Theory'],
      projectImage: '',
      projectUrl: '#',
      githubUrl: 'https://github.com',
      featured: true,
      highlights: ['Vector Brand Logos', 'Commercial Event Posters', 'Social Media Grid Kits'],
    },
    {
      id: 'proj-5',
      title: 'FA GROUP COMPANY',
      category: 'Branding / Business',
      description:
        'Flagship brand identity and digital presence for FA GROUP COMPANY, establishing a chrome-metallic international standard across all corporate touchpoints.',
      tools: ['Corporate Branding', 'Chrome 3D Identity', 'Web Development', 'Digital Agency', 'UI/UX'],
      projectImage: '',
      projectUrl: '#',
      githubUrl: 'https://github.com',
      featured: true,
      highlights: ['Metallic 3D Monogram', 'Corporate Pitch System', 'Multi-Division Digital Architecture'],
    },
  ],

  // Visual Journey
  journey: [
    {
      id: 'step-1',
      stepNumber: '01',
      title: 'Graphic Design',
      period: 'Foundation',
      description: 'Mastered visual hierarchies, typography, color palettes, raster editing in Photoshop, and vector identity in Illustrator.',
      icon: 'Palette',
      tags: ['Photoshop', 'Illustrator', 'Visual Composition', 'Branding'],
    },
    {
      id: 'step-2',
      stepNumber: '02',
      title: 'Web Development',
      period: 'Expansion',
      description: 'Bridged visual designs into responsive, live code using HTML5, CSS3, JavaScript, Bootstrap, and modern layout engines.',
      icon: 'Code',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    },
    {
      id: 'step-3',
      stepNumber: '03',
      title: 'AI Creativity',
      period: 'Innovation',
      description: 'Pioneered AI-assisted creative workflows, mastering prompt engineering, generative visual media, and synthetic video production.',
      icon: 'Sparkles',
      tags: ['GenAI', 'Prompt Engineering', 'AI Art', 'Synthetics'],
    },
    {
      id: 'step-4',
      stepNumber: '04',
      title: '3D & Game Development',
      period: 'Spatial Media',
      description: 'Explored Unity engine fundamentals, real-time spatial assets, game user interfaces, and interactive virtual environments.',
      icon: 'Box',
      tags: ['Unity', 'Game UI', '3D Concepts', 'Interactive'],
    },
    {
      id: 'step-5',
      stepNumber: '05',
      title: 'Freelancing',
      period: 'Client Mastery',
      description: 'Delivered commercial value for global clients, handling requirements, milestones, client communications, and timely deliverables.',
      icon: 'Briefcase',
      tags: ['Client Delivery', 'Milestones', 'Agile Communication', 'Quality'],
    },
    {
      id: 'step-6',
      stepNumber: '06',
      title: 'FA GROUP COMPANY',
      period: 'Present & Future',
      description: 'Formed the overarching professional corporate identity — FA GROUP COMPANY: A premium international business unifying creative digital solutions.',
      icon: 'ShieldCheck',
      tags: ['Executive Brand', 'Digital Solutions', 'Global Vision', 'Innovation'],
    },
  ],

  // Tools & Technologies
  tools: [
    { id: 't-ps', name: 'Photoshop', category: 'Design', badge: 'Expert', icon: 'Image', color: '#31A8FF' },
    { id: 't-ai', name: 'Illustrator', category: 'Design', badge: 'Advanced', icon: 'PenTool', color: '#FF9A00' },
    { id: 't-canva', name: 'Canva', category: 'Design', badge: 'Master', icon: 'Layers', color: '#00C4CC' },
    { id: 't-html', name: 'HTML5', category: 'Development', badge: 'Core', icon: 'Code', color: '#E34F26' },
    { id: 't-css', name: 'CSS3', category: 'Development', badge: 'Core', icon: 'FileCode', color: '#1572B6' },
    { id: 't-js', name: 'JavaScript', category: 'Development', badge: 'Proficient', icon: 'Terminal', color: '#F7DF1E' },
    { id: 't-bs', name: 'Bootstrap', category: 'Development', badge: 'Fluent', icon: 'LayoutGrid', color: '#7952B3' },
    { id: 't-unity', name: 'Unity', category: 'AI & 3D', badge: 'Exploring', icon: 'Gamepad2', color: '#FFFFFF' },
    { id: 't-office', name: 'Microsoft Office', category: 'Productivity', badge: 'Executive', icon: 'FileSpreadsheet', color: '#D83B01' },
    { id: 't-aitools', name: 'AI Generative Tools', category: 'AI & 3D', badge: 'Specialist', icon: 'Bot', color: '#A855F7' },
  ],

  // Why Work With Me
  whyWorkWithMe: [
    {
      id: 'why-1',
      title: 'Creative Thinking',
      description: 'Approaching challenges from unconventional angles to generate distinctive, non-generic creative outcomes.',
      icon: 'Lightbulb',
    },
    {
      id: 'why-2',
      title: 'Professional Design',
      description: 'Meticulous attention to typography, optical balance, color theory, and modern aesthetic finesse.',
      icon: 'Compass',
    },
    {
      id: 'why-3',
      title: 'Modern Technology',
      description: 'Leveraging modern front-end standards and cutting-edge generative tools to accelerate delivery.',
      icon: 'Cpu',
    },
    {
      id: 'why-4',
      title: 'Attention to Detail',
      description: 'Pixel-level precision across viewports, micro-interactions, responsive padding, and contrast ratios.',
      icon: 'CheckCircle2',
    },
    {
      id: 'why-5',
      title: 'Client-Focused Approach',
      description: 'Clear, transparent milestone communication with honest timelines and active collaboration.',
      icon: 'Users',
    },
    {
      id: 'why-6',
      title: 'Continuous Learning',
      description: 'Always evolving skillsets across emerging 3D tech, AI frameworks, and international design standards.',
      icon: 'TrendingUp',
    },
  ],

  // Editable Social & Contact Links
  socialLinks: [
    { id: 's-whatsapp', name: 'WhatsApp', url: 'https://wa.me/1234567890', displayHandle: '+12 345 67890', icon: 'whatsapp' },
    { id: 's-instagram', name: 'Instagram', url: 'https://instagram.com/fagroup', displayHandle: '@fagroup.creative', icon: 'instagram' },
    { id: 's-facebook', name: 'Facebook', url: 'https://facebook.com/fagroup', displayHandle: 'FA GROUP Official', icon: 'facebook' },
    { id: 's-linkedin', name: 'LinkedIn', url: 'https://linkedin.com/in/fagroup', displayHandle: 'FA GROUP COMPANY', icon: 'linkedin' },
    { id: 's-github', name: 'GitHub', url: 'https://github.com/fagroup', displayHandle: 'github.com/fagroup', icon: 'github' },
    { id: 's-email', name: 'Email', url: 'mailto:contact@fagroup.com', displayHandle: 'contact@fagroup.com', icon: 'mail' },
  ],

  contactEmail: 'contact@fagroup.com',
  contactLocation: 'International / Remote Worldwide',
};
