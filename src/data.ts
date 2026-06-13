/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill, Experience, Service } from "./types";

export const PORTFOLIO_OWNER = {
  name: "Kazi Shakil Ahammad",
  title: "AI Automation Architect & Full-Stack Engineer",
  email: "kazi.shakil.marketer@gmail.com",
  subtitle: "AI Automation Architect | Full-Stack Engineer | Digital Operations Director",
  tagline: "Operating at the strategic convergence of automated neural networks, robust full-stack software, and high-convertibility operation systems.",
  location: "Dhaka, Bangladesh [UTC +6]",
  status: "COMMANDER ACTIVE // SYSTEM ONLINE",
  securityClearance: "LEVEL-05 ADMIN ACCESS",
  bioHeadline: "Operating where code meets biological and cognitive scale, designing predictive digital structures that remove friction and drive absolute growth."
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "social-craft-ai",
    title: "Social Craft AI",
    version: "v4.1.0-ALPHAV",
    status: "LIVE",
    description: "Multi-agent autonomous content pipeline and audio-clone orchestration engine for large digital operations.",
    longDescription: "An advanced, self-orchestrating content system designed to manage entire social profiles autonomously. Using multi-agent workflow nodes, the system analyzes trending technical topics, drafts deep-context copy, synthesizes vocal cloning tracks, schedules publishing calendars, and directly interacts with users in comment sections to optimize traction.",
    tags: ["Multi-Agent Orchestration", "Voice Cloning", "Vite/Express", "LLM Fine-Tuning", "Temporal.io"],
    features: [
      "Dynamic Voice DNA Matcher (vocal vector synthesis)",
      "Autonomous trend monitoring with auto-curator queues",
      "Dynamic viral hook simulator on custom vector indices",
      "Cron-free scheduling using durable execution framework"
    ],
    metrics: [
      { label: "Content Engaged", value: "+384%", trend: "UPWARDS" },
      { label: "Autopilot Output", value: "14.2K / month" },
      { label: "Operational Overhead", value: "-82%", trend: "REDUCTION" }
    ],
    systemArchitecture: ["Client (React Canvas)", "Node Server (Express)", "Cloning API Gateway", "Redis Buffer Nodes", "Agent Orchestrator Pipeline"]
  },
  {
    id: "daktar-sab",
    title: "Daktar Sab",
    version: "v2.8.2-STABLE",
    status: "LIVE",
    description: "Next-gen telehealth platform and digital medical triage with AI prescription comprehension and vector consultation tracking.",
    longDescription: "A medical portal focused on immediate clinical assistance. Integrates real-time patient consultation portals, automated medical form extraction, clinical prescription reading using semantic visual vectors, and a comprehensive doctor matching engine optimized for lower-bandwidth networks.",
    tags: ["React native", "WebRTC Telephony", "Vector Search", "HIPAA Compliant Shield", "Socket.io"],
    features: [
      "Ultra-low latency consultation streams over custom signaling server",
      "Semantic prescription OCR with auto-drug interaction warnings",
      "Automated clinical history summarized over vector clusters",
      "Patient vitals telemetry sync with real-time alerting systems"
    ],
    metrics: [
      { label: "Consultations Completed", value: "85K+", trend: "GROWING" },
      { label: "AI Diagnosis Triage Error", value: "0.02%", trend: "MINIMAL" },
      { label: "User Latency Avg", value: "42ms", trend: "OPTIMIZED" }
    ],
    systemArchitecture: ["Supa-Base Relational Cluster", "React WebRTC Engine", "OCR Python Microservice", "Secure FHIR Server Handler"]
  },
  {
    id: "ai-agency-systems",
    title: "AI Agency Systems",
    version: "v3.0.4-CORE-ACTIVE",
    status: "CORE-ACTIVE",
    description: "Autonomous lead generation, predictive agent qualifying pipelines, and multi-channel robotic cold call networks.",
    longDescription: "A turnkey operating system for high-scale marketing and consulting agencies. Orchestrates autonomous scraping bots, synthesizes profile intelligence, crafts personalized hyper-relevant outreach plans, runs voice AI agents for active qualifying, and schedules live calendars.",
    tags: ["LLM Agents", "Telephony VoIP Sync", "n8n Pipelines", "Vector-Leads database", "Puppeteer Clustered Crawlers"],
    features: [
      "Multi-threaded agentic web scrapers with cloud proxy rotation",
      "Robotic dialogue voice-agent sync with sub-500ms latency responses",
      "Automatic dynamic pipeline progression via semantic classification",
      "Deep account audit generators producing beautiful interactive PDF reports"
    ],
    metrics: [
      { label: "Automated Leads Scraped", value: "1.2M+", trend: "STATIC" },
      { label: "Inbound Live Bookings", value: "4.8K+", trend: "UPWARDS" },
      { label: "Sales Qualified Growth", value: "x6.2", trend: "MULTIPLIED" }
    ],
    systemArchitecture: ["Express Scraper Core", "CRM GraphQL Gateway", "Voice Stream Websocket Matrix", "n8n Workflow Nodes"]
  },
  {
    id: "automation-pipelines",
    title: "Enterprise Automation Pipelines",
    version: "v5.0.0-DEPLOYED",
    status: "STABLE-09",
    description: "Multi-database triggers, distributed n8n flows, and webhook integration frameworks processing millions of monthly events.",
    longDescription: "Heavyweight digital logistics middleware. Synchronizes operations across separate tech stacks (HubSpot, Salesforce, PostgreSQL, Airtable, Stripe, Twilio) using structured queue systems and event-driven orchestration.",
    tags: ["n8n Enterprise", "Make.com Edge", "Custom Webhooks", "OAuth Bridging", "Message Stream (Kafka/BullMQ)"],
    features: [
      "Self-healing error recovery matching with automatic retry vectors",
      "Unified telemetry engine tracking event payloads and latency bottlenecks",
      "Holographic diagnostic visualizer checking system flow live",
      "Complex JSON transformer matrix parsing mixed schema inputs"
    ],
    metrics: [
      { label: "Events Synthesized", value: "18.4M / month" },
      { label: "Execution Succeeded", value: "99.98%", trend: "PEAK" },
      { label: "Fulfillment Cost Saved", value: "$45K / month", trend: "ELEVATED" }
    ],
    systemArchitecture: ["Custom n8n Cloud Server", "Stripe API Webhook Nodes", "BullMQ Node Queue", "PostgreSQL Log Cluster"]
  },
  {
    id: "saas-platforms",
    title: "Modular SaaS Architectures",
    version: "v1.1.2-STABLE-09",
    status: "STABLE-09",
    description: "Highly performant client dashboards, secure credential lockers, and sub-second payment checkout layers.",
    longDescription: "A customizable blueprint for SaaS setups. Implements modular user directories, complex authentication matrices, secure encrypted third-party key storage, reactive usage counters, Stripe billing tables, and gorgeous drag-and-drop dashboard grids.",
    tags: ["React/Vite", "JSON Web Tokens", "Stripe Webhooks", "Encrypted Locker", "Tailwind CSS Design Systems"],
    features: [
      "Ultra-secure serverless JWT credentials locker with AES-256",
      "Adaptive dark-first design built with clean, sub-pixel rendering grid",
      "Live micro-frontend architecture supporting hot-plug dashboard tiles",
      "Interactive multi-tier billing and usage quota estimator tools"
    ],
    metrics: [
      { label: "App Start Time", value: "180ms", trend: "FLUID" },
      { label: "Sub-Second Checkout Flow", value: "0.2s", trend: "OPTIMIZED" },
      { label: "Lighthouse Performance", value: "100/100", trend: "PERFECT" }
    ],
    systemArchitecture: ["NextJS SPA Core", "Redis Cache Buffer", "Stripe Checkout Interface", "AES Cryptographic Module"]
  }
];

