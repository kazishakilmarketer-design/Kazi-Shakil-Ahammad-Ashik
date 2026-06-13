/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Maximize2, Zap, BarChart2, ShieldAlert, Layers, ExternalLink, X, Activity, Server, Database } from "lucide-react";
import { SoundSystem } from "./SoundSystem";
import { PROJECTS_DATA } from "../data";
import { Project } from "../types";

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredPid, setHoveredPid] = useState<string | null>(null);

  const handleOpenProject = (p: Project) => {
    SoundSystem.playPing(1300, 0.4);
    setSelectedProject(p);
  };

  const handleCloseProject = () => {
    SoundSystem.playClick(600, 0.08);
    setSelectedProject(null);
  };

  return (
    <div className="w-full select-none font-mono">
      {/* Title block */}
      <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3 mb-6 text-[10px] tracking-widest text-cyan-500/60 uppercase">
        <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-cyan-400" /> SYSTEMS_GRID // SECTOR_B3</span>
        <span>PRODUCT LAUNCH COMPENDIUM</span>
      </div>

      {/* Grid items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS_DATA.map((p) => {
          const isHovered = hoveredPid === p.id;
          return (
            <div
              key={p.id}
              onClick={() => handleOpenProject(p)}
              onMouseEnter={() => { SoundSystem.playClick(1300, 0.015); setHoveredPid(p.id); }}
              onMouseLeave={() => setHoveredPid(null)}
              className="relative rounded-lg border border-cyan-500/10 bg-[#070c1d]/90 p-5.5 flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1.5 group select-none shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(0,255,209,0.06)]"
            >
              {/* Glowing decorative corner hooks */}
              <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-cyan-500/12 group-hover:border-cyan-400/50 transition-all pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-cyan-500/12 group-hover:border-cyan-400/50 transition-all pointer-events-none" />

              <div>
                {/* Meta data row */}
                <div className="flex items-center justify-between text-[9px] text-cyan-500/50 uppercase tracking-wider mb-4 font-mono leading-none">
                  <span>{p.version}</span>
                  <span className="flex items-center gap-1.5 text-teal-400">
                    <Zap className="w-3 h-3 animate-pulse" /> {p.status}
                  </span>
                </div>

                {/* Major heading */}
                <h3 className="text-sm font-bold text-cyan-200 mt-1 font-sans uppercase tracking-tight leading-none group-hover:text-cyan-300 duration-150">
                  {p.title}
                </h3>

                {/* Dynamic mini performance charts */}
                <div className="h-6 w-20 flex items-end gap-0.5 mt-2.5 mb-3.5 select-none opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1.5 bg-cyan-500/30 rounded-t h-[40%] animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1.5 bg-cyan-500/50 rounded-t h-[70%] animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1.5 bg-cyan-400 rounded-t h-[55%] animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 bg-teal-400 rounded-t h-[90%] animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>

                {/* Short summaries */}
                <p className="text-[11px] leading-relaxed text-cyan-400/70 py-1 font-mono">
                  {p.description}
                </p>
              </div>

              {/* Tags panel & Launch button */}
              <div className="mt-5 border-t border-cyan-500/10 pt-3.5 flex items-center justify-between">
                <span className="text-[8px] text-cyan-600 uppercase font-bold tracking-widest">
                  {p.tags[0]} // {p.tags[1]}
                </span>
                
                <span className="text-[9px] text-cyan-400 font-semibold group-hover:text-white flex items-center gap-1 transition-colors uppercase">
                  LAUNCH PRESENTATION <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Futuristic Cinematic Dashboard Popup Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#04060e]/95 backdrop-blur-md overflow-y-auto select-none font-mono">
            
            {/* Absolute laser grid scanning aura */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,191,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute pointer-events-none inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[size:100%_4px]" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-4xl rounded-xl border border-cyan-400/30 bg-[#070b1c]/95 p-6 md:p-8 shadow-[0_0_80px_rgba(0,255,209,0.25)] backdrop-blur-2xl overflow-hidden flex flex-col gap-6"
            >
              {/* Accent bracket corners typically HUD OS style */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

              {/* Modal HUD Nav bar */}
              <div className="flex items-center justify-between border-b border-cyan-500/15 pb-4 text-[10px] text-cyan-500 select-none">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>LAUNCH_ORCHESTRATOR // {selectedProject.id.toUpperCase()}</span>
                </div>
                <button
                  id="close-presentation"
                  onClick={handleCloseProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 hover:bg-red-950/20 duration-150 cursor-pointer text-[10px] tracking-wider font-bold"
                >
                  <X className="w-3.5 h-3.5" /> SECURE_QUIT
                </button>
              </div>

              {/* Main Modal Layout splits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Core project detail descriptions */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-cyan-400/60 uppercase font-semibold">Security Level: Level-05 Authorized System</span>
                    <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white uppercase leading-none">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <p className="text-xs leading-relaxed text-cyan-200">
                    {selectedProject.longDescription}
                  </p>

                  {/* Featured parameters list */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-teal-400 font-bold tracking-wider block">LAUNCH SYSTEM SPECIFICATIONS:</span>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-cyan-300">
                          <span className="text-cyan-400 font-bold shrink-0 mt-0.5">❯</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Operational Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 select-none">
                    {selectedProject.tags.map((tg) => (
                      <span key={tg} className="px-2.5 py-1 rounded bg-[#0b1731] border border-cyan-500/15 text-[9px] text-cyan-400 uppercase font-semibold">
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Technical diagnostics panel */}
                <div className="lg:col-span-5 space-y-5">
                  
                  {/* System visual simulation loop (interactive blueprint style) */}
                  <div className="border border-cyan-500/15 bg-slate-950/60 rounded p-4 flex flex-col gap-3 relative select-none">
                    <div className="text-[9px] text-cyan-500/50 uppercase tracking-widest border-b border-cyan-500/10 pb-1.5 flex justify-between">
                      <span>SYSTEM ARCHITECTURE DIAGRAM:</span>
                      <span className="text-teal-400">ACTIVE</span>
                    </div>

                    {/* Nodes flow vectors drawing */}
                    <div className="flex flex-col gap-2 pt-1 font-mono text-[9px] tracking-wide select-none">
                      {selectedProject.systemArchitecture.map((arch, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-300">
                            {index === 0 ? <Activity className="w-3 h-3" /> : index === selectedProject.systemArchitecture.length - 1 ? <Database className="w-3 h-3" /> : <Server className="w-3 h-3" />}
                          </div>
                          <span className="text-cyan-100 font-semibold">{arch}</span>
                          {index < selectedProject.systemArchitecture.length - 1 && (
                            <span className="text-[7px] text-cyan-500/40 animate-pulse ml-auto">UPLINK_FLOW ──❯</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key performance metrics widget */}
                  <div className="border border-cyan-500/15 bg-[#050915] rounded p-4 flex flex-col gap-3Select-none">
                    <div className="text-[9px] text-cyan-500/50 uppercase tracking-widest border-b border-cyan-500/10 pb-1.5">
                      KEY SECURED OUTCOMES:
                    </div>

                    <div className="grid grid-cols-3 gap-3.5 pt-1 text-center">
                      {selectedProject.metrics.map((met, idx) => (
                        <div key={idx} className="flex flex-col gap-1 text-left font-mono">
                          <div className="text-[8px] text-cyan-500/55 uppercase leading-none truncate">{met.label}</div>
                          <div className="text-xs sm:text-sm font-bold text-teal-400 leading-none mt-1 font-mono">{met.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom warning status label typical of OS Command center */}
              <div className="border-t border-cyan-500/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-[9px] text-cyan-500/40 tracking-wider font-mono gap-3 select-none">
                <span>SECURITY INTEL ACCREDITATION: SEC-LEVEL-5 AD-05 ADMIN</span>
                <span className="flex items-center gap-1.5 text-teal-400/80"><Cpu className="w-3.5 h-3.5" /> RE-BALANCED INTEGRATION SYNCED</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
