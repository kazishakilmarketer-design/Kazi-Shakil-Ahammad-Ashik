/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Network, HelpCircle, Activity, ShieldCheck, Database, Link as LinIcon } from "lucide-react";
import { SoundSystem } from "./SoundSystem";
import { SKILLS_DATA } from "../data";
import { Skill } from "../types";

export default function NetworkMap() {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS_DATA[0]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "AI & Automation",
    "Full-Stack Engineering",
    "SaaS Architecture",
    "Digital Marketing Systems",
    "Creative Technology",
    "Industrial Systems Engineering"
  ];

  const handleNodeClick = (skill: Skill) => {
    SoundSystem.playClick(1100, 0.05);
    setSelectedSkill(skill);
  };

  const filteredSkills = activeCategory === "All" 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(s => s.category === activeCategory);

  return (
    <div className="border border-cyan-500/20 rounded-lg bg-[#070b19]/80 backdrop-blur-xl p-5 flex flex-col h-full overflow-hidden select-none">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3 mb-5 text-[10px] tracking-widest font-mono text-cyan-500/60 uppercase">
        <span className="flex items-center gap-1.5"><Network className="w-4 h-4 text-cyan-400 animate-pulse" /> NEURAL_SKILLS_ECOSYSTEM // PLOT</span>
        <span className="text-[9px] bg-cyan-950/40 text-teal-400 border border-teal-500/30 px-1 py-0.5 rounded">
          COGNITIVE RECON
        </span>
      </div>

      {/* Categories Horizontal filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-cyan-950 border-b border-cyan-500/5 select-none shrink-0">
        {categories.map((cat) => (
          <button
            id={`filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            key={cat}
            onClick={() => { SoundSystem.playClick(800, 0.04); setActiveCategory(cat); }}
            className={`px-3 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase whitespace-nowrap transition-all border duration-250 cursor-pointer ${
              activeCategory === cat 
                ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,191,255,0.2)]" 
                : "border-cyan-500/10 hover:border-cyan-500/30 text-cyan-600 hover:text-cyan-400 bg-[#050812]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Graph Grid Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5 min-h-0">
        
        {/* Animated Coordinate Skill Clusters */}
        <div ref={containerRef} className="lg:col-span-7 border border-cyan-500/10 bg-slate-950/40 rounded p-4 relative min-h-[280px] lg:h-auto flex items-center justify-center overflow-hidden">
          
          {/* Cyberpunk Grid Crosshair markings */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,209,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,209,0.015)_1px,transparent_1px)] bg-[size:16px_16px]" />
          <div className="absolute w-2 h-2 border-t border-l border-cyan-500/30 top-3 left-3" />
          <div className="absolute w-2 h-2 border-t border-r border-cyan-500/30 top-3 right-3" />
          <div className="absolute w-2 h-2 border-b border-l border-cyan-500/30 bottom-3 left-3" />
          <div className="absolute w-2 h-2 border-b border-r border-cyan-500/30 bottom-3 right-3" />

          {/* Central Orbit System for Core Nodes */}
          <div className="absolute w-44 h-44 rounded-full border border-dashed border-cyan-500/10 animate-[spin_40s_linear_infinite]" />
          <div className="absolute w-64 h-64 rounded-full border border-dashed border-cyan-500/5 animate-[spin_90s_linear_infinite_reverse]" />

          {/* Connected Skill nodes */}
          <div className="relative w-full h-full max-w-[340px] max-h-[340px] flex items-center justify-center aspect-square">
            
            {/* SVG Connecting Net */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full">
              {filteredSkills.map((s, idx) => {
                const angle1 = (idx / filteredSkills.length) * Math.PI * 2;
                const x1 = 50 + Math.cos(angle1) * 36;
                const y1 = 50 + Math.sin(angle1) * 36;

                // Draw vectors to connected skills
                return s.connectedNodes.map((connName, cIdx) => {
                  const targetSkillIdx = filteredSkills.findIndex(f => f.name === connName);
                  if (targetSkillIdx === -1) return null;

                  const angle2 = (targetSkillIdx / filteredSkills.length) * Math.PI * 2;
                  const x2 = 50 + Math.cos(angle2) * 36;
                  const y2 = 50 + Math.sin(angle2) * 36;

                  const isHighlit = hoveredNode === s.name || hoveredNode === connName || selectedSkill.name === s.name;

                  return (
                    <line
                      key={`${s.name}-${connName}-${cIdx}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke={isHighlit ? "rgba(0, 255, 209, 0.4)" : "rgba(0, 217, 255, 0.08)"}
                      strokeWidth={isHighlit ? 1.5 : 0.8}
                      className="transition-all duration-300"
                    />
                  );
                });
              })}
            </svg>

            {/* Render Node Dots */}
            {filteredSkills.map((s, idx) => {
              const angle = (idx / filteredSkills.length) * Math.PI * 2;
              const xPos = 50 + Math.cos(angle) * 36;
              const yPos = 50 + Math.sin(angle) * 36;

              const isSelected = selectedSkill.name === s.name;
              const isHovered = hoveredNode === s.name;

              return (
                <div
                  key={s.name}
                  onClick={() => handleNodeClick(s)}
                  onMouseEnter={() => setHoveredNode(s.name)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 select-none group"
                  style={{
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    zIndex: isSelected ? 20 : 10
                  }}
                >
                  {/* Glowing Node Point */}
                  <div className="relative flex items-center justify-center">
                    {/* Ring highlight */}
                    <AnimatePresence>
                      {(isSelected || isHovered) && (
                        <motion.div
                          layoutId="activeGlowRing"
                          className="absolute w-8 h-8 rounded-full border border-cyan-400 bg-cyan-400/5 shadow-[0_0_15px_rgba(0,255,209,0.4)]"
                          transition={{ duration: 0.25, type: "spring" }}
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Tiny pulsing indicator dot */}
                    <div className={`w-3.5 h-3.5 rounded-full border ${
                      isSelected 
                        ? "bg-cyan-400 border-white shadow-[0_0_10px_cyan]" 
                        : "bg-slate-900 border-cyan-500/60 group-hover:bg-cyan-900 group-hover:border-cyan-300 duration-200"
                    }`} />

                    {/* Skill abbreviated text */}
                    <div className={`absolute top-5 whitespace-nowrap text-[8px] font-mono tracking-wider ${
                      isSelected ? "text-cyan-300 font-bold" : "text-cyan-500/50 group-hover:text-cyan-300 duration-150"
                    }`}>
                      {s.name.substring(0, 15)}{s.name.length > 15 ? ".." : ""}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Central HUD diagnostic coordinate point */}
            <div className="w-10 h-10 border border-cyan-500/10 rounded-full flex items-center justify-center text-[7px] text-cyan-500/35 font-mono select-none">
              N_CORE
            </div>

          </div>

        </div>

        {/* Selected Skill Telemetry Summary Box */}
        <div className="lg:col-span-5 flex flex-col justify-between border border-cyan-500/10 bg-slate-950/60 rounded p-4.5 font-mono">
          
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-[10px] text-cyan-500/60 tracking-wider">
              <Database className="w-3.5 h-3.5" /> RECON_CORE // TELEMETRY
            </div>

            <div className="space-y-1">
              <div className="text-[9px] text-cyan-500/40 uppercase">Skill Node Label:</div>
              <div className="text-sm text-cyan-100 font-bold font-sans tracking-tight uppercase leading-none">
                {selectedSkill.name}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[9px] text-cyan-500/40 uppercase">Cluster Domain:</div>
              <div className="text-xs text-teal-400 font-semibold uppercase">
                {selectedSkill.category}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[9px] text-cyan-500/40 uppercase">Cognitive Precision:</div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-300 font-bold text-xs">{selectedSkill.level}% LOADED</span>
                <div className="flex-1 h-2 bg-slate-900 border border-cyan-500/15 rounded overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 shadow-[0_0_8px_cyan]" 
                    style={{ width: `${selectedSkill.level}%` }} 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="text-[9px] text-cyan-500/40 uppercase">Operational Backing:</div>
              <p className="text-[10.5px] leading-relaxed text-cyan-300/80">
                {selectedSkill.notes}
              </p>
            </div>
          </div>

          <div className="border-t border-cyan-500/10 pt-3 mt-4 space-y-1 text-[9px]">
            <div className="flex items-center gap-1 text-cyan-500/50">
              <LinIcon className="w-3 h-3" /> Linked Tech Elements:
            </div>
            <div className="text-cyan-400 uppercase font-semibold">
              {selectedSkill.connectedNodes.join(" // ")}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
