/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Shield, Sparkles, Upload, Eye, Cpu, Activity, Info } from "lucide-react";
import { SoundSystem } from "./SoundSystem";

interface ProfileHologramProps {
  size?: "sm" | "lg";
}

export default function ProfileHologram({ size = "sm" }: ProfileHologramProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scannerActive, setScannerActive] = useState(true);
  const [shimmerTime, setShimmerTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Secure Authorization states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Sync with localStorage & backend permanent storage
  useEffect(() => {
    const fetchPermanentAvatar = async () => {
      try {
        const res = await fetch("/api/avatar");
        const data = await res.json();
        if (data && data.avatar) {
          localStorage.setItem("kazi_shakil_avatar_data", data.avatar);
          setAvatar(data.avatar);
          window.dispatchEvent(new Event("storage"));
        } else {
          // Self-heal: If server database is empty but client has local avatar cache,
          // we silently upload it to server so it is permanent for all visitors!
          const localStored = localStorage.getItem("kazi_shakil_avatar_data");
          if (localStored && localStored.startsWith("data:image/")) {
            console.log("Self-healing: Syncing local avatar cluster up to permanent server storage.");
            await fetch("/api/avatar", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ avatar: localStored })
            });
          }
        }
      } catch (err) {
        console.warn("Could not fetch permanent avatar from backend operational cluster:", err);
      }
    };

    const handleStorageChange = () => {
      const stored = localStorage.getItem("kazi_shakil_avatar_data");
      setAvatar(stored);
    };

    handleStorageChange();
    fetchPermanentAvatar();

    window.addEventListener("storage", handleStorageChange);
    
    // Check periodically for changes
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Cybernetic pulsing tracker
  useEffect(() => {
    const timer = setInterval(() => {
      setShimmerTime(prev => (prev + 1) % 100);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const handleVerifyPasscode = () => {
    if (passcodeInput === "shakil99") {
      localStorage.setItem("kazi_shakil_admin_authorized", "true");
      SoundSystem.playPing(1500, 0.45);
      setShowAuthModal(false);
      setAuthError("");
      setPasscodeInput("");
      
      // Execute the deferred upload file selection or remove
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    } else {
      SoundSystem.playClick(300, 0.25); // secure error buzz sound
      setAuthError("TRANSMISSION ACCESS CIPHER IS CORRECT-CODE ERROR // ARREST");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = async () => {
          const result = reader.result as string;
          localStorage.setItem("kazi_shakil_avatar_data", result);
          setAvatar(result);
          SoundSystem.playPing(1300, 0.45);
          window.dispatchEvent(new Event("storage"));

          // Post to permanent backend storage
          try {
            await fetch("/api/avatar", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ avatar: result })
            });
          } catch (err) {
            console.error("Failed to commit avatar to permanent server storage:", err);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    SoundSystem.playClick(900, 0.05);
    
    const performAction = () => {
      fileInputRef.current?.click();
    };

    const isAuthorized = localStorage.getItem("kazi_shakil_admin_authorized") === "true";
    if (isAuthorized) {
      performAction();
    } else {
      setPendingAction(() => performAction);
      setShowAuthModal(true);
    }
  };

  const removeAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    SoundSystem.playClick(600, 0.08);

    const performAction = () => {
      localStorage.removeItem("kazi_shakil_avatar_data");
      setAvatar(null);
      window.dispatchEvent(new Event("storage"));

      // Reset on permanent server storage
      fetch("/api/avatar/reset", { method: "POST" }).catch(err => {
        console.error("Failed to reset permanent avatar on backend cluster:", err);
      });
    };

    const isAuthorized = localStorage.getItem("kazi_shakil_admin_authorized") === "true";
    if (isAuthorized) {
      performAction();
    } else {
      setPendingAction(() => performAction);
      setShowAuthModal(true);
    }
  };

  const isLarge = size === "lg";

  return (
    <motion.div
      id={`profile-hologram-wrapper-${size}`}
      className="relative cursor-pointer select-none"
      onMouseEnter={() => {
        setIsHovered(true);
        if (Math.random() < 0.5) SoundSystem.playClick(1000, 0.02);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerUpload}
      animate={{
        y: isLarge ? [0, -6, 0] : [0, -2, 0],
      }}
      transition={{
        duration: isLarge ? 5 : 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Interactive Neon Cyan-teal aura */}
      <div 
        className={`absolute inset-[-4px] rounded-full blur-[10px] transition-all duration-1000 ${
          isHovered 
            ? "bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 opacity-95 shadow-[0_0_25px_rgba(0,255,209,0.7)]" 
            : "bg-cyan-500/20 opacity-40 blur-[4px]"
        }`} 
      />

      {/* Glassmorphism framing container */}
      <div 
        className={`relative rounded-full border border-cyan-400/50 bg-[#040815]/90 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-[inset_0_0_25px_rgba(0,255,209,0.25)] group transition-all duration-300 ${
          isLarge 
            ? "w-40 h-40 md:w-44 md:h-44 shadow-[0_0_40px_rgba(0,255,209,0.15)]" 
            : "w-11 h-11"
        }`}
      >
        {/* Render base image if the user uploaded it */}
        {avatar ? (
          <div className="relative w-full h-full">
            <img 
              src={avatar} 
              alt="Kazi Shakil Ahammad" 
              className={`w-full h-full object-cover transition-all duration-500 ${
                isHovered ? "grayscale-0 scale-105 brightness-105" : "grayscale opacity-90 contrast-110 brightness-95"
              }`}
              referrerPolicy="no-referrer"
            />
            {/* Holographic matrix scan layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none mix-blend-overlay" />
          </div>
        ) : (
          /* Procedural high-fidelity SVG representation of Kazi Shakil Ahammad (bald, beard, glasses, shirt, navy suit jacket) */
          <div className="relative w-full h-full flex items-center justify-center text-cyan-400/80">
            <svg 
              className={`w-full h-full p-1.5 transition-all duration-500 ${isHovered ? "scale-105" : "scale-100"}`} 
              viewBox="0 0 160 160"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0ffd1" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="suitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0e7490" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1e293b" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Holographic helper circles */}
              <circle cx="80" cy="80" r="74" stroke="#00FFE0" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-45" />
              <circle cx="80" cy="80" r="70" stroke="#00FFE0" strokeWidth="0.25" className="opacity-25" />

              {/* Chest / Suit Jacket (Navy suit with lapels) */}
              <path d="M40 142 L46 110 L58 102 L70 114 L80 142 L90 114 L102 102 L114 110 L120 142 Z" fill="url(#suitGrad)" stroke="#00FFD1" strokeWidth="1" className="opacity-80" />
              
              {/* White collared shirt */}
              <path d="M68 104 L80 120 L92 104 L80 94 Z" fill="#020617" stroke="#38bdf8" strokeWidth="0.75" />
              <path d="M68 104 L74 114 L80 120" stroke="#00FFD1" strokeWidth="1" />
              <path d="M92 104 L86 114 L80 120" stroke="#00FFD1" strokeWidth="1" />

              {/* Neck */}
              <path d="M72 90 L72 102 L88 102 L88 90 Z" fill="url(#skinGrad)" stroke="#00FFD1" strokeWidth="0.5" />

              {/* Head / Scalp Shape (Buzzcut/Bald skull) */}
              {/* Ears */}
              <ellipse cx="58" cy="74" rx="3.5" ry="5.5" fill="none" stroke="#00FFD1" strokeWidth="0.7" />
              <ellipse cx="102" cy="74" rx="3.5" ry="5.5" fill="none" stroke="#00FFD1" strokeWidth="0.7" />
              {/* Main face block */}
              <path d="M62 60 C62 44, 98 44, 98 60 C98 84, 92 94, 80 94 C68 94, 62 84, 62 60 Z" fill="url(#skinGrad)" stroke="#00FFD1" strokeWidth="1.2" />

              {/* Smart well-groomed short black beard & mustache */}
              {/* Mustache */}
              <path d="M70 81 C74 78, 86 78, 90 81 C90 84, 70 84, 70 81 Z" fill="#022c22" stroke="#00FFD1" strokeWidth="0.5" />
              {/* Beard line along jaw and chin */}
              <path d="M62 72 Q64 88, 72 91 Q80 94, 88 91 Q96 88, 98 72 Q98 86, 88 91 Q80 94, 72 91 Q62 86, 62 72 Z" fill="#024c3e" stroke="#00FFD1" strokeWidth="0.75" />

              {/* Nose */}
              <path d="M78 72 L80 78 L82 72" stroke="#00FFD1" strokeWidth="0.75" strokeLinecap="round" />

              {/* Black rectangular frame glasses (Kazi's signature look!) */}
              {/* Left Lens */}
              <rect x="65" y="62" width="13" height="9" rx="1.5" stroke="#34d399" strokeWidth="1.2" fill="rgba(6, 182, 212, 0.15)" />
              {/* Right Lens */}
              <rect x="82" y="62" width="13" height="9" rx="1.5" stroke="#34d399" strokeWidth="1.2" fill="rgba(6, 182, 212, 0.15)" />
              {/* Glasses Bridge */}
              <line x1="78" y1="65" x2="82" y2="65" stroke="#34d399" strokeWidth="1.5" />
              {/* Glasses Temple edges */}
              <line x1="61" y1="64" x2="65" y2="64" stroke="#34d399" strokeWidth="1" />
              <line x1="95" y1="64" x2="99" y2="64" stroke="#34d399" strokeWidth="1" />

              {/* Eyebrows */}
              <path d="M64 59 Q71 58, 77 60" stroke="#052e16" strokeWidth="1" strokeLinecap="round" />
              <path d="M96 59 Q89 58, 83 60" stroke="#052e16" strokeWidth="1" strokeLinecap="round" />

              {/* Eyes */}
              <circle cx="71" cy="66.5" r="1.2" fill="#00FFD1" />
              <circle cx="89" cy="66.5" r="1.2" fill="#00FFD1" />

              {/* Interactive vector blueprint overlay ticks */}
              {isHovered && (
                <>
                  <line x1="10" y1="80" x2="25" y2="80" stroke="#10b981" strokeWidth="0.5" />
                  <line x1="135" y1="80" x2="150" y2="80" stroke="#10b981" strokeWidth="0.5" />
                  <line x1="80" y1="10" x2="80" y2="25" stroke="#10b981" strokeWidth="0.5" />
                  {isLarge && (
                    <text x="80" y="32" fill="#10b981" fontSize="6.5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5" className="uppercase font-bold">
                      KSA // RADAR_LOCK
                    </text>
                  )}
                </>
              )}
            </svg>
          </div>
        )}

        {/* Dynamic Holographic Scan Beam */}
        {scannerActive && (
          <motion.div
            className="absolute left-0 right-0 h-[3px] bg-cyan-400/80 shadow-[0_0_12px_rgba(0,255,209,0.95)] pointer-events-none z-10"
            animate={{
              top: ["0%", "100%", "0%"]
            }}
            transition={{
              duration: isLarge ? 3.2 : 2.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}

        {/* Floating cyber lock text coordinates inside larger frame */}
        {isLarge && !avatar && (
          <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none select-none z-10 font-mono">
            <span className="text-[7px] text-cyan-400 bg-slate-950/80 border border-cyan-500/20 rounded px-1.5 py-0.5 tracking-wider uppercase">
              GRID_SEC_COGNITIVE
            </span>
          </div>
        )}

        {/* Upload overlay when hovered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#030712]/92 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Upload className={`text-cyan-400 animate-pulse ${isLarge ? "w-6 h-6 mb-2" : "w-4 h-4"}`} />
          <span className={`tracking-widest font-mono text-cyan-300 uppercase ${isLarge ? "text-[8px] font-bold" : "text-[5px]"}`}>
            {avatar ? "RE-MAP" : "UPLINK"}
          </span>
          {avatar && isLarge && (
            <button
              onClick={removeAvatar}
              className="mt-2.5 px-2 py-0.5 rounded border border-red-500/30 bg-red-950/20 text-red-400 text-[6px] tracking-wider hover:bg-red-500 hover:text-white transition-all"
            >
              RESET VECTOR
            </button>
          )}
        </div>
      </div>

      {/* Hidden file upload trigger */}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*"
        onChange={handleFileChange}
        className="hidden" 
      />

      {/* Cybernetic HUD Badge Overlay tooltip */}
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute top-full mt-3.5 left-1/2 -translate-x-1/2 z-50 bg-slate-950/95 border border-cyan-400/40 rounded px-2.5 py-1.5 text-[8px] font-mono whitespace-nowrap text-cyan-300 shadow-[0_4px_25px_rgba(3,6,15,0.98)] uppercase tracking-wider pointer-events-none"
        >
          {avatar ? "RE-MAP MATRIX [CLICK]" : "LOAD PORTRAIT VECTOR"}
        </motion.div>
      )}

      {/* Sleek sci-fi Admin passcode auth modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm border border-cyan-500/35 bg-[#050917]/95 p-6 rounded-xl shadow-[0_0_35px_rgba(0,255,209,0.15)] font-mono text-cyan-200 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-cyan-500/10 pb-2">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Shield className="w-4 h-4 animate-pulse text-cyan-400" /> SECURE_UPLINK // ADMIN REQUIRED
                </span>
                <button 
                  onClick={() => { SoundSystem.playClick(600, 0.05); setShowAuthModal(false); setAuthError(""); setPasscodeInput(""); }}
                  className="text-cyan-500/60 hover:text-cyan-400 text-xs py-0.5 px-2 rounded hover:bg-slate-900 border border-transparent hover:border-cyan-500/10 transition-all font-sans"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1 font-sans">
                <p className="text-[10px] text-cyan-200 leading-relaxed uppercase">
                  এই পোর্ট্রেটটি শুধুমাত্র ওনার পরিবর্তন করতে পারবেন। অনুগ্রহ করে আপনার পাসকোড (Passcode) দিন:
                </p>
                <p className="text-[8px] text-cyan-500/60 leading-relaxed uppercase font-mono">
                  This portal is restricted to Kazi Shakil Ahammad. Enter secure authorization key to proceed:
                </p>
              </div>

              <div className="space-y-2">
                <input 
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => { setPasscodeInput(e.target.value); setAuthError(""); }}
                  onKeyDown={(e) => { 
                    if (e.key === "Enter") {
                      handleVerifyPasscode();
                    }
                  }}
                  placeholder="ENTER SECURE PASSWORD KEY..."
                  className="w-full bg-[#030611] border border-cyan-500/25 rounded px-3 py-2 text-center text-xs font-mono tracking-widest text-[#22d3ee] outline-none focus:border-cyan-400 transition-all placeholder-cyan-800/40"
                  autoFocus
                />

                {authError && (
                  <div className="text-[8px] text-red-400 font-bold tracking-wider text-center uppercase py-0.5">
                    ⚠️ {authError}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => { SoundSystem.playClick(600, 0.05); setShowAuthModal(false); setAuthError(""); setPasscodeInput(""); }}
                  className="w-full py-2 bg-transparent text-cyan-500 hover:text-cyan-400 border border-cyan-500/10 rounded transition-all tracking-wider uppercase text-[8px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleVerifyPasscode}
                  className="w-full py-2 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-400 hover:text-[#050816] border border-cyan-400 rounded transition-all duration-300 tracking-wider uppercase font-bold text-[8px] shadow-[0_0_12px_rgba(0,255,209,0.1)]"
                >
                  Authorize
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
