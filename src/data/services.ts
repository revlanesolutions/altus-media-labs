import "server-only";
import type { SiteImage } from "./imagery";
export interface Service {
  slug: string;
  image?: SiteImage;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const services: Service[] = [
  {
    slug: "ai-business-automation",
    title: "AI & Business Automation",
    shortTitle: "AI & Automation",
    tagline: "Intelligent systems that work while you sleep",
    description:
      "We architect AI-first solutions that transform how your business operates. From intelligent document processing and predictive analytics to custom chatbots and workflow automation, we build systems that eliminate repetitive work, surface actionable insights, and scale your operations without scaling your headcount. Our approach is pragmatic — we start with your highest-impact pain points and deliver measurable ROI within weeks, not months.",
    icon: "Brain",
    features: [
      {
        title: "Custom AI Chatbots & Virtual Assistants",
        description:
          "Purpose-built conversational agents trained on your data, deployed across web, WhatsApp, and internal tools. Reduce support ticket volume by up to 60% while maintaining a human-quality interaction standard that your customers actually enjoy using.",
        icon: "MessageSquare",
      },
      {
        title: "Intelligent Document Processing",
        description:
          "Automate the extraction, classification, and routing of invoices, contracts, receipts, and custom document types. Our pipelines achieve 98.5%+ accuracy on structured document tasks, turning hours of manual data entry into seconds of processing.",
        icon: "FileText",
      },
      {
        title: "Predictive Analytics & Forecasting",
        description:
          "Machine learning models that predict customer churn, forecast demand, optimize pricing, and identify revenue opportunities. We build dashboards that turn your historical data into forward-looking decision tools your team actually uses.",
        icon: "TrendingUp",
      },
      {
        title: "Workflow Automation & Integration",
        description:
          "End-to-end automation of business processes using intelligent orchestration. Connect CRM, ERP, email, spreadsheets, and custom systems into unified workflows that execute reliably, with built-in exception handling and human-in-the-loop escalation.",
        icon: "Workflow",
      },
      {
        title: "Natural Language Data Queries",
        description:
          "Give your team the ability to query databases and generate reports using plain English. No SQL knowledge required — just ask questions and get visualizations, tables, and insights in real time.",
        icon: "Database",
      },
      {
        title: "AI-Powered Content Generation",
        description:
          "Scalable content pipelines for product descriptions, marketing copy, email campaigns, and social posts. Fine-tuned to your brand voice, with human review workflows built in to maintain quality at any volume.",
        icon: "Sparkles",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Opportunity Mapping",
        description:
          "We audit your current operations, identify the highest-ROI automation opportunities, and quantify the time and cost savings each initiative would deliver. Every recommendation comes with a projected timeline and success metric.",
      },
      {
        step: 2,
        title: "Architecture & Model Design",
        description:
          "Our engineers design the technical architecture, select the right models and tools for each use case, and create detailed implementation blueprints. We validate feasibility with rapid prototypes before committing to full development.",
      },
      {
        step: 3,
        title: "Build, Train & Integrate",
        description:
          "We develop the solution in agile sprints, training models on your data and integrating with your existing systems. Weekly demos keep you informed and allow course correction before small issues become big problems.",
      },
      {
        step: 4,
        title: "Deploy, Monitor & Optimize",
        description:
          "Production deployment with monitoring dashboards, alerting, and continuous performance tracking. We refine models based on real-world usage patterns and expand automation scope based on measured results.",
      },
    ],
    stats: [
      { label: "Average time saved per client", value: "340 hrs/mo" },
      { label: "Document processing accuracy", value: "98.5%" },
      { label: "Support ticket reduction", value: "60%" },
      { label: "Time to first ROI", value: "3 weeks" },
    ],
    faq: [
      {
        question: "Do we need to have our data organized before starting?",
        answer:
          "Not at all. Part of our discovery phase includes a data audit and cleanup strategy. We work with data in whatever state it currently exists — spreadsheets, databases, APIs, even PDFs — and build the pipelines to structure it properly as part of the solution.",
      },
      {
        question: "How do you handle data privacy and security?",
        answer:
          "We follow enterprise-grade security practices. All data is encrypted in transit and at rest. We never train public models on your data. Solutions can be deployed on your own infrastructure or in isolated cloud environments with full access controls and audit logging.",
      },
      {
        question: "What if our use case is unique?",
        answer:
          "Most of our best projects started with a client saying exactly that. We specialize in custom AI solutions that don't fit into off-the-shelf products. If it involves data, decisions, or repetition, we can probably automate it.",
      },
      {
        question: "What's the typical timeline for an AI automation project?",
        answer:
          "Most projects deliver their first working automation within 3-6 weeks. Complex multi-system integrations may take 8-12 weeks. We work in agile sprints, so you see progress every week and can start using completed components before the full project finishes.",
      },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Development",
    tagline: "Digital experiences that convert visitors into customers",
    description:
      "We build fast, accessible, and conversion-optimized websites and web applications that look stunning and perform even better. Every line of code is written with performance budgets, SEO requirements, and user experience principles baked in from day one. We don't just build websites — we build revenue-generating digital platforms that scale with your business.",
    icon: "Code",
    features: [
      {
        title: "Custom Website Design & Development",
        description:
          "Bespoke websites built from the ground up using modern frameworks and best practices. No templates, no compromises. Every pixel is intentional, every interaction is considered, and every page is optimized for conversion from the first wireframe to final launch.",
        icon: "Monitor",
      },
      {
        title: "E-Commerce Platforms",
        description:
          "High-converting online stores with advanced product management, dynamic pricing, inventory integration, and seamless checkout flows. Built to handle traffic spikes during promotions without breaking a sweat, with analytics that tell you exactly what's working.",
        icon: "ShoppingCart",
      },
      {
        title: "Web Applications & SaaS Products",
        description:
          "Full-stack web applications with complex business logic, real-time features, role-based access control, and multi-tenant architecture. We build products that your users love and your engineering team can maintain for years.",
        icon: "AppWindow",
      },
      {
        title: "Progressive Web Apps (PWAs)",
        description:
          "Installable, offline-capable web experiences that feel native on any device. Reach users across all platforms with a single codebase while delivering app-like performance, push notifications, and background sync capabilities.",
        icon: "Smartphone",
      },
      {
        title: "API Development & Integration",
        description:
          "RESTful and GraphQL APIs designed for performance, security, and developer experience. We integrate with third-party services, build custom integrations between your existing tools, and create API layers that power mobile apps and partner ecosystems.",
        icon: "Plug",
      },
      {
        title: "Performance Optimization & Core Web Vitals",
        description:
          "We audit and optimize existing websites for maximum speed. From image optimization and code splitting to server-side rendering and caching strategies, we push Lighthouse scores above 90 and keep your users engaged instead of waiting.",
        icon: "Zap",
      },
    ],
    process: [
      {
        step: 1,
        title: "Strategy & User Research",
        description:
          "We study your audience, analyze competitors, map user journeys, and define conversion goals. The result is a detailed project brief and information architecture that guides every design and development decision.",
      },
      {
        step: 2,
        title: "UI/UX Design & Prototyping",
        description:
          "High-fidelity designs built in Figma with interactive prototypes. We test navigation flows, validate design decisions with stakeholder feedback, and refine until every screen serves the user and the business equally well.",
      },
      {
        step: 3,
        title: "Development & Quality Assurance",
        description:
          "Clean, well-documented code developed in two-week sprints with continuous integration. Every feature goes through cross-browser testing, accessibility auditing, and performance profiling before it's marked complete.",
      },
      {
        step: 4,
        title: "Launch, Monitor & Iterate",
        description:
          "Staged rollout with monitoring, analytics setup, and post-launch optimization. We track real user behavior, identify friction points, and release improvements based on data rather than assumptions.",
      },
    ],
    stats: [
      { label: "Average Core Web Vitals score", value: "95+" },
      { label: "Average page load time", value: "< 1.8s" },
      { label: "Conversion improvement (avg)", value: "42%" },
      { label: "Projects delivered on time", value: "97%" },
    ],
    faq: [
      {
        question: "What technology stack do you use?",
        answer:
          "We primarily use Next.js with TypeScript for front-end and Node.js or Python for back-end services. For CMS-driven sites, we work with headless CMS platforms. Our stack choices are always driven by your project's specific requirements — we're not tied to any single technology.",
      },
      {
        question: "Can you work with our existing development team?",
        answer:
          "Absolutely. We frequently augment existing teams, provide code reviews, and establish development standards. Our code is thoroughly documented and follows industry best practices so your team can maintain and extend it confidently.",
      },
      {
        question: "Do you provide ongoing maintenance?",
        answer:
          "Yes. We offer maintenance packages that include security updates, performance monitoring, content updates, and feature enhancements. Most clients start with a build engagement and transition to a monthly retainer for ongoing support.",
      },
      {
        question: "How do you handle responsive design?",
        answer:
          "We design mobile-first and test on real devices across breakpoints. Every component is built to adapt fluidly from 320px mobile screens to 4K displays. Accessibility (WCAG 2.1 AA) is validated as part of our standard QA process.",
      },
    ],
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    shortTitle: "Branding & Design",
    tagline: "Visual identities that command attention and build trust",
    description:
      "Your brand is more than a logo — it's the total experience people have when they encounter your business. We build comprehensive brand systems that create immediate recognition, communicate your values, and earn the trust of your audience. From strategic positioning to pixel-perfect design deliverables, we craft identities that are distinctive, flexible, and built to last across every touchpoint.",
    icon: "Palette",
    features: [
      {
        title: "Brand Strategy & Positioning",
        description:
          "Deep-dive workshops to define your brand's purpose, personality, values, and competitive positioning. We create a strategic foundation that informs every creative decision and ensures your brand resonates with the right audience for the right reasons.",
        icon: "Compass",
      },
      {
        title: "Visual Identity Design",
        description:
          "Complete visual identity systems including logo design, color palettes, typography systems, iconography, and illustration style. Delivered with comprehensive brand guidelines that anyone on your team can follow to maintain visual consistency.",
        icon: "PenTool",
      },
      {
        title: "Brand Guidelines & Documentation",
        description:
          "Detailed style guides covering logo usage, spacing rules, color specifications, typography hierarchies, photography direction, and tone of voice. These living documents evolve with your brand and keep every stakeholder aligned.",
        icon: "BookOpen",
      },
      {
        title: "Packaging & Print Design",
        description:
          "Physical brand expressions including product packaging, business cards, stationery systems, trade show materials, and environmental graphics. We ensure your brand translates powerfully from screen to print with production-ready files.",
        icon: "Package",
      },
      {
        title: "UI/UX Design Systems",
        description:
          "Scalable design systems with reusable components, design tokens, and interaction patterns. Built for your product team to use across web and mobile, ensuring speed and consistency as your digital presence grows.",
        icon: "Layers",
      },
      {
        title: "Brand Refresh & Evolution",
        description:
          "Strategic updates to existing brands that honor their heritage while modernizing their expression. We identify what's working, what's holding you back, and craft an evolution plan that feels like growth, not a jarring departure.",
        icon: "RefreshCw",
      },
    ],
    process: [
      {
        step: 1,
        title: "Brand Discovery & Research",
        description:
          "Stakeholder interviews, audience research, competitive audits, and market analysis. We map the landscape your brand exists in and identify the white space where your brand can own a distinctive position.",
      },
      {
        step: 2,
        title: "Strategy & Creative Direction",
        description:
          "We define your brand's strategic framework — mission, vision, values, personality, and positioning — then translate it into a creative direction that captures the essence of who you are and who you want to become.",
      },
      {
        step: 3,
        title: "Design Exploration & Refinement",
        description:
          "Multiple creative concepts explored through mood boards, sketches, and digital drafts. We refine collaboratively with your team, pressure-testing every design decision against the strategic framework until we reach the final system.",
      },
      {
        step: 4,
        title: "Delivery & Implementation",
        description:
          "Final assets delivered in every format you need, with comprehensive guidelines and templates. We also support the implementation phase, ensuring your brand lands consistently across digital, print, and environmental applications.",
      },
    ],
    stats: [
      { label: "Brand recognition improvement", value: "3.2x avg" },
      { label: "Projects completed", value: "180+" },
      { label: "Client brand satisfaction", value: "98%" },
      { label: "Average project duration", value: "6-8 weeks" },
    ],
    faq: [
      {
        question: "How is a brand strategy different from a logo design?",
        answer:
          "A logo is one output of the branding process. Brand strategy defines who you are, who you serve, and why you matter. The visual identity — including the logo — is the expression of that strategy. Starting with strategy ensures your visuals communicate the right message to the right people.",
      },
      {
        question:
          "We already have a brand. Can you work within our existing identity?",
        answer:
          "Of course. We regularly work with established brands to extend their visual systems, create sub-brands, or evolve their identity for new markets. We respect existing brand equity and build on what's already working.",
      },
      {
        question: "What do we receive at the end of the project?",
        answer:
          "You receive a complete brand package: all design files in industry-standard formats (Figma, Illustrator, SVG, PNG, etc.), a comprehensive brand guidelines document, logo variations, color specifications, typography files, and application templates for common use cases.",
      },
      {
        question: "How involved do we need to be in the process?",
        answer:
          "We need your input at key milestones — discovery interviews, concept reviews, and final approvals. Between those checkpoints, our team handles the heavy lifting. Most clients invest 4-6 hours per week during active project phases.",
      },
    ],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    shortTitle: "Social Media",
    tagline: "Build communities, not just follower counts",
    description:
      "Social media is a conversation, not a broadcast. We manage your social presence with a content-first approach that builds genuine community engagement, drives website traffic, and converts followers into customers. Our team handles everything from strategy and content creation to community management and analytics, so you can focus on running your business while we make sure your brand shows up consistently and authentically across every platform.",
    icon: "Share2",
    features: [
      {
        title: "Social Media Strategy & Planning",
        description:
          "Platform-specific strategies built around your business goals, audience behavior, and competitive landscape. We identify which platforms matter for your brand, what content formats perform best, and how to allocate your resources for maximum impact.",
        icon: "Target",
      },
      {
        title: "Content Creation & Curation",
        description:
          "Scroll-stopping visuals, carousels, reels, stories, and written posts crafted to your brand voice. Our creative team produces platform-native content that feels organic, not corporate — the kind of content people actually save, share, and engage with.",
        icon: "Image",
      },
      {
        title: "Community Management",
        description:
          "Active community engagement including comment responses, DM management, and conversation facilitation. We build relationships with your audience, handle inquiries professionally, and turn casual followers into brand advocates.",
        icon: "Users",
      },
      {
        title: "Social Analytics & Reporting",
        description:
          "Comprehensive monthly reports tracking growth, engagement rates, content performance, audience demographics, and sentiment analysis. We translate data into actionable insights and continuously optimize your content strategy based on what the numbers tell us.",
        icon: "BarChart3",
      },
      {
        title: "Influencer Partnerships",
        description:
          "Identification, vetting, outreach, and management of influencer collaborations. We match your brand with creators whose audiences align with your target market, negotiate fair partnerships, and track campaign performance from first DM to final report.",
        icon: "Star",
      },
      {
        title: "Crisis Management & Reputation",
        description:
          "Real-time monitoring of brand mentions and sentiment across social platforms. When issues arise, we respond quickly with pre-approved messaging that protects your brand reputation and turns potential crises into demonstrations of responsive, responsible communication.",
        icon: "Shield",
      },
    ],
    process: [
      {
        step: 1,
        title: "Audit & Strategy Development",
        description:
          "Complete audit of your current social presence, competitor analysis, and audience research. We develop a 90-day content calendar with platform-specific strategies, content pillars, and measurable KPIs aligned with your business objectives.",
      },
      {
        step: 2,
        title: "Content Production & Scheduling",
        description:
          "Our creative team produces all content — graphics, copy, video concepts — and schedules posts at optimal times for each platform. Content goes through your approval workflow before publishing, keeping you in control without consuming your time.",
      },
      {
        step: 3,
        title: "Community Engagement",
        description:
          "Daily monitoring and active engagement across all managed platforms. We respond to comments, manage DMs, participate in relevant conversations, and proactively engage with potential customers in your target audience.",
      },
      {
        step: 4,
        title: "Analyze, Report & Optimize",
        description:
          "Monthly performance reviews with detailed analytics, ROI tracking, and strategic recommendations. We identify what's working, what to stop doing, and what to test next — keeping your social presence on a continuous upward trajectory.",
      },
    ],
    stats: [
      { label: "Average engagement increase", value: "185%" },
      { label: "Follower growth (6-month avg)", value: "240%" },
      { label: "Content pieces created/mo", value: "60-120" },
      { label: "Response time average", value: "< 2 hrs" },
    ],
    faq: [
      {
        question: "Which platforms do you manage?",
        answer:
          "We manage all major platforms including Instagram, LinkedIn, X (Twitter), Facebook, TikTok, YouTube, and Pinterest. We recommend focusing on the 2-3 platforms where your target audience is most active rather than spreading resources thin across all of them.",
      },
      {
        question: "How quickly can you get started?",
        answer:
          "We typically onboard new clients within 5-7 business days. The first week includes the audit and strategy phase, and you'll see your first scheduled content go live within two weeks of kickoff.",
      },
      {
        question: "Do we need to provide photos and videos?",
        answer:
          "Not necessarily. Our creative team can produce original graphics, design templates, and direct photo/video shoots. If you have existing brand assets or team photos, we incorporate those. We also work with stock imagery and user-generated content strategies.",
      },
      {
        question: "How do you measure ROI on social media?",
        answer:
          "We track both leading indicators (engagement rate, reach, follower growth, click-through rate) and business metrics (website traffic from social, lead generation, conversion rate, attributed revenue). Every monthly report connects social activity to business outcomes.",
      },
    ],
  },
  {
    slug: "paid-marketing",
    title: "Paid Marketing",
    shortTitle: "Paid Marketing",
    tagline: "Every dollar spent should earn more than it costs",
    description:
      "Paid advertising is the fastest way to generate predictable revenue — when it's done right. We build and manage paid campaigns across Google, Meta, LinkedIn, and programmatic platforms with a relentless focus on ROAS (Return on Ad Spend). Our approach combines data-driven audience targeting, compelling creative, and continuous optimization to ensure your budget works harder than your competitors'.",
    icon: "DollarSign",
    features: [
      {
        title: "Google Ads Management",
        description:
          "Search, display, shopping, and YouTube campaigns built on thorough keyword research, competitive analysis, and audience segmentation. We structure campaigns for Quality Score optimization, write ad copy that converts, and manage bids to maximize every dollar of ad spend.",
        icon: "Search",
      },
      {
        title: "Meta Ads (Facebook & Instagram)",
        description:
          "Full-funnel campaign strategies from awareness to conversion. We leverage Meta's advanced targeting capabilities including lookalike audiences, retargeting sequences, and dynamic creative optimization to reach the right people with the right message at the right time.",
        icon: "Megaphone",
      },
      {
        title: "LinkedIn Advertising",
        description:
          "B2B campaigns targeting decision-makers by job title, company size, industry, and seniority. We craft professional ad creative and lead generation forms that attract qualified prospects and feed directly into your sales pipeline.",
        icon: "Briefcase",
      },
      {
        title: "Retargeting & Display Campaigns",
        description:
          "Multi-touch retargeting strategies that re-engage visitors across the web. From dynamic product ads to sequential storytelling campaigns, we stay top-of-mind with prospects who've shown interest and guide them back to conversion.",
        icon: "RotateCcw",
      },
      {
        title: "Landing Page Optimization",
        description:
          "High-converting landing pages designed specifically for your ad campaigns. Every element — headline, copy, imagery, form layout, social proof — is tested and optimized to maximize the conversion rate of your paid traffic.",
        icon: "Layout",
      },
      {
        title: "Conversion Tracking & Attribution",
        description:
          "Server-side tracking, multi-touch attribution models, and custom dashboards that give you a clear picture of which campaigns drive real business results. We go beyond last-click attribution to show the true impact of your paid media investment.",
        icon: "LineChart",
      },
    ],
    process: [
      {
        step: 1,
        title: "Account Audit & Strategy",
        description:
          "Comprehensive audit of existing campaigns (if any), competitive landscape analysis, and audience research. We develop a channel strategy, budget allocation plan, and projected ROI model before spending a single dollar of your budget.",
      },
      {
        step: 2,
        title: "Campaign Build & Launch",
        description:
          "Campaign structure, ad copy, creative assets, targeting configuration, tracking setup, and conversion optimization. Everything is tested and validated before launch, with A/B tests built in from day one to start generating learning data immediately.",
      },
      {
        step: 3,
        title: "Daily Optimization & Management",
        description:
          "Continuous monitoring of bid strategies, ad performance, audience signals, and budget pacing. We make daily adjustments based on real-time data, pause underperformers, scale winners, and ensure your budget is always working at maximum efficiency.",
      },
      {
        step: 4,
        title: "Reporting & Strategic Review",
        description:
          "Weekly performance summaries and monthly strategic reviews with detailed analysis and forward-looking recommendations. We present results in plain language, connect ad spend to revenue, and propose next-phase strategies based on accumulated data.",
      },
    ],
    stats: [
      { label: "Average ROAS achieved", value: "5.2x" },
      { label: "Cost per lead reduction", value: "-45%" },
      { label: "Total ad spend managed", value: "$12M+" },
      { label: "Client retention rate", value: "94%" },
    ],
    faq: [
      {
        question: "What's the minimum ad budget you work with?",
        answer:
          "We recommend a minimum monthly ad spend of $3,000-$5,000 depending on the industry and goals. Below that threshold, the data volume is too low to optimize effectively. We're happy to discuss your specific situation and recommend a budget that makes sense for your market.",
      },
      {
        question: "How quickly will we see results?",
        answer:
          "Paid campaigns typically start generating data within the first week. Meaningful optimization begins at the 2-week mark with sufficient data. Most clients see a positive ROAS within 30-60 days, with significant improvement month over month as the algorithms learn and we refine targeting.",
      },
      {
        question: "Do you create the ad creative too?",
        answer:
          "Yes. Our in-house creative team produces all ad creative — static images, carousels, video ads, and copywriting. We also A/B test creative variations to identify what resonates best with your audience. If you have existing brand assets, we incorporate those into the creative process.",
      },
      {
        question: "How do you handle tracking in a post-cookie world?",
        answer:
          "We implement server-side tracking, Conversions API (CAPI) integrations, and enhanced conversions to maintain accurate attribution. We also focus on first-party data strategies and Google's enhanced conversions to ensure measurement reliability as third-party cookies phase out.",
      },
    ],
  },
  {
    slug: "search-engine-optimization",
    title: "Search Engine Optimization",
    shortTitle: "SEO/GEO",
    tagline: "Organic growth that compounds month after month",
    description:
      "SEO and GEO are powerful customer acquisition channels when executed with precision. We take a technical-first, content-driven approach to optimizing your digital presence for search engines and AI-powered search experiences. From strategic keyword research and authoritative content to technical optimization, entity building, and earned links, we increase organic visibility and help your brand appear in traditional search results and AI-generated answers.",
    icon: "Search",
    features: [
      {
        title: "Technical SEO & Site Architecture",
        description:
          "Comprehensive technical audits covering crawlability, indexation, site speed, Core Web Vitals, structured data, and internal linking. We fix the foundation so search engines can efficiently discover, understand, and rank your content.",
        icon: "Server",
      },
      {
        title: "Keyword Research & Content Strategy",
        description:
          "Data-driven keyword research that identifies high-intent search queries your customers are actually using. We map keywords to the buyer journey, create content clusters around topic authority, and develop editorial calendars that align SEO with business priorities.",
        icon: "FileSearch",
      },
      {
        title: "On-Page Optimization",
        description:
          "Systematic optimization of title tags, meta descriptions, headers, internal links, image alt text, and content structure. Every page is optimized for both search engines and human readers — because algorithms reward content that serves users well.",
        icon: "FileCode",
      },
      {
        title: "Content Creation & Optimization",
        description:
          "SEO-optimized content written by subject-matter experts and refined for search performance. We create long-form pillar content, supporting articles, and location-specific pages that build topical authority and capture traffic at every stage of the funnel.",
        icon: "PenLine",
      },
      {
        title: "Link Building & Digital PR",
        description:
          "White-hat link acquisition through editorial outreach, digital PR campaigns, guest contributions, and strategic partnerships. We build authoritative backlink profiles that improve domain authority and drive referral traffic from relevant, high-quality sources.",
        icon: "Link",
      },
      {
        title: "Local SEO & Google Business Profile",
        description:
          "Local search optimization including Google Business Profile management, local citation building, review strategy, and location-specific content. We help businesses dominate local search results and attract customers in their geographic area.",
        icon: "MapPin",
      },
    ],
    process: [
      {
        step: 1,
        title: "SEO Audit & Competitive Analysis",
        description:
          "Full technical audit, content gap analysis, and competitive landscape assessment. We identify quick wins, technical issues, content opportunities, and benchmark your current performance against competitors who are winning the rankings you want.",
      },
      {
        step: 2,
        title: "Strategy & Keyword Planning",
        description:
          "Priority keyword mapping, content cluster architecture, and a 6-month SEO roadmap. We assign keywords to existing pages for optimization and identify new content needed to fill gaps in your search coverage.",
      },
      {
        step: 3,
        title: "Implementation & Content Production",
        description:
          "Technical fixes, on-page optimization, and content creation executed systematically. We follow SEO best practices for every piece of content and ensure new pages are properly indexed and ranked from the moment they're published.",
      },
      {
        step: 4,
        title: "Authority Building & Monitoring",
        description:
          "Ongoing link building, content refresh cycles, and performance monitoring. Monthly reports track rankings, organic traffic, conversions, and revenue attribution, with strategic adjustments based on algorithm updates and competitive shifts.",
      },
    ],
    stats: [
      { label: "Average organic traffic increase", value: "310%" },
      { label: "Keywords on page 1 (avg)", value: "156+" },
      { label: "Average domain authority lift", value: "+28 pts" },
      { label: "Client SEO retention rate", value: "96%" },
    ],
    faq: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "SEO is a medium-to-long-term investment. Most clients see measurable improvements in organic traffic within 3-6 months, with significant results at 6-12 months. The compounding nature of SEO means the ROI accelerates over time — unlike paid ads that stop the moment you stop spending.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No reputable SEO agency can guarantee specific rankings, and anyone who does is being dishonest. What we guarantee is a data-driven, best-practice approach that has consistently delivered significant organic growth for our clients. We focus on revenue-generating keywords and measure success by business impact, not just position numbers.",
      },
      {
        question: "Can you help if our site was penalized by Google?",
        answer:
          "Yes. We've recovered multiple sites from algorithmic and manual penalties. The process involves identifying the cause, fixing the issues (toxic backlinks, thin content, etc.), submitting reconsideration requests if needed, and rebuilding trust with a clean, high-quality SEO strategy.",
      },
      {
        question: "How is your SEO approach different from other agencies?",
        answer:
          "We focus on business outcomes rather than vanity metrics. Instead of chasing keyword volume, we target high-intent queries that drive conversions. Our technical-first approach ensures your site's foundation is solid before we layer on content and link building. And we provide full transparency — you'll always know exactly what we're doing and why.",
      },
    ],
  },
];
