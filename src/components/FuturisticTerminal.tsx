/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TermIcon, Play, ShieldAlert, Cpu } from "lucide-react";
import { SoundSystem } from "./SoundSystem";
import { PORTFOLIO_OWNER, PROJECTS_DATA, SKILLS_DATA, SERVICES_DATA } from "../data";

interface LogEntry {
  text: string;
  type: "input" | "system" | "success" | "error" | "accent";
}

export default function FuturisticTerminal() {
  const [history, setHistory] = useState<LogEntry[]>([
    { text: "KAZI_SHAKIL // OPERATING_SYSTEM_v2.5 INITIALIZING...", type: "system" },
    { text: "TYPE 'help' FOR A MATRIX OF SYSTEM DIAGNOSTIC COMMANDS.", type: "accent" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const commandText = inputValue.trim();
    if (!commandText) return;

    SoundSystem.playClick(1000, 0.04);
    
    const newLogs: LogEntry[] = [
      ...history,
      { text: `guest@shakil-os:~$ ${commandText}`, type: "input" }
    ];

    const args = commandText.toLowerCase().split(" ");
    const cmd = args[0];

    switch (cmd) {
      case "help":
        newLogs.push(
          { text: "Available Operational Commands:", type: "system" },
          { text: "  about       - back-story and color-science origins matrix", type: "accent" },
          { text: "  skills      - connected technology clusters and level matrix", type: "accent" },
          { text: "  projects    - list of core engineered systems on grid", type: "accent" },
          { text: "  project [id]- detailed architecture metrics of a project (e.g. 'project daktar-sab')", type: "accent" },
          { text: "  services    - architectural modules provided", type: "accent" },
          { text: "  contact     - secure access paths to the commander", type: "accent" },
          { text: "  health      - fetch core server performance and load indexes", type: "accent" },
          { text: "  clear       - flush terminal history streams", type: "accent" }
        );
        break;

      case "about":
        newLogs.push(
          { text: `BACKSTORY: ${PORTFOLIO_OWNER.bioHeadline}`, type: "system" },
          { text: "Kazi Shakil Ahammad stands at an extremely unique crossroads: industrial color science and master automation engineering. Entering printing manufacturing, he self-taught the advanced physics of color spectrum matching, hardware-software translation, and chemical mathematics. He scaled these structures single-handedly, then completed a self-taught transition into computer science, multi-agent AI automation, and high-throughput server pipelines.", type: "success" }
        );
        break;

      case "skills":
        newLogs.push({ text: "TECHNOLOGY ARCHITECTURE MATRIX:", type: "system" });
        SKILLS_DATA.forEach((s) => {
          newLogs.push({ text: `  [${s.category}] ${s.name} - ${s.level}% (linked: ${s.connectedNodes.join(", ")})`, type: "accent" });
        });
        break;

      case "projects":
        newLogs.push({ text: "CORE SYSTEMS ON CURRENT GRID:", type: "system" });
        PROJECTS_DATA.forEach((p) => {
          newLogs.push({ text: `  ID: ${p.id} -> ${p.title} (${p.status}) - ${p.description}`, type: "success" });
        });
        newLogs.push({ text: "Retrieve deep metrics by typing 'project [id]'", type: "accent" });
        break;

      case "project":
        const pid = args[1];
        if (!pid) {
          newLogs.push({ text: "ERR: Target project parameter empty. Use 'project social-craft-ai'", type: "error" });
        } else {
          const proj = PROJECTS_DATA.find((p) => p.id === pid || p.title.toLowerCase().includes(pid));
          if (!proj) {
            newLogs.push({ text: `ERR: Project '${pid}' not found on grid index.`, type: "error" });
          } else {
            newLogs.push(
              { text: `PROJECT STRUCTURE: ${proj.title.toUpperCase()} // ${proj.version}`, type: "system" },
              { text: `STATUS: ${proj.status} // ACCURACY EXPECTANCY SECURED`, type: "accent" },
              { text: `${proj.longDescription}`, type: "success" },
              { text: `Features: ${proj.features.join(" | ")}`, type: "accent" },
              { text: `Architecture: ${proj.systemArchitecture.join(" -> ")}`, type: "accent" }
            );
          }
        }
        break;

      case "services":
        newLogs.push({ text: "CORE STRUCTURAL SERVICES ACTIVATED:", type: "system" });
        SERVICES_DATA.forEach((s) => {
          newLogs.push(
            { text: `  - ${s.title}: ${s.description}`, type: "success" },
            { text: `    SLA Performance: ${s.systemLoadTime} | Reliability: ${s.reliabilityScore}`, type: "accent" }
          );
        });
        break;

      case "contact":
        newLogs.push(
          { text: "ESTABLISHING CONNECTIVITY UPLINK VECTOR...", type: "system" },
          { text: `  Commander Name:  ${PORTFOLIO_OWNER.name}`, type: "success" },
          { text: `  Secure Direct :  ${PORTFOLIO_OWNER.email}`, type: "success" },
          { text: `  Location Base :  ${PORTFOLIO_OWNER.location}`, type: "success" }
        );
        break;

      case "health":
        newLogs.push({ text: "PINGING CORE SERVER ENVIRONMENT MODULE...", type: "system" });
        try {
          const res = await fetch("/api/health");
          if (!res.ok) throw new Error("Connection degraded.");
          const data = await res.json();
          newLogs.push(
            { text: `STATUS: ${data.status} [ESTABLISHED]`, type: "success" },
            { text: `Uptime Indexed: ${Math.floor(data.uptime)} seconds`, type: "accent" },
            { text: `Server CPU Load: ${data.systemPerformance.cpuLoad}`, type: "accent" },
            { text: `System RAM allocation: ${data.systemPerformance.ramAllocated}`, type: "accent" },
            { text: `Network Latency: ${data.systemPerformance.latency}`, type: "accent" },
            { text: `Loaded Middleware: ${data.modulesLoaded.join(", ")}`, type: "success" }
          );
        } catch (err: any) {
          newLogs.push(
            { text: "ALERT: Express Node server inaccessible.", type: "error" },
            { text: "Fallback: Running simulated port telemetry.", type: "accent" },
            { text: "  Load: 12.4% | Thread Count: 1 | Env: Sandboxed Dev Node", type: "accent" }
          );
        }
        break;

      case "clear":
        setHistory([]);
        setInputValue("");
        return;

      default:
        newLogs.push({ text: `Command not recognized: '${cmd}'. Type 'help' for grid commands matrix.`, type: "error" });
        break;
    }

    setHistory(newLogs);
    setInputValue("");
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      onClick={handleFocus}
      className="relative flex flex-col h-[280px] border border-cyan-500/20 bg-[#040815]/95 rounded-lg overflow-hidden font-mono text-cyan-300 shadow-[0_0_20px_rgba(0,255,209,0.05)] cursor-text"
    >
      {/* HUD Bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/15 bg-slate-950/80 px-4 py-2 text-[10px] tracking-wider text-cyan-500/70 select-none">
        <div className="flex items-center gap-2">
          <TermIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>KAZI-CONSOLE // SYSTEM_SHELL</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold text-teal-400">
          <Cpu className="w-3 h-3 animate-spin" /> CPU ACTIVE // GUEST_SESSION
        </div>
      </div>

      {/* Terminal History Logs */}
      <div 
        ref={containerRef}
        className="flex-1 p-4 overflow-y-auto space-y-1 text-xs select-text overflow-x-hidden scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent"
      >
        {history.map((h, i) => (
          <div 
            key={i} 
            className={`whitespace-pre-wrap leading-relaxed ${
              h.type === "input" ? "text-cyan-100" :
              h.type === "system" ? "text-cyan-400 font-bold tracking-wide" :
              h.type === "success" ? "text-teal-400" :
              h.type === "error" ? "text-red-400 font-bold" : "text-cyan-500/80"
            }`}
          >
            {h.text}
          </div>
        ))}
      </div>

      {/* Input Prompt row */}
      <form onSubmit={handleCommandSubmit} className="flex items-center border-t border-cyan-500/15 bg-slate-950/60 p-2.5 select-none">
        <span className="text-teal-400 text-xs font-bold mr-2">guest@shakil-os:~$</span>
        <input 
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="type 'help' or explore..."
          className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-cyan-800/60 font-mono caret-cyan-400 p-0"
          autoComplete="off"
          spellCheck="false"
        />
        <button 
          type="submit"
          className="p-1 rounded text-cyan-400 hover:text-white"
        >
          <Play className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}