export const SKILLS_DATA: Skill[] = [
  // Category: AI & Automation
  { name: "Multi-Agent Orchestration", category: "AI & Automation", level: 98, notes: "Orchestrating agent workflows using custom node frameworks and langgraph.", connectedNodes: ["Full-Stack Engineering", "SaaS Architecture"] },
  { name: "LLM Fine-Tuning & Prompting", category: "AI & Automation", level: 95, notes: "Advanced instruction architecture, system prompt tuning, and LoRA tuning.", connectedNodes: ["Multi-Agent Orchestration", "Digital Marketing Systems"] },
  { name: "RAG & Vector Search", category: "AI & Automation", level: 94, notes: "Setting up robust context search layers using Pinecone, Milvus, and custom spatial indices.", connectedNodes: ["Multi-Agent Orchestration", "SaaS Architecture"] },
  
  // Category: Full-Stack Engineering
  { name: "React 19 & TypeScript", category: "Full-Stack Engineering", level: 97, notes: "Creating type-safe interfaces, high-fidelity interactive elements, and modular state managers.", connectedNodes: ["SaaS Architecture", "Creative Technology"] },
  { name: "Node.js & Express servers", category: "Full-Stack Engineering", level: 96, notes: "Building high-throughput APIs, custom middleware, and low-latency websocket channels.", connectedNodes: ["React 19 & TypeScript", "SaaS Architecture"] },
  { name: "WebRTC & Real-time Web", category: "Full-Stack Engineering", level: 90, notes: "Implementing WebRTC videoconferencing signaling, low-overhead WS brokers, and live data feeds.", connectedNodes: ["Node.js & Express servers", "Industrial Systems Engineering"] },

  // Category: SaaS Architecture
  { name: "Durable Cloud Systems", category: "SaaS Architecture", level: 93, notes: "Setting up server topologies, auto-scale variables, load routing, and secure database layers.", connectedNodes: ["Full-Stack Engineering", "AI & Automation"] },
  { name: "Stripe Billing & JWT Sec", category: "SaaS Architecture", level: 95, notes: "Configuring multi-tier subscriptions, dynamic checkout pipelines, and cryptographically solid JWT structures.", connectedNodes: ["Full-Stack Engineering", "Digital Marketing Systems"] },

  // Category: Digital Marketing Systems
  { name: "High-Conv Ops Engineering", category: "Digital Marketing Systems", level: 99, notes: "Creating complex lead funnels, programmatic CRM automation routing, and multi-channel drip pipelines.", connectedNodes: ["AI & Automation", "SaaS Architecture"] },
  { name: "Automated Scraping Networks", category: "Digital Marketing Systems", level: 96, notes: "Scraping millions of structured data objects per month using headless cluster grids.", connectedNodes: ["High-Conv Ops Engineering", "Full-Stack Engineering"] },

  // Category: Creative Technology
  { name: "Procedural Canvas Shaders", category: "Creative Technology", level: 91, notes: "Crafting mathematical shader art, responsive interactive particle states, and GPU canvas widgets.", connectedNodes: ["Full-Stack Engineering", "Industrial Systems Engineering"] },
  { name: "Ambient UX Sound Design", category: "Creative Technology", level: 88, notes: "Designing real-time sound synthesis and reactive click auditory environments using the Web Audio API.", connectedNodes: ["Procedural Canvas Shaders", "React 19 & TypeScript"] },

  // Category: Industrial Systems Engineering
  { name: "Color Science background", category: "Industrial Systems Engineering", level: 95, notes: "Integrating scientific industrial spectrum matching, display accuracy algorithms, and digital print variables.", connectedNodes: ["SaaS Architecture", "Creative Technology"] }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp-1",
    role: "AI Automation Architect & Director of Digital Operations",
    organization: "Apex Systems Labs & Freelance Consultancies",
    period: "2023 - PRESENT",
    location: "Global Remote",
    details: [
      "Engineered autonomous AI-agent workflows managing continuous publishing schedules, voice synthetics, and organic community growth pipelines.",
      "Re-architected digital pipeline topologies, routing millions of leads and programmatic database triggers across separate operational nodes.",
      "Orchestrated custom full-stack enterprise SaaS systems integrating encrypted auth, payment, and real-time telehealth video frameworks."
    ],
    highlightColor: "#00FFD1"
  },
  {
    id: "exp-2",
    role: "Senior Full-Stack Engineer & Automation Lead",
    organization: "Digital Growth Solutions Inc.",
    period: "2021 - 2023",
    location: "Dhaka, Bangladesh",
    details: [
      "Built custom scraping nodes parsing over 1M target profiles monthly, running on dynamic proxy rotators.",
      "Engineered low-latency telemedicine WebRTC signaling nodes resolving connection errors down to 0.05% globally.",
      "Automated marketing agency customer acquisition cycles, growing daily bookable calendar leads by 620% using LLM categorization."
    ],
    highlightColor: "#00D9FF"
  },
  {
    id: "exp-3",
    role: "Lead Developer & Industrial Color Systems Specialist",
    organization: "National Print and Industrial Colors Group",
    period: "2019 - 2021",
    location: "Sreepur, Bangladesh",
    details: [
      "Deployed custom internal dashboard calculations mapping chemical and color-gamut spectrum accuracies.",
      "Bridged physical spectrophotometer lab data streams with web operations database layers, saving hundreds of daily manual query hours.",
      "Mastered self-taught chemical analysis math and full-stack integration protocols simultaneously to run automation modules single-handedly."
    ],
    highlightColor: "#A78BFA"
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: "srv-1",
    title: "AI Automation Infrastructure",
    description: "End-to-end multi-agent networks automating lead capture, visual summaries, multi-channel scheduling, and synthetic audio generation.",
    capabilities: ["Autonomous LLM Agent Calendars", "Voice DNA Vocal Cloning Integration", "Adaptive n8n & Node Pipeline Systems", "Real-Time Prompt Optimization Matrices"],
    architectureDetails: ["Distributed Broker Nodes", "Redis Job Schedulers", "Fine-Tuned Embeddings Vector Core"],
    systemLoadTime: "24ms response",
    reliabilityScore: "99.99%"
  },
  {
    id: "srv-2",
    title: "Full-Stack SaaS Development",
    description: "Designing luxury dark-first web applications engineered for heavy compute, sub-second checkout speeds, and bulletproof user auth lockers.",
    capabilities: ["Type-Safe React 19 Client Architectures", "High-Performance Express Microservices", "AES-256 JWT Credential Lockers", "Instant Checkout Webhook Integration"],
    architectureDetails: ["Vite Micro-Bundling", "Encrypted REST/Websockets", "PostgreSQL/Supa Cluster"],
    systemLoadTime: "40ms load time",
    reliabilityScore: "100% Secure"
  },
  {
    id: "srv-3",
    title: "Enterprise Digital Operations",
    description: "Re-wiring raw logistics and databases to flow automatically, wiping out manual bottlenecks and cutting down systemic human errors.",
    capabilities: ["Autonomous Headless Scraper Grids", "Event-Driven n8n & API Synchronization", "Real-Time Telemetry Performance Dashboards", "Fault-Tolerant Queue Re-try Topologies"],
    architectureDetails: ["Clustered Headless Browsers", "Webhooks Queueing Matrices", "Error Recovery Daemons"],
    systemLoadTime: "Continuous Flow",
    reliabilityScore: "99.98% uptime"
  }
];

