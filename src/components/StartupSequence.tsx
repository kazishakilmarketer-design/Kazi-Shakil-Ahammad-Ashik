/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Shield, Cpu, Activity, Wifi, Sparkles } from "lucide-react";
import { SoundSystem } from "./SoundSystem";

interface StartupSequenceProps {
  onComplete: (soundEnabled: boolean) => void;
}

export default function StartupSequence({ onComplete }: StartupSequenceProps) {
  const [loadingStep, setLoadingStep] = useState(0);
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [decryptionPercent, setDecryptionPercent] = useState(0);

  const logs = [
    "LOADING SECURE KERNEL ADAPTER...",
    "ISOLATING SANDBOX CONTAINERS [PORT 3000]...",
    "DECRYPTING KAZI_SHAKIL_PROFILE.BIN [SUCCESS]",
    "MAPPING NEURAL SKILL CONNECTIVITY GRID...",
    "CONFIGURING EMULATED AUDIO OSCILLATORS...",
    "SYNCHRONIZING AI GROUNDING COMMAND CENTER...",
    "UPLINK VERIFIED: USER CLEARANCE AD-05 DEFINED."
  ];

  useEffect(() => {
    // Step-by-step logs output
    if (loadingStep < logs.length) {
      const timer = setTimeout(() => {
        setDiagnostics((prev) => [...prev, `[SYS] ${logs[loadingStep]}`]);
        setLoadingStep((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [loadingStep]);

  useEffect(() => {
    if (isReady) return;
    const interval = setInterval(() => {
      setDecryptionPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isReady]);

  const handleBoot = (enableSound: boolean) => {
    if (enableSound) {
      SoundSystem.toggle(true);
    }
    const pingFreq = 800;
    SoundSystem.playClick(pingFreq, 0.35);
    onComplete(enableSound);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816] font-mono text-cyan-400 overflow-hidden select-none">
      {/* Absolute grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,209,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,209,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Scanline flickering accent */}
      <div className="absolute pointer-events-none inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

      <div className="relative w-full max-w-2xl px-6 flex flex-col items-center">
        {/* Holographic Logo Spinner */}
        <div className="relative mb-12 flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full border border-cyan-500/20 animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-24 h-24 rounded-full border border-cyan-400/40 border-t-transparent border-b-transparent animate-[spin_4s_linear_infinite]" />
          <div className="absolute w-20 h-20 rounded-full border-2 border-dashed border-teal-300/30 animate-[spin_20s_linear_infinite]" />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-16 h-16 rounded-full bg-cyan-900/40 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.3)] backdrop-blur-md"
          >
            <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
          </motion.div>
        </div>

        {/* Framing brackets typical of cyberpunk HUD */}
        <div className="w-full bg-slate-950/80 border border-cyan-500/30 rounded-lg p-6 relative shadow-[0_0_40px_rgba(0,255,209,0.1)] backdrop-blur-xl">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
          
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4 text-xs text-cyan-500/70">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>KAZI_SHAKIL // BOOT_LOADER_v2.5</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SECURE</span>
              <span className="flex items-center gap-1"><Wifi className="w-3 h-3 text-teal-400" /> online</span>
            </div>
          </div>

          {/* Scrolling log text terminal style */}
          <div className="space-y-1.5 min-h-[140px] text-xs font-mono">
            {diagnostics.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 text-cyan-300"
              >
                <span className="text-cyan-500/50">❯</span>
                <span>{log}</span>
              </motion.div>
            ))}
            
            {!isReady && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-teal-400/60 font-bold">DECRYPTING MEMORY GRID:</span>
                <span className="text-teal-400 font-bold">{Math.min(decryptionPercent, 100)}%</span>
                <div className="flex-1 max-w-[200px] h-1.5 bg-slate-900 border border-cyan-500/20 rounded overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 shadow-[0_0_8px_cyan]" 
                    style={{ width: `${Math.min(decryptionPercent, 100)}%` }} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sub-text stats */}
        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center text-[10px] text-cyan-500/50 uppercase tracking-widest font-mono">
          <div className="flex items-center gap-1"><Activity className="w-3 h-3" /> CPU: STABLE (18.2%)</div>
          <div>•</div>
          <div>MEM: DYNAMIC</div>
          <div>•</div>
          <div className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-teal-400" /> GPU: FRAME_PERFECT</div>
        </div>

        {/* Boot Trigger Interaction Area */}
        <AnimatePresence>
          {isReady && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mt-12 flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md"
            >
              <button
                id="boot-btn-audio"
                onClick={() => handleBoot(true)}
                className="flex-1 py-4.5 px-6 font-semibold uppercase tracking-wider text-xs border-2 border-cyan-400 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-400 hover:text-[#050816] rounded-lg shadow-[0_0_25px_rgba(0,255,209,0.2)] hover:shadow-[0_0_40px_rgba(0,255,209,0.5)] cursor-pointer text-center duration-300 relative group overflow-hidden"
              >
                <span className="absolute inset-x-0 h-full w-4 bg-white/20 translate-y-full group-hover:translate-y-0 skew-x-12 duration-500" />
                <span className="flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4 animate-bounce" />
                  UPLINK + CONTEXT AUDIO
                </span>
              </button>

              <button
                id="boot-btn-silent"
                onClick={() => handleBoot(false)}
                className="flex-1 py-4.5 px-6 font-semibold uppercase tracking-wider text-xs border border-cyan-500/40 text-cyan-500 hover:border-cyan-400 hover:text-cyan-300 rounded-lg cursor-pointer text-center duration-300 hover:bg-cyan-950/20"
              >
                UPLINK SILENT MODE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Subtle footer */}
        <div className="absolute bottom-6 text-[9px] text-cyan-600/40 tracking-wider">
          KAZI SHAKIL AHAMMAD © 2026 // ALL RIGHTS SECURED
        </div>
      </div>
    </div>
  );
}
