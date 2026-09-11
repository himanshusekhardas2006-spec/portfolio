"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, CheckCircle2 } from "lucide-react";

const BOOT_LOGS = [
  "SYS_KERNEL_INIT: v4.2.0-release",
  "> Mounting fullstack workspace & Three.js runtime... [OK]",
  "> Loading repositories: EasyBuy, UHIMS, D-FUSE, VoiceClone... [OK]",
  "> Initializing 3D Keycap Warp Field telemetry... [OK]",
  "> Establishing secure pipeline: dev://himanshu.local... [CONNECTED]",
  "STATUS: SYSTEM ONLINE // WELCOME",
];

export function TerminalBootLoader() {
  const [visible, setVisible] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Step through boot lines rapidly
    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 220);

    // Progress bar fill
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + 18, 100);
      });
    }, 180);

    // Auto dismiss after 1.5s
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 1600);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, []);

  const handleSkip = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={handleSkip}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020408] text-emerald-400 font-mono p-4 select-none cursor-pointer"
        >
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 crt-scanlines opacity-40 pointer-events-none" />

          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-black/90 border border-emerald-500/40 p-6 shadow-[0_0_50px_rgba(16,185,129,0.2)] backdrop-blur-2xl">
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-500/20 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
                <span className="text-emerald-400 font-bold tracking-wider">TERMINAL://BOOT_INIT</span>
              </div>
              <button
                onClick={handleSkip}
                className="text-[10px] text-zinc-500 hover:text-emerald-300 transition-colors uppercase tracking-widest px-2 py-0.5 rounded border border-white/10"
              >
                [ SKIP ESC ]
              </button>
            </div>

            {/* Boot Log Output */}
            <div className="space-y-1.5 min-h-[140px] text-xs sm:text-sm">
              {BOOT_LOGS.slice(0, currentLine + 1).map((log, index) => {
                const isLast = index === currentLine;
                const isSuccess = log.includes("[OK]") || log.includes("[CONNECTED]") || log.includes("ONLINE");
                return (
                  <motion.div
                    key={log}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-emerald-500/60 font-bold">$</span>
                    <span className={isSuccess ? "text-emerald-300 font-medium" : "text-zinc-400"}>
                      {log}
                    </span>
                    {isLast && currentLine < BOOT_LOGS.length - 1 && (
                      <span className="inline-block w-2 h-4 bg-emerald-400 animate-terminal-cursor ml-1" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Meter */}
            <div className="mt-5 pt-3 border-t border-emerald-500/20 flex flex-col gap-2">
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>SYSTEM COMPILATION</span>
                <span className="text-emerald-400 font-bold">{progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TerminalBootLoader;
