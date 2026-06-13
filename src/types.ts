/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  metrics: { label: string; value: string; trend?: string }[];
  status: "LIVE" | "DEPLOYED" | "CORE-ACTIVE" | "STABLE-09";
  version: string;
  systemArchitecture: string[];
}

export interface Skill {
  name: string;
  category: "AI & Automation" | "Full-Stack Engineering" | "SaaS Architecture" | "Digital Marketing Systems" | "Creative Technology" | "Industrial Systems Engineering";
  level: number; // 0 to 100
  notes: string;
  connectedNodes: string[];
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  details: string[];
  highlightColor: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  architectureDetails: string[];
  systemLoadTime: string;
  reliabilityScore: string;
  capabilities: string[];
}

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}
