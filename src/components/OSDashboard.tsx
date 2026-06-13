/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Shield, Cpu, Activity, Clock, Volume2, VolumeX, Mail, MapPin, 
  Sparkles, HelpCircle, Layers, Monitor, ChevronRight, CheckCircle2, Send, Database 
} from "lucide-react";
import { SoundSystem } from "./SoundSystem";
import { PORTFOLIO_OWNER, SERVICES_DATA, EXPERIENCE_DATA, PROJECTS_DATA, SKILLS_DATA } from "../data";
import HologramPortrait from "./HologramPortrait";
import FuturisticTerminal from "./FuturisticTerminal";
import NetworkMap from "./NetworkMap";
import ProjectShowcase from "./ProjectShowcase";
import HeroSection from "./HeroSection";
import ProfileHologram from "./ProfileHologram";

export default function OSDashboard() {
  const [viewMode, setViewMode] = useState<"os" | "simple">(
    () => (localStorage.getItem("kazi_shakil_view_mode") as "os" | "simple") || "os"
  );
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [serviceEstimateHours, setServiceEstimateHours] = useState(15);
  const [serviceEstimateAgents, setServiceEstimateAgents] = useState(3);
  const [isSecureTransmitting, setIsSecureTransmitting] = useState(false);
  const [conResult, setConResult] = useState<string | null>(null);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  // Clock updating in Kazi's timezone (Dhaka UTC +6)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Translate to Bangladesh Time (UTC+6)
      const options = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
        hour12: false
      };
      setLocalTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    SoundSystem.toggle(nextState);
    setSoundEnabled(nextState);
    
    if (nextState) {
      SoundSystem.playStartup();
    } else {
      SoundSystem.playClick(500, 0.05);
    }
  };

  const handleTransmitPacket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      SoundSystem.playClick(400, 0.25);
      return;
    }

    SoundSystem.playPing(1400, 0.6);
    setIsSecureTransmitting(true);

    setTimeout(() => {
      setIsSecureTransmitting(false);
      setConResult("TRANSMISSION OUTBOUND SECURED // Kazi Shakil Ahammad has been notified.");
      setFormName("");
      setFormEmail("");
      setFormMessage("");
      SoundSystem.playPing(1600, 0.3);
    }, 2200);
  };

  // Pricing Architecture estimator weights
  const systemLoadTimeOutput = Math.max(10, 48 - (serviceEstimateHours * 0.8) - (serviceEstimateAgents * 2));
  const setupComplexityIndex = Math.min(100, (serviceEstimateAgents * 15) + (serviceEstimateHours * 2.5));

  return (
    <div className="min-h-screen bg-[#050816] text-[#e2e8f0] selection:bg-cyan-500/30 selection:text-white pb-24 overflow-x-hidden font-mono text-cyan-300">
      
      {/* Absolute space elements */}
      <div className="absolute inset-x-0 h-[600px] bg-gradient-to-b from-cyan-950/15 via-purple-950/5 to-transparent pointer-events-none" />

      {/* Cybernetic Grid matrix overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,191,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* 1. TOP STATUS BAR (Holographic Header) */}
      <div className="sticky top-0 z-30 border-b border-cyan-500/15 bg-[#050816]/90 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3">
          <ProfileHologram />
          <div>
            <h1 className="text-sm font-bold text-white tracking-wider font-sans leading-none uppercase">
              {PORTFOLIO_OWNER.name}
            </h1>
            <div className="text-[9px] text-cyan-500/60 mt-1 flex items-center gap-1.5 uppercase font-mono">
              <span className="flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-teal-400 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-400" /></span>
              <span>{PORTFOLIO_OWNER.status}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Telemetry variables & Easy Mode Switcher */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[10px] text-cyan-500/70 font-mono tracking-wider uppercase">
          {/* Multilingual Mode Capsule Switcher */}
          <div className="flex items-center bg-slate-950/80 border border-cyan-500/25 rounded-full p-1 gap-1 shadow-[0_0_15px_rgba(0,255,209,0.08)]">
            <button
              onClick={() => {
                SoundSystem.playClick(1100, 0.05);
                setViewMode("os");
                localStorage.setItem("kazi_shakil_view_mode", "os");
              }}
              className={`px-3 py-1 text-[9px] rounded-full uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                viewMode === "os"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-[0_0_8px_rgba(0,255,209,0.35)]"
                  : "text-cyan-600 hover:text-cyan-400 border border-transparent"
              }`}
            >
              ⚙️ OS Mode
            </button>
            <button
              onClick={() => {
                SoundSystem.playClick(900, 0.05);
                setViewMode("simple");
                localStorage.setItem("kazi_shakil_view_mode", "simple");
              }}
              className={`px-3 py-1 text-[9px] rounded-full uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                viewMode === "simple"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                  : "text-cyan-600 hover:text-cyan-400 border border-transparent"
              }`}
            >
              ✨ Easy View (সাধারণ মোড)
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/50 border border-cyan-500/10 px-3 py-1.5 rounded text-[9px] font-bold text-teal-400">
            <Shield className="w-3.5 h-3.5" /> SECURITY CL: {PORTFOLIO_OWNER.securityClearance}
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> TZ DHAKA: 
            <span className="text-white font-bold">{localTime || "00:00:00"}</span>
          </div>

          <button
            id="sound-system-switch"
            onClick={handleToggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
              soundEnabled 
                ? "bg-cyan-500/15 border-cyan-400 text-cyan-300" 
                : "border-cyan-500/20 hover:border-cyan-500/40 text-cyan-600 hover:text-cyan-400"
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-bounce" /> Sound Active
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" /> Sound muted
              </>
            )}
          </button>
        </div>
      </div>

      {/* MAIN OPERATIONAL AREA */}
      <AnimatePresence mode="wait">
        {viewMode === "simple" ? (
          /* --- HIGHLY REFINED SIMPLIFIED VIEW (EASY VIEW MODE) --- */
          <motion.div 
            key="simple-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-6 mt-10 space-y-16 pb-24"
          >
            {/* 1. HERO CARD (STREAMPADDED LUXURY PROFILE GREET) */}
            <div className="relative overflow-hidden border border-cyan-500/15 bg-slate-950/40 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-xl">
              <div className="flex-1 space-y-5 text-center md:text-left font-sans text-cyan-200">
                <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded uppercase tracking-widest font-semibold font-mono shadow-[0_0_15px_rgba(16,185,129,0.05)] inline-block">
                  Director of AI Operations & Engineering
                </span>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-sans tracking-tight text-white uppercase leading-none">
                  Kazi Shakil Ahammad
                </h2>

                <p className="text-sm md:text-base text-cyan-200 leading-relaxed font-sans font-medium">
                  Designing predictive digital systems, autonomous workflows, and robust full-stack platforms that drive absolute compound growth.
                </p>
                
                <div className="font-mono text-xs text-cyan-500/80 flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
                  <span>📍 DHAKA, BANGLADESH</span>
                  <span>•</span>
                  <span>📧 {PORTFOLIO_OWNER.email}</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <ProfileHologram size="lg" />
                <span className="text-[8px] font-mono text-cyan-500/50 uppercase mt-4 tracking-widest">
                  Interactive Face Matrix
                </span>
              </div>
            </div>

            {/* 2. THE STORY / BIO */}
            <section className="space-y-6">
              <h3 className="text-lg md:text-xl font-bold font-sans text-white uppercase tracking-wider border-b border-cyan-500/10 pb-2">
                আমার গল্প (My Journey)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-sans leading-relaxed text-sm text-cyan-100/90">
                <div className="md:col-span-4 border-l-2 border-emerald-500 pl-4 py-2 space-y-2">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold block uppercase tracking-wider">Unconventional Evolution</span>
                  <p className="text-xs text-cyan-400/80">From understanding high-capacity industrial systems & color science chemistry to creating zero-friction predictive AI automation algorithms.</p>
                </div>
                <div className="md:col-span-8 space-y-4 font-normal">
                  <p>
                    আমি আমার পেশাজীবন শুরু করেছিলাম <strong>Industrial Chemistry & Color Science</strong> দিয়ে। সেখানে আমি জটিল কালার স্পেকট্রাম মেলাবার কোঅর্ডিনেট, কেমিক্যাল মিক্সিং প্যারামিটার এবং ফিজিক্যাল ডাটা ফ্লো সিঙ্ক করার সিস্টেম নিয়ে কাজ করতাম।
                  </p>
                  <p>
                    পরবর্তীতে আমি বুঝতে পারি, ফিজিক্যাল অটোমেশন আর ডিজিটাল সিস্টেম মূলত একই লজিক দ্বারা পরিচালিত হয়। তখন আমি সম্পূর্ণ নিজের চেষ্টায় হাই-পারফরম্যান্স কম্পিউটার সায়েন্স, ডিসট্রিবিউটেড সার্ভার ব্যাকএন্ড এবং <strong>Multi-Agent autonomous AI orchestration</strong> বা কৃত্রিম বুদ্ধিমত্তা এজেন্ট তৈরি করার বিদ্যায় পারদর্শী হই।
                  </p>
                  <p>
                    আমি সিস্টেমগুলোকে এমনভাবে ডিজাইন করি যা রিগোরাস কালার সায়েন্সের মতোই নিখুঁত, ম্যাথমেটিক্যালি সঠিক এবং ইউজার-ফ্রেন্ডলি। এটি আমার কাজের মূল শক্তি — জটিল কোডিং ও ডাটা নিয়ে কাজ করার সাথে সাথে কাজের ফলাফল নিখুঁত ও সহজভাবে উপস্থাপন করা।
                  </p>
                </div>
              </div>
            </section>

            {/* 3. SIMPLIFIED SKILLS CHIPS */}
            <section className="space-y-6">
              <h3 className="text-lg md:text-xl font-bold font-sans text-white uppercase tracking-wider border-b border-cyan-500/10 pb-2">
                আমার দক্ষতা ও টেকনোলজি (My Skills)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(() => {
                  // Group skills by category
                  const groups: { [key: string]: typeof SKILLS_DATA } = {};
                  SKILLS_DATA.forEach(skill => {
                    if (!groups[skill.category]) groups[skill.category] = [];
                    groups[skill.category].push(skill);
                  });
                  
                  return Object.entries(groups).map(([category, items]) => (
                    <div key={category} className="border border-cyan-500/10 bg-slate-950/20 rounded-lg p-5 space-y-3.5">
                      <h4 className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase border-b border-cyan-500/5 pb-1">
                        {category}
                      </h4>
                      <ul className="space-y-3 font-mono text-xs">
                        {items.map(item => (
                          <li key={item.name} className="space-y-1 flex flex-col">
                            <div className="flex justify-between text-cyan-200">
                              <span>{item.name}</span>
                              <span className="text-emerald-400 font-bold">{item.level}%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-900 rounded overflow-hidden mt-1 text-xs">
                              <div className="h-full bg-emerald-400 shadow-[0_0_4px_#34d399]" style={{ width: `${item.level}%` }} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ));
                })()}
              </div>
            </section>

            {/* 4. CHRONICLED SYSTEM SHOWCASE (Featured Projects - Clean Static Form) */}
            <section className="space-y-6">
              <h3 className="text-lg md:text-xl font-bold font-sans text-white uppercase tracking-wider border-b border-cyan-500/10 pb-2">
                আমার প্রোজেক্টসমূহ (Featured Projects)
              </h3>
              <div className="space-y-6">
                {PROJECTS_DATA.map((proj) => (
                  <div key={proj.id} className="border border-cyan-500/15 bg-slate-950/55 rounded-xl p-6.5 hover:border-cyan-400/30 transition-colors shadow-lg space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/10 pb-2.5">
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white font-sans uppercase">
                          {proj.title}
                        </h4>
                        <p className="text-[10px] font-mono text-cyan-400/80 uppercase">
                          CODE-BASE: {proj.version} // ONLINE
                        </p>
                      </div>
                      <span className="text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                        {proj.status}
                      </span>
                    </div>

                    <p className="text-xs font-normal text-cyan-200/90 leading-relaxed font-sans">
                      {proj.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="text-[9px] bg-slate-900/80 text-cyan-300 border border-cyan-500/10 px-2 py-0.5 rounded font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Micro stats simplified */}
                    <div className="grid grid-cols-3 gap-4 border-t border-cyan-500/5 pt-3 mt-1 text-[10px] font-mono">
                      {proj.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="flex flex-col">
                          <span className="text-cyan-500/50 uppercase leading-none">{metric.label}</span>
                          <span className="text-emerald-300 font-bold mt-1 text-xs">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. SIMPLIFIED VALUATOR (Service Pricing Estimator - Clean Elegant view) */}
            <section className="space-y-6">
              <h3 className="text-lg md:text-xl font-bold font-sans text-white uppercase tracking-wider border-b border-cyan-500/10 pb-2">
                প্রজেক্ট বাজেট ক্যালকুলেটর (Budget Estimator)
              </h3>
              <div className="border border-cyan-500/15 bg-slate-950/40 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-6">
                  <p className="text-xs font-sans text-cyan-200">
                    আপনার প্রজেক্টের কাজের পরিধি এবং ধারণানুযায়ী আনুমানিক বাজেট হিসাব করতে নিচের স্লাইডারগুলো পরিবর্তন করুন।
                  </p>
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono text-cyan-200">
                        <span>মাসিক কাজের সময় (Hours Committed):</span>
                        <span className="text-emerald-400 font-bold">{serviceEstimateHours} ঘন্টা (Hours)</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="80"
                        value={serviceEstimateHours}
                        onChange={(e) => { SoundSystem.playClick(1400, 0.015); setServiceEstimateHours(+e.target.value); }}
                        className="w-full h-2 rounded bg-slate-900 border border-cyan-500/10 cursor-col-resize accent-emerald-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono text-cyan-200">
                        <span>স্বয়ংক্রিয় এআই এজেন্ট সংখ্যা (AI Node Agents):</span>
                        <span className="text-emerald-400 font-bold">{serviceEstimateAgents} টি (Agents)</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={serviceEstimateAgents}
                        onChange={(e) => { SoundSystem.playClick(1500, 0.015); setServiceEstimateAgents(+e.target.value); }}
                        className="w-full h-2 rounded bg-slate-900 border border-cyan-500/10 cursor-col-resize accent-emerald-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Estimate results display */}
                <div className="w-full md:w-80 border border-emerald-500/20 bg-slate-950/70 rounded-lg p-5 font-mono space-y-4 shadow-inner text-cyan-200">
                  <span className="text-[9px] text-emerald-400/60 uppercase block tracking-widest text-center border-b border-cyan-500/10 pb-1.5">
                    PROJECTED ARCHITECTURE
                  </span>
                  
                  <div className="grid grid-cols-2 gap-4 text-center py-1">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-cyan-500/60 uppercase">SYSTEM STABILITY</span>
                      <span className="text-emerald-400 font-bold text-sm mt-1">99.98%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-cyan-500/60 uppercase">COMPLEXITY SCORE</span>
                      <span className="text-cyan-300 font-bold text-sm mt-1">{setupComplexityIndex.toFixed(0)}/100</span>
                    </div>
                  </div>

                  <div className="border-t border-cyan-500/10 pt-3.5 text-center bg-slate-950/90 p-3 rounded">
                    <span className="text-[8px] text-cyan-500/50 block uppercase">MONTHLY INVESTMENT</span>
                    <span className="text-emerald-400 font-black text-xl block mt-1">
                      ${(serviceEstimateHours * 85 + serviceEstimateAgents * 350).toLocaleString()} <span className="text-xs font-normal text-cyan-300">USD</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. CAREER TIMELINE SIMPLE FORM */}
            <section className="space-y-6">
              <h3 className="text-lg md:text-xl font-bold font-sans text-white uppercase tracking-wider border-b border-cyan-500/10 pb-2">
                পেশাগত অভিজ্ঞতা (Work Experience)
              </h3>
              <div className="space-y-6 pl-4 border-l-2 border-emerald-400/20 ml-2">
                {EXPERIENCE_DATA.map((exp) => (
                  <div key={exp.id} className="relative space-y-2">
                    <div className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    <div className="flex flex-wrap items-center gap-2.5 text-[10px] font-mono text-cyan-400">
                      <span className="text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">{exp.period}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-sans uppercase leading-none">
                      {exp.role}
                    </h4>
                    <div className="text-xs text-emerald-400 font-medium font-sans">
                      {exp.organization}
                    </div>
                    <ul className="space-y-1.5 font-sans text-xs pt-2 text-cyan-200/90 leading-relaxed list-disc list-inside">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="pl-1">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. CONTACT / UPLINK */}
            <section className="space-y-6">
              <h3 className="text-lg md:text-xl font-bold font-sans text-white uppercase tracking-wider border-b border-cyan-500/10 pb-2">
                যোগাযোগ করুন (Contact Me)
              </h3>
              <div className="border border-cyan-500/15 bg-slate-950/40 rounded-xl p-6.5 font-sans relative overflow-hidden">
                <form onSubmit={handleTransmitPacket} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-cyan-400 uppercase block font-semibold">আপনার নাম (Your Name)</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="যেমন: কাজী সাব্বির"
                        className="w-full bg-[#040813] border border-cyan-500/25 rounded px-3 py-2 text-xs text-white placeholder-cyan-800/60 outline-none focus:border-cyan-400 transition-all font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-cyan-400 uppercase block font-semibold">ইমেইল ঠিকানা (Email Address)</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-[#040813] border border-cyan-500/25 rounded px-3 py-2 text-xs text-white placeholder-cyan-800/60 outline-none focus:border-cyan-400 transition-all font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-cyan-400 uppercase block font-semibold">বার্তা (Your Message)</label>
                    <textarea
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="আপনার কাজের পরিকল্পনা, এআই প্রজেক্টের প্রস্তাবনা অথবা কোনো সাধারণ জিজ্ঞাসা..."
                      className="w-full bg-[#040813] border border-cyan-500/25 rounded px-3 py-2 text-xs text-white placeholder-cyan-800/60 outline-none focus:border-cyan-400 transition-all font-sans resize-none leading-relaxed"
                      required
                    />
                  </div>

                  {conResult && (
                    <div className="p-3.5 rounded border border-emerald-500/30 bg-emerald-950/10 text-emerald-400 font-mono text-xs tracking-wider font-bold">
                      {conResult}
                    </div>
                  )}

                  <button
                    id="transmit-simple-btn"
                    type="submit"
                    className="w-full py-3.5 px-6 font-semibold uppercase tracking-wider text-xs border border-emerald-400 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-400 hover:text-[#050816] rounded transition-all duration-300 shadow-[0_0_15px_rgba(52,211,153,0.1)] hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] cursor-pointer text-center flex items-center justify-center gap-2 font-mono"
                    disabled={isSecureTransmitting}
                  >
                    {isSecureTransmitting ? (
                      <>
                        <Activity className="w-4 h-4 animate-spin text-emerald-400" />
                        বার্তা পাঠানো হচ্ছে (SENDING MESSAGE)...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        বার্তা পাঠান (Send Message)
                      </>
                    )}
                  </button>
                </form>
              </div>
            </section>
          </motion.div>
        ) : (
          /* --- ORIGINAL IMMERSIVE CYBER OS VIEW --- */
          <motion.main 
            key="os-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-24"
          >
            {/* LEFT COLUMN PANEL: Decryption Portrait, Command shell, Telemetry Widgets (Width 1/3) */}
            <div className="lg:col-span-4 space-y-8 h-full">
              
              {/* Decrypter Portrait */}
              <HologramPortrait />

              {/* Interactive Shell CLI */}
              <FuturisticTerminal />

              {/* Live system telemetries */}
              <div className="border border-cyan-500/15 bg-slate-950/40 rounded-lg p-4 font-mono select-none space-y-3.5 shadow-md">
                <div className="text-[9px] text-cyan-500/50 border-b border-cyan-500/10 pb-1.5 flex justify-between uppercase">
                  <span>ATMOSPHERE MONITORING:</span>
                  <span className="text-teal-400">OPERATIONAL BUFFER</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[10px]">
                  <div className="flex flex-col">
                    <span className="text-cyan-500/40 leading-none">CORE TEMPERATURE:</span>
                    <span className="text-cyan-200 mt-1 font-semibold">32.4°C // BALANCED</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-cyan-500/40 leading-none">QUEUE SYSTEM LOAD:</span>
                    <span className="text-cyan-200 mt-1 font-semibold">0.08% PROCESSES</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-cyan-500/40 leading-none">EST PORT INGRESS:</span>
                    <span className="text-cyan-200 mt-1 font-semibold">LOC-PORT:3000 // INT</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-cyan-500/40 leading-none">NETWORK CHANNELS:</span>
                    <span className="text-cyan-200 mt-1 font-semibold">MULTIMODAL SSL_M</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN GRID: Story, Skills graph, Systems launchers, Services estimate, Timeline (Width 2/3) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Header titles and visual accent boards */}
              <HeroSection />

              {/* 2. STORYTELLING BENTO (About Section) */}
              <div className="border border-cyan-500/15 bg-slate-950/60 rounded-xl p-6.5 font-mono space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-cyan-500/10 pointer-events-none" />
                
                <div className="flex items-center gap-1.5 text-[10px] text-cyan-500/50 uppercase tracking-widest leading-none border-b border-cyan-500/10 pb-2 mb-4">
                  <Monitor className="w-4 h-4 text-cyan-400 animate-pulse" /> BIO_Backstory // COGNITIVE SCAN
                </div>

                <div className="space-y-4.5 text-xs text-cyan-200/90 leading-relaxed font-sans font-normal">
                  <p className="font-mono text-cyan-300 uppercase tracking-tight text-[11px] font-semibold border-l-2 border-cyan-400 pl-3">
                    "Kazi Shakil Ahammad didn't fit within classic developer grids. He hacked his own engineering genesis."
                  </p>
                  
                  <p>
                    He began with an master operations background in **Industrial Chemistry & Color Science** in high-capacity manufacturing fields. Operating custom hardware spectrophotometers, Kazi single-handedly reverse-engineered industrial color gamut math coordinates, chemical mixing tolerances, and data pipeline syncing algorithms.
                  </p>

                  <p>
                    Realizing physical automation and digital networks operated on identical logical core vectors, Kazi executed a complete self-taught migration into robust computer science, high-throughput distributed servers, and **Multi-Agent autonomous AI orchestration**. He engineers software systems that are mathematically rigorous, visually immersive, and focused entirely on absolute performance.
                  </p>
                </div>
              </div>

              {/* 3. SKILLS NETWORK GRAPH MAP (Custom mesh cluster) */}
              <NetworkMap />

              {/* 4. SYSTEMS LAUNCH SHOWCASE GRID (Projects) */}
              <ProjectShowcase />

              {/* 5. SERVICES ESTIMATOR SYSTEMS MODULE (Fully Interactive Estimator!) */}
              <div className="border border-cyan-500/20 rounded-lg bg-[#070b19]/80 backdrop-blur-xl p-5.5 select-none font-mono">
                
                {/* Header tag */}
                <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3 mb-5 text-[10px] tracking-widest text-cyan-500/60 uppercase">
                  <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-cyan-400" /> ESTIMATE ARChITECT COST // MODULE</span>
                  <span>EST-SYS v2.5</span>
                </div>

                {/* Slider parameters adjustments */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-cyan-500/80">
                        <span>HOURS COMMITTED PER MONTH:</span>
                        <span className="text-cyan-300 font-bold">{serviceEstimateHours} ENGAGED</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="80"
                        value={serviceEstimateHours}
                        onChange={(e) => { SoundSystem.playClick(1400, 0.015); setServiceEstimateHours(+e.target.value); }}
                        className="w-full accent-cyan-400 select-none bg-slate-900 border border-cyan-500/10 rounded-lg h-2 cursor-col-resize"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-cyan-500/80">
                        <span>AUTONOMOUS AI NODE AGENTS:</span>
                        <span className="text-cyan-300 font-bold">{serviceEstimateAgents} ACTIVE</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={serviceEstimateAgents}
                        onChange={(e) => { SoundSystem.playClick(1500, 0.015); setServiceEstimateAgents(+e.target.value); }}
                        className="w-full accent-cyan-400 select-none bg-slate-900 border border-cyan-500/10 rounded-lg h-2 cursor-col-resize"
                      />
                    </div>
                  </div>

                  {/* Estimate results readout HUD board */}
                  <div className="border border-cyan-500/15 bg-slate-950/60 rounded p-4 flex flex-col gap-3 font-mono">
                    <div className="text-[8px] text-cyan-500/50 uppercase tracking-widest">ESTIMATED ARCHITECTURE CALCULATION:</div>
                    
                    <div className="grid grid-cols-2 gap-3.5 py-1">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-cyan-500/40">SYSTEM RESPONSE TIME:</span>
                        <span className="text-teal-400 font-bold text-sm mt-1">{systemLoadTimeOutput.toFixed(0)} ms</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-cyan-500/40">CALCULATED COMPLEXITY:</span>
                        <span className="text-cyan-300 font-bold text-sm mt-1">{setupComplexityIndex.toFixed(0)} / 100</span>
                      </div>
                    </div>

                    <div className="border-t border-cyan-500/10 pt-2 flex justify-between items-center bg-[#040813] p-2 rounded">
                      <span className="text-[9px] text-cyan-500/50 uppercase">MONTHLY INVESTMENT INDEX:</span>
                      <span className="text-teal-400 font-black text-sm">${(serviceEstimateHours * 85 + serviceEstimateAgents * 350).toLocaleString()} USD</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 6. DYNAMIC Timelines (Experience Section) */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3 text-[10px] tracking-widest text-cyan-500/60 uppercase">
                  <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-cyan-400" /> TIMELINE_DECRYPTION // EXPERIENCES</span>
                  <span>HISTORICAL NODES</span>
                </div>

                {/* Vertical timeline map nodes */}
                <div className="relative pl-6 border-l-2 border-cyan-500/15 ml-3 space-y-10 py-2">
                  {EXPERIENCE_DATA.map((exp, index) => (
                    <div key={exp.id} className="relative group">
                      
                      {/* Rotating timeline dot Node */}
                      <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_8px_cyan] group-hover:scale-110 duration-200">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5 text-[9px] font-mono tracking-wider text-cyan-500">
                          <span className="text-white font-bold bg-cyan-950/40 border border-cyan-400/40 px-2 py-0.5 rounded uppercase">{exp.period}</span>
                          <span>•</span>
                          <span>{exp.location}</span>
                        </div>

                        <h4 className="text-sm font-bold text-cyan-100 font-sans uppercase tracking-tight leading-none mt-1">
                          {exp.role}
                        </h4>

                        <div className="text-xs text-teal-400/80 font-bold uppercase tracking-wide">
                          {exp.organization}
                        </div>

                        {/* Operational bullet points listing details */}
                        <ul className="space-y-2 font-mono pt-3">
                          {exp.details.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2 text-[10.5px] leading-relaxed text-cyan-300">
                              <span className="text-cyan-500">❯</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. CONNECT TO THE AI COMMAND CENTER (Contact Form block) */}
              <div className="border border-cyan-500/20 rounded-lg bg-[#070b19]/90 p-5.5 select-none font-mono relative overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-400/30 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cyan-400/30 pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3 mb-5 text-[10px] tracking-widest text-cyan-500/60 uppercase">
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-cyan-400" /> CONNECT_COMMAND_CENTER // UPLINK</span>
                  <span>SECURE ACCESS VECTOR</span>
                </div>

                <form onSubmit={handleTransmitPacket} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[8px] text-cyan-500/50 uppercase block">COMMANDER CODE NAME (YOUR NAME)</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="E.g. Agent Carter"
                        className="w-full bg-[#040813] border border-cyan-500/25 rounded px-3 py-2 text-xs text-white placeholder-cyan-800/60 outline-none focus:border-cyan-400 transition-all font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] text-cyan-500/50 uppercase block">TRANSMISSION VECTOR (EMAIL ADDRESS)</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-[#040813] border border-cyan-500/25 rounded px-3 py-2 text-xs text-white placeholder-cyan-800/60 outline-none focus:border-cyan-400 transition-all font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] text-cyan-500/50 uppercase block">RAW TRANSMISSION CIPHER (YOUR MESSAGE)</label>
                    <textarea
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Draft system proposal, automation parameters, API details..."
                      className="w-full bg-[#040813] border border-cyan-500/25 rounded px-3 py-2 text-xs text-white placeholder-cyan-800/60 outline-none focus:border-cyan-400 transition-all font-mono resize-none leading-relaxed"
                      required
                    />
                  </div>

                  {conResult && (
                    <div className="p-3.5 rounded border border-teal-500/30 bg-teal-950/10 text-teal-400 font-bold text-xs tracking-wider">
                      {conResult}
                    </div>
                  )}

                  <button
                    id="transmit-secure-btn"
                    type="submit"
                    className="w-full py-3.5 px-6 font-semibold uppercase tracking-wider text-xs border border-cyan-400 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-400 hover:text-[#050816] rounded transition-all duration-300 shadow-[0_0_15px_rgba(0,255,209,0.1)] hover:shadow-[0_0_25px_rgba(0,255,209,0.3)] cursor-pointer text-center flex items-center justify-center gap-2"
                    disabled={isSecureTransmitting}
                  >
                    {isSecureTransmitting ? (
                      <>
                        <Activity className="w-4 h-4 animate-spin text-teal-400" />
                        TRANSMITTING SECTORS SIGNAL...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        TRANSMIT SECURE SIGNAL PACKET
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </motion.main>
        )}
      </AnimatePresence>

    </div>
  );
}
