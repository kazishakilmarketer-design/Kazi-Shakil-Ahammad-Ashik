/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import StartupSequence from "./components/StartupSequence";
import OSDashboard from "./components/OSDashboard";
import AIAssistant from "./components/AIAssistant";

export default function App() {
  const [isBooted, setIsBooted] = useState(false);

  const handleBootComplete = (soundEnabled: boolean) => {
    setIsBooted(true);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#e2e8f0]">
      {!isBooted ? (
        <StartupSequence onComplete={handleBootComplete} />
      ) : (
        <>
          {/* Main Integrated OS Dashboard */}
          <OSDashboard />

          {/* Floating AI Companion Robot Orb */}
          <AIAssistant />
        </>
      )}
    </div>
  );
}
