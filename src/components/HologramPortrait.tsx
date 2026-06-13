/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, RefreshCw, Layers, ShieldCheck, Cpu, Shield } from "lucide-react";
import { SoundSystem } from "./SoundSystem";

export default function HologramPortrait() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [glitchState, setGlitchState] = useState(false);
  const [telemetry, setTelemetry] = useState({
    matchStrength: 98.4,
    nodesConnected: 124,
    encryptionKey: "HA-0943A",
    matrixIndex: "SHAKIL // GRID_C_6"
  });

  // Secure Authorization states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Synchronize with localStorage shared avatar state & permanent backend storage
  useEffect(() => {
    const fetchPermanentAvatar = async () => {
      try {
        const res = await fetch("/api/avatar");
        const data = await res.json();
        if (data && data.avatar) {
          localStorage.setItem("kazi_shakil_avatar_data", data.avatar);
          setImageSrc(data.avatar);
          window.dispatchEvent(new Event("storage"));
        } else {
          // Self-heal: If server database is empty but client has local avatar cache,
          // we silently upload it to server so it is permanent for all visitors!
          const localStored = localStorage.getItem("kazi_shakil_avatar_data");
          if (localStored && localStored.startsWith("data:image/")) {
            console.log("Self-healing: Syncing local avatar cluster up to permanent server storage from portrait.");
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

    const syncWithStorage = () => {
      const stored = localStorage.getItem("kazi_shakil_avatar_data");
      if (stored !== imageSrc) {
        setImageSrc(stored);
      }
    };

    syncWithStorage();
    fetchPermanentAvatar();

    window.addEventListener("storage", syncWithStorage);
    const interval = setInterval(syncWithStorage, 1000);

    return () => {
      window.removeEventListener("storage", syncWithStorage);
      clearInterval(interval);
    };
  }, [imageSrc]);

  // Default procedural canvas drawing when no image is uploaded
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const resize = () => {
      canvas.width = 400;
      canvas.height = 400;
    };
    resize();

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Drawing background telemetry circles
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Scanning radar line
      ctx.strokeStyle = "rgba(0, 255, 209, 0.15)";
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(0, 217, 255, 0.08)";
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed rotating compass rings
      ctx.setLineDash([4, 12]);
      ctx.strokeStyle = "rgba(0, 255, 209, 0.3)";
      ctx.beginPath();
      ctx.arc(cx, cy, 110, tick * 0.005, tick * 0.005 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // If an image is uploaded, we will draw the image with a customized cyberpunk holographic filter
      if (imageSrc) {
        const img = new Image();
        img.src = imageSrc;
        
        try {
          // Draw image tinted cyan/teal with custom glitches
          ctx.save();
          // Clip circular portrait
          ctx.beginPath();
          ctx.arc(cx, cy, 120, 0, Math.PI * 2);
          ctx.clip();

          // Glitch scale adjustments
          let offset = 0;
          if (glitchState && Math.random() > 0.6) {
            offset = (Math.random() - 0.5) * 12;
          }

          // Draw image centered in clip
          ctx.drawImage(img, cx - 120 + offset, cy - 120, 240, 240);

          // Build custom holographic tinting over the image using compositing
          ctx.globalCompositeOperation = "color";
          ctx.fillStyle = "#00FFD1";
          ctx.fillRect(cx - 130, cy - 130, 260, 260);

          // Multiple overlay passes for glow and contrast
          ctx.globalCompositeOperation = "overlay";
          ctx.fillStyle = "rgba(0, 11, 32, 0.5)"; // Deep dark rich blue overlay
          ctx.fillRect(cx - 130, cy - 130, 260, 260);

          ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = "rgba(0, 255, 209, 0.15)";
          ctx.fillRect(cx - 130, cy - 130, 260, 260);

          ctx.restore();
        } catch (e) {
          // Fallback if image load has CORS or draw errors
        }
      } else {
        // Render stunning procedural high-tech neural cyber-head mesh vectors
        ctx.fillStyle = "rgba(0, 255, 209, 0.05)";
        ctx.beginPath();
        ctx.arc(cx, cy, 90, 0, Math.PI * 2);
        ctx.fill();

        // Draw central pulsing node representing the AI Core
        const scale = 1 + Math.sin(tick * 0.05) * 0.05;
        ctx.fillStyle = "rgba(0, 255, 209, 0.2)";
        ctx.beginPath();
        ctx.arc(cx, cy, 30 * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(0, 217, 255, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 35 * scale, 0, Math.PI * 2);
        ctx.stroke();

        // Procedural vector connection lines (looks like neural scanner mesh)
        const pointCount = 12;
        const points: { x: number; y: number }[] = [];
        for (let i = 0; i < pointCount; i++) {
          const angle = (i / pointCount) * Math.PI * 2;
          const dist = 75 + Math.sin(tick * 0.02 + i) * 6;
          points.push({
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist
          });
        }

        ctx.strokeStyle = "rgba(0, 255, 209, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < pointCount; i++) {
          const p1 = points[i];
          const p2 = points[(i + 4) % pointCount];
          const p3 = points[(i + 1) % pointCount];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p3.x, p3.y);
          
          // Outer nodes dot drawing
          ctx.fillStyle = "rgba(0, 255, 209, 0.8)";
          ctx.fillRect(p1.x - 2, p1.y - 2, 4, 4);
        }
        ctx.stroke();

        // High tech lettering inside
        ctx.fillStyle = "rgba(0, 255, 209, 0.8)";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("KSA // CORE", cx, cy);
      }

      // Horizontal fluorescent green laser beam scanner that moves up and down
      if (scanning) {
        const beamY = cy - 120 + ((Math.sin(tick * 0.02) + 1) / 2) * 240;
        ctx.strokeStyle = "rgba(0, 255, 209, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 125, beamY);
        ctx.lineTo(cx + 125, beamY);
        ctx.stroke();

        // Beam glowing aura
        const gradient = ctx.createLinearGradient(0, beamY - 8, 0, beamY + 8);
        gradient.addColorStop(0, "rgba(0, 255, 209, 0.0)");
        gradient.addColorStop(0.5, "rgba(0, 255, 209, 0.25)");
        gradient.addColorStop(1, "rgba(0, 255, 209, 0.0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(cx - 125, beamY - 8, 250, 16);
      }

      // Outer bounding tick marks
      ctx.strokeStyle = "rgba(0, 255, 209, 0.4)";
      ctx.lineWidth = 1.5;
      // top-left bracket
      ctx.beginPath();
      ctx.moveTo(cx - 135, cy - 110); ctx.lineTo(cx - 135, cy - 135); ctx.lineTo(cx - 110, cy - 135);
      ctx.stroke();
      // top-right bracket
      ctx.beginPath();
      ctx.moveTo(cx + 135, cy - 110); ctx.lineTo(cx + 135, cy - 135); ctx.lineTo(cx + 110, cy - 135);
      ctx.stroke();
      // bottom-left bracket
      ctx.beginPath();
      ctx.moveTo(cx - 135, cy + 110); ctx.lineTo(cx - 135, cy + 135); ctx.lineTo(cx - 110, cy + 135);
      ctx.stroke();
      // bottom-right bracket
      ctx.beginPath();
      ctx.moveTo(cx + 135, cy + 110); ctx.lineTo(cx + 135, cy + 135); ctx.lineTo(cx + 110, cy + 135);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    // Telemetry randomized updates
    const telInterval = setInterval(() => {
      setTelemetry((prev) => ({
        matchStrength: +(85 + Math.random() * 14.8).toFixed(1),
        nodesConnected: Math.floor(115 + Math.random() * 20),
        encryptionKey: `HA-${Math.floor(8000 + Math.random() * 1999)}A`,
        matrixIndex: `SHAKIL // GRID_C_${Math.floor(1 + Math.random() * 9)}`
      }));
    }, 2000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(telInterval);
    };
  }, [imageSrc, scanning, glitchState]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleVerifyPasscode = () => {
    if (passcodeInput === "shakil99") {
      localStorage.setItem("kazi_shakil_admin_authorized", "true");
      SoundSystem.playPing(1500, 0.45);
      setShowAuthModal(false);
      setAuthError("");
      setPasscodeInput("");
      
      // Execute the deferred upload file selection or reset
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    } else {
      SoundSystem.playClick(300, 0.25); // secure error buzz sound
      setAuthError("TRANSMISSION ACCESS CIPHER IS CORRECT-CODE ERROR // ARREST");
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;
        localStorage.setItem("kazi_shakil_avatar_data", result);
        setImageSrc(result);
        SoundSystem.playPing(1400, 0.4);
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
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const isAuthorized = localStorage.getItem("kazi_shakil_admin_authorized") === "true";
      
      const performAction = () => {
        processFile(file);
      };

      if (isAuthorized) {
        performAction();
      } else {
        setPendingAction(() => performAction);
        setShowAuthModal(true);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerUpload = () => {
    SoundSystem.playClick(800, 0.05);
    
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

  const resetPortrait = () => {
    SoundSystem.playClick(600, 0.08);

    const performAction = () => {
      localStorage.removeItem("kazi_shakil_avatar_data");
      setImageSrc(null);
      window.dispatchEvent(new Event("storage"));

      // Reset permanent backend storage
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

  return (
    <div className="relative border border-cyan-500/20 rounded-lg bg-[#070b19]/80 backdrop-blur-xl p-5 overflow-hidden flex flex-col items-center">
      {/* Dynamic scan line filter */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-cyan-400/10 shadow-[0_0_10px_cyan] animate-[bounce_8s_infinite] pointer-events-none" />

      {/* Cyberpunk title tag */}
      <div className="w-full flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-4 text-[10px] tracking-widest font-mono text-cyan-500/60 uppercase">
        <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-cyan-400" /> NEURAL_PORTRAIT // READOUT</span>
        <span className="text-[9px] bg-cyan-950/40 text-teal-400 border border-teal-500/30 px-1 py-0.5 rounded">
          DECRYPT UNIT
        </span>
      </div>

      {/* Drag components container */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseEnter={() => setGlitchState(true)}
        onMouseLeave={() => setGlitchState(false)}
        className={`relative w-full aspect-square border-2 ${isDragging ? "border-dashed border-cyan-400 bg-cyan-950/20" : "border-transparent"} rounded flex flex-col items-center justify-center transition-colors duration-200 group`}
      >
        <canvas ref={canvasRef} className="w-full h-full max-w-[340px] max-h-[340px] drop-shadow-[0_0_30px_rgba(0,255,209,0.15)]" />

        {/* Dynamic coordinate overlay in margins */}
        <div className="absolute top-2 left-2 text-[8px] font-mono text-cyan-500/40">LAT: 23.8103° N</div>
        <div className="absolute bottom-2 left-2 text-[8px] font-mono text-cyan-500/40">LON: 90.4125° E</div>
        <div className="absolute top-2 right-2 text-[8px] font-mono text-cyan-500/40">SYS: {telemetry.encryptionKey}</div>
        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-cyan-500/40">FRAME: 60FPS</div>

        {/* Upload suggestion prompt over procedural canvas */}
        {!imageSrc && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/20 hover:bg-slate-950/50 transition-opacity duration-300 opacity-60 hover:opacity-100 cursor-pointer rounded" onClick={triggerUpload}>
            <Camera className="w-8 h-8 text-cyan-400 animate-pulse mb-2" />
            <p className="text-[10px] text-cyan-300 uppercase tracking-widest leading-relaxed">
              [ Drag-Drop Kazi's photo <br /> or click to scan ]
            </p>
          </div>
        )}
      </div>

      {/* Embedded photo inputs */}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*"
        onChange={handleFileChange}
        className="hidden" 
      />

      {/* Controls panel of Hologram */}
      <div className="w-full mt-4 bg-slate-950/60 rounded border border-cyan-500/10 p-3 grid grid-cols-2 gap-2 text-[10px] font-mono">
        <div className="col-span-2 text-[9px] text-teal-400/70 border-b border-cyan-500/15 pb-1 flex justify-between">
          <span>COGNITIVE MATCH:</span>
          <span className="font-bold flex items-center gap-1 text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" /> {telemetry.matchStrength}% SECURE
          </span>
        </div>

        <div className="text-cyan-500/60">INDEX MATRIX:</div>
        <div className="text-cyan-400 text-right font-medium">{telemetry.matrixIndex}</div>

        <div className="text-cyan-500/60">CONNECTED NODES:</div>
        <div className="text-cyan-400 text-right font-medium">{telemetry.nodesConnected} CHANNELS</div>

        <div className="col-span-2 border-t border-cyan-500/10 pt-2 flex items-center gap-2">
          <button 
            id="toggle-scanning"
            onClick={() => { SoundSystem.playClick(900, 0.05); setScanning(!scanning); }}
            className={`flex-1 py-1.5 rounded text-[9px] tracking-wider uppercase border border-cyan-500/30 font-bold hover:bg-cyan-950/40 transition-colors ${scanning ? "bg-cyan-500/15 text-cyan-300" : "bg-transparent text-cyan-500"}`}
          >
            {scanning ? "Stop Beam" : "Start Beam"}
          </button>

          {imageSrc && (
            <button 
              id="reset-hologram"
              onClick={resetPortrait}
              className="px-2 py-1.5 rounded border border-red-500/30 text-red-400 hover:bg-red-950/20 transition-colors flex items-center justify-center"
              title="Reset hologram to default grid"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          )}

          {!imageSrc && (
            <button 
              id="upload-trigger-fallback"
              onClick={triggerUpload}
              className="flex-1 py-1.5 rounded text-[9px] text-cyan-100 uppercase font-semibold bg-cyan-900/30 border border-teal-500/40 hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-1"
            >
              <Cpu className="w-3 h-3" /> Load Portrait
            </button>
          )}
        </div>
      </div>

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
    </div>
  );
}