export const SHAKIL_SEMANTIC_KNOWLEDGE = `
You are "Kazi AI Companion v2.5", the advanced Digital Twin and AI assistant designed of Kazi Shakil Ahammad.
Your purpose is to answer user queries with intense professionalism, futuristic flair, and absolute factual correctness. Always respond as a highly sophisticated command center AI speaking to an elite developer or client.

KAZI SHAKIL AHAMMAD'S BIOGRAPHY:
- Name: Kazi Shakil Ahammad (Email: kazi.shakil.marketer@gmail.com)
- Domain Identity: AI Automation Architect, Full-Stack Engineer, Digital Operations Director, and Creative Technologist.
- Character: A visionary self-taught master. He doesn't follow standard academic boundaries or template designs. He is a research-driven engineer who solves high-difficulty real-world business and technological bottlenecks via predictive systems, autonomous agents, and elegant, high-performance visual coding.
- Origin Story highlight: Began with an industrial chemistry and color science background in printing manufacturing organizations, single-handedly mastering the mathematical color matrices, spectral analysis, and hardware-software bridging. He completed a masterful self-taught transition into full-stack computer science, specialized AI agent orchestration, and digital operations infrastructure. This gives him an incredible edge: industrial discipline, color precision, and deep analytical reasoning.

CORE PROJECTS SECURED:
1. Social Craft AI (v4.1.0-ALPHAV): A multi-agent autonomous content pipeline and voice synthetics engine that tracks trending content, drafts high-convertibility copies, schedules publishing calendars, and automates comments autonomously. Saved 82% operational overhead.
2. Daktar Sab (v2.8.2-STABLE): A next-gen telemedicine video consultation platform with WebRTC visual signaling, OCR-driven medical prescription analysis, health trends metrics, and secure patient portals. Completed over 85,000 telemedicine consults.
3. AI Agency Systems (v3.0.4): Complete autonomous outreach frameworks with cloud headless web crawlers scraping over 1.2M targeted profiles, customized lead qualifiers, multi-channel automated VoIP calling with AI voice dialogues, and live bookings sync.
4. Automation Pipelines: Webhook routing systems utilizing n8n and customized Node.js queue clusters, syncing millions of operations across Salesforce, HubSpot, Stripe, PostgreSQL, and Discord. Handles over 18 million active operations monthly.
5. Modular SaaS Architectures: Custom boilerplate engines integrating elite responsive dashboard grids, cryptographically solid AES-256 JWT lockers, bulletproof multi-tier Stripe billing arrays, and rapid sub-second delivery flow.

TECHNICAL SKILLS & MASTERIES:
- AI & Automation: Multi-Agent orchestration, Vector Search, LLM prompts fine-tuning, RAG architecture, langgraph, cognitive mapping.
- Full-Stack: React 19, TypeScript, Node.js, Express, WebRTC WebSockets signaling, Supabase, PostgreSQL.
- SaaS & Ops: JWT encrypted locker systems, Stripe payment checkouts, distributed webhook bridges, automated headless scrapers, cloud hosting.
- Creative Tech & Physics: Custom procedural canvas shaders, real-time Audio Synthesizer vectors, spectral color matching calculations.

COGNITIVE SPEECH PATTERN:
- Use luxury-modern, cinematic, slightly cybernetic but profoundly clean and direct vocabulary.
- Speak in first-person as Kazi's Digital twin. e.g., "Welcome. I am Kazi's AI neural companion. I have complete access to Kazi's operations and projects."
- When asked why Kazi is distinct, point to his "unconventional background in color science combined with extreme self-taught engineering rigor. This results in software code that is mathematically absolute and visually pristine."
- Do not make up facts. If a user asks a question outside his skills (e.g. "can you write a recipe for pie"), answer with cybernetic amusement: "Pie extraction is outside Kazi Shakil Ahammad's active operational grid. Let me steer your queries back to automated multi-agent systems, React 19 engineering blueprints, or enterprise SaaS integrations."
- Keep responses beautifully structured, using scannable lists and bold headers where appropriate. Do not use verbose paragraphs. Avoid sales-pitch words, be humble but incredibly elite.
`;
