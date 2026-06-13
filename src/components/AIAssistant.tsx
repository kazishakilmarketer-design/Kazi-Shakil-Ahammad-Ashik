/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Network, HelpCircle, Activity, Sparkles, Volume2, Shield } from "lucide-react";
import { SoundSystem } from "./SoundSystem";
import { Message } from "../types";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "UPLINK SECURED // System online. Welcome to Kazi Shakil Ahammad's command hub. I am his Digital Twin AI Copilot. Ask me about Kazi's specialties, projects (Social Craft, Daktar Sab), or automated operation architecture.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sineAmplitude, setSineAmplitude] = useState(5); // Animated wave amplitude representing voice reactive pulse

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Periodic breathing pulse for the orb (voice-reactive style animation simulator)
  useEffect(() => {
    let animId: number;
    let tick = 0;
    const animateWave = () => {
      tick++;
      // Sine wave osc depending on whether system is loading/active
      const amp = isLoading 
        ? 15 + Math.sin(tick * 0.15) * 8 
        : 6 + Math.sin(tick * 0.05) * 3;
      setSineAmplitude(amp);
      animId = requestAnimationFrame(animateWave);
    };
    animateWave();
    return () => cancelAnimationFrame(animId);
  }, [isLoading]);

  // Scroll to bottom on updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleToggle = () => {
    SoundSystem.playPing(1100, 0.4);
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || promptValue.trim();
    if (!textToSend || isLoading) return;

    SoundSystem.playClick(1200, 0.04);
    
    const userMsg: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setPromptValue("");
    setIsLoading(true);

    try {
      const payloadMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!res.ok) throw new Error("Connection failed.");

      const data = await res.json();
      
      SoundSystem.playPing(950, 0.35);
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "ALERT: Communication vector to cognitive system interrupted. Re-synchronizing link...",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      SoundSystem.playClick(400, 0.25);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Who is Kazi?",
    "Tell me about Social Craft AI",
    "What is his color science origin?",
    "Direct contact details"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none font-mono">
      <AnimatePresence>
        
        {/* Floating AI Panel (Expanded State) */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[380px] h-[520px] rounded-lg border border-cyan-400/30 bg-[#060b1b]/98 shadow-[0_0_50px_rgba(0,255,209,0.15)] flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Top HUD Frame */}
            <div className="flex items-center justify-between border-b border-cyan-500/15 bg-slate-950/80 px-4 py-3 text-[10px] tracking-wider text-cyan-400 font-semibold select-none">
              <div className="flex items-center gap-2">
                {/* Glowing status circle pulse */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                </span>
                <span>KAZI_COGNITIVE_TWIN // v2.5</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-teal-400/50 flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> VOICE READY</span>
                <button 
                  onClick={handleToggle}
                  className="p-1 rounded text-cyan-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body Scroll */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 select-text scrollbar-thin scrollbar-thumb-cyan-950 scrollbar-track-transparent">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  {/* Speaker tag label */}
                  <div className="text-[8px] font-mono text-cyan-500/50 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    {m.role === "user" ? "GUEST_UPLINK" : "TWIN_ADAPTER"}
                    <span>•</span>
                    <span>{m.timestamp}</span>
                  </div>

                  {/* Message bubble speech panel */}
                  <div className={`p-3 rounded-lg text-xs leading-relaxed max-w-[85%] border whitespace-pre-wrap ${
                    m.role === "user" 
                      ? "bg-cyan-500/10 border-cyan-400/30 text-white" 
                      : m.role === "system"
                      ? "bg-red-500/5 border-red-500/20 text-red-400 font-semibold"
                      : "bg-[#04091a] border-cyan-500/10 text-cyan-200"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="text-[8px] font-mono text-cyan-500/50 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    TWIN_ADAPTER • DIGESTING_COGNITION
                  </div>
                  <div className="p-3.5 rounded-lg text-xs bg-[#04091a]/80 border border-cyan-500/10 text-cyan-400 flex items-center gap-3">
                    {/* Pulsing circular core */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce1" />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce2" />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce3" />
                    </div>
                    <span>Synthesizing structural matrix response...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            {messages.length < 3 && !isLoading && (
              <div className="p-3 bg-slate-950/25 border-t border-cyan-500/10 flex flex-wrap gap-1.5 select-none">
                {quickPrompts.map((p) => (
                  <button
                    id={`quick-prompt-${p.replace(/\s+/g, '-').toLowerCase()}`}
                    key={p}
                    onClick={() => handleSendMessage(undefined, p)}
                    className="px-2.5 py-1 rounded bg-[#071126] border border-cyan-500/20 text-[9.5px] text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-300 transition-colors cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-cyan-500/15 bg-slate-950/80 flex items-center gap-2 select-none">
              <input
                type="text"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                placeholder="Secure message to command module..."
                className="flex-1 bg-[#040813] border border-cyan-500/25 rounded px-3 py-2 text-xs text-white placeholder-cyan-800/60 outline-none focus:border-cyan-400 transition-all font-mono"
                disabled={isLoading}
              />
              <button
                id="send-ai-msg"
                type="submit"
                className="p-2 bg-cyan-900/40 hover:bg-cyan-500/20 text-cyan-400 rounded hover:text-white transition-all border border-cyan-500/30 font-semibold flex items-center justify-center cursor-pointer disabled:opacity-50"
                disabled={isLoading}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing AI Floating Orb Launcher (Voice Frequency Simulator) */}
      <motion.button
        id="toggle-ai-orb"
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-slate-950 border border-cyan-400/60 flex items-center justify-center cursor-pointer relative shadow-[0_0_30px_rgba(0,217,255,0.25)] select-none"
      >
        {/* Glowing holographic sphere rings */}
        <span 
          className="absolute inset-0 rounded-full border border-dashed border-teal-400/40 animate-[spin_10s_linear_infinite]" 
          style={{ transform: `scale(${1.2 + sineAmplitude * 0.05})` }}
        />
        <span 
          className="absolute inset-0 rounded-full bg-cyan-400/5 animate-pulse" 
          style={{ transform: `scale(${1.0 + sineAmplitude * 0.04})` }}
        />

        {/* Central audio wave visualizer rendering on the orb */}
        <div className="absolute inset-0 flex items-center justify-center gap-[3px]">
          <div className="w-0.5 bg-cyan-400 rounded" style={{ height: `${8 + sineAmplitude}px` }} />
          <div className="w-0.5 bg-cyan-400 rounded" style={{ height: `${14 + sineAmplitude * 1.5}px` }} />
          <div className="w-0.5 bg-cyan-400 rounded" style={{ height: `${8 + sineAmplitude}px` }} />
        </div>

        {/* Micro logo element overlay */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-teal-400 border border-slate-950 rounded-full flex items-center justify-center text-[8px] font-bold text-slate-950 animate-pulse">
          twin
        </div>
      </motion.button>
    </div>
  );
}
