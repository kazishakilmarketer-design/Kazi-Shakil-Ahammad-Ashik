/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Zap, Activity, ShieldAlert, Sparkles, Layers, Terminal, ChevronRight, CheckCircle2 } from "lucide-react";
import { SoundSystem } from "./SoundSystem";
import { PORTFOLIO_OWNER } from "../data";
import NeuralNetwork3D from "./NeuralNetwork3D";
import ProfileHologram from "./ProfileHologram";

export default function HeroSection() {
  const [telemetryIndex, setTelemetryIndex] = useState({
    processingLoad: "24.5%",
    bandwidthRate: "1.42 GB/s",
    signalStrength: "99.8%",
    gridIndex: "KSA-OS"
  });

  const [simulationActive, setSimulationActive] = useState(true);

  // Rhythmic background updates for high-end cinematic telemetry realism
  useEffect(() => {
    const streamInterval = setInterval(() => {
      setTelemetryIndex({
        processingLoad: `${(20 + Math.sin(Date.now() / 3000) * 8).toFixed(1)}%`,
        bandwidthRate: `${(1.1 + Math.random() * 0.5).toFixed(2)} GB/s`,
        signalStrength: `${(98.5 + Math.random() * 1.4).toFixed(1)}%`,
        gridIndex: `KSA-OS-NODE_${Math.floor(100 + Math.random() * 899)}`
      });
    }, 1500);

    return () => clearInterval(streamInterval);
  }, []);

  const handleLaunchTelemetry = () => {
    SoundSystem.playPing(1100, 0.45);
    setSimulationActive(prev => !prev);
  };

  return (
    <div className="relative overflow-hidden border border-cyan-500/15 bg-slate-950/40 rounded-xl p-6 md:p-8 lg:p-10 min-h-[460px] lg:min-h-[520px] flex flex-col justify-between shadow-2xl">
      {/* Immersive 3D WebGL Neural Network Background */}
      <NeuralNetwork3D />

      {/* Futuristic Cybernetic Framing Brackets typical of high-end HUDs */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

      {/* Top Telemetry overlay */}
      <div className="relative z-10 flex items-center justify-between text-[8px] font-mono tracking-widest text-cyan-500/60 uppercase border-b border-cyan-500/10 pb-3 mb-4 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>HERO_SYSTEM_LOBBY // INITIALIZED</span>
        </div>
        <div className="flex gap-4">
          <span>LOAD: <span className="text-teal-400 font-bold">{telemetryIndex.processingLoad}</span></span>
          <span className="hidden sm:inline">BAND: <span className="text-teal-400 font-bold">{telemetryIndex.bandwidthRate}</span></span>
          <span>NET_SIG: <span className="text-cyan-300 font-bold">{telemetryIndex.signalStrength}</span></span>
        </div>
      </div>

      {/* Main content display with two-column split */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center my-auto">
        <div className="md:col-span-8 lg:col-span-9 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="text-[10px] bg-cyan-950/90 border border-teal-500/40 text-teal-300 px-3 py-1.5 rounded uppercase tracking-widest font-semibold shadow-[0_0_15px_rgba(0,255,209,0.1)]">
              AI SYSTEMS ARCHITECT CORE
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-sans tracking-tight text-white uppercase leading-none drop-shadow-[0_2px_10px_rgba(3,6,15,0.95)]">
            DESIGNING PREDICTIVE <br className="hidden md:inline"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200 drop-shadow-[0_0_15px_rgba(0,255,209,0.3)] font-mono">
              DIGITAL AUTOMATIONS
            </span>
          </h2>

          <p className="text-[11px] sm:text-xs leading-relaxed text-cyan-200 font-mono bg-slate-950/80 border border-cyan-500/10 rounded px-4 py-3.5 shadow-md max-w-2xl select-text">
            {PORTFOLIO_OWNER.tagline}
          </p>
        </div>

        {/* Column representing Kazi is a large floating ProfileHologram */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative flex flex-col items-center"
          >
            {/* Soft decorative background circles resembling holographic scanners */}
            <div className="absolute w-44 h-44 md:w-48 md:h-48 rounded-full border border-teal-400/[0.04] animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-52 h-52 md:w-56 md:h-56 rounded-full border border-cyan-500/[0.02] animate-[spin_60s_linear_infinite]" />
            
            <ProfileHologram size="lg" />
          </motion.div>
        </div>
      </div>

      {/* Bottom telemetry indicators & Interactive action button area */}
      <div className="relative z-10 border-t border-cyan-500/10 pt-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono select-none">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
          </div>
          <span className="text-[9px] text-cyan-500/60 uppercase">
            COGNITIVE INDEX: <span className="text-cyan-300 font-semibold">{telemetryIndex.gridIndex}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Subtle diagnostics toggle button */}
          <button
            id="toggle-simulator-mesh"
            onClick={handleLaunchTelemetry}
            className={`py-1.5 px-3 rounded text-[9px] uppercase tracking-wider font-bold border transition-colors ${
              simulationActive 
                ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(0,255,209,0.15)]" 
                : "border-cyan-500/20 text-cyan-500 hover:border-cyan-400 hover:text-cyan-300"
            }`}
          >
            {simulationActive ? "MUTE SCANNER SIGNALS" : "RUN SIMULATOR SIGNAL"}
          </button>

          <span className="text-[8px] text-cyan-600/40">SEC_LEVEL_5</span>
        </div>
      </div>
    </div>
  );
}
