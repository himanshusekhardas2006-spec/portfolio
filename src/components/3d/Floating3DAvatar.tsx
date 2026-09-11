"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Sparkles, ShieldCheck, Activity, Compass, Zap, Move } from "lucide-react";

export function Floating3DAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  // Motion values for normalized mouse position (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for gentle, fluid response
  const springConfig = { stiffness: 220, damping: 22, mass: 0.8 };

  // Subtle 3D tilt angles (little tilt, strictly NOT full 360 rotation)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-11, 11]), springConfig);

  // Subtle translation shifts (little movable left, right, up, down)
  const avatarMoveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);
  const avatarMoveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-14, 14]), springConfig);

  // Parallax shifts for floating badges (amplified depth plane)
  const badgeMoveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), springConfig);
  const badgeMoveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-18, 18]), springConfig);

  // Parallax shift for holographic backdrop (subtle counter-shift)
  const bgShiftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), springConfig);
  const bgShiftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly return avatar to neutral center position
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      {/* Dynamic 3D Neon Backlight */}
      <motion.div
        style={{ x: bgShiftX, y: bgShiftY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-teal-500/15 rounded-full blur-[110px] pointer-events-none"
      />

      {/* Main 3D Card Shell */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 w-full max-w-sm cursor-grab active:cursor-grabbing perspective-[1200px]"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-3xl border border-emerald-500/30 hover:border-emerald-400/60 bg-gradient-to-b from-[#091017]/90 via-[#03060c]/90 to-[#020408]/95 backdrop-blur-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-colors duration-500 overflow-hidden"
        >
          {/* Top Hologram Status Header */}
          <div
            style={{ transform: "translateZ(30px)" }}
            className="flex items-center justify-between px-3.5 py-2 mb-2 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md relative z-20"
          >
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold">3D HOLOGRAPHIC AVATAR</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-300 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1.5">
              <Move size={10} className="text-cyan-400 animate-pulse" />
              <span>3D POINTER MOVE</span>
            </span>
          </div>

          {/* 3D Holographic Stage Area (NO white background box) */}
          <div className="relative w-full h-[410px] sm:h-[440px] rounded-2xl overflow-hidden flex flex-col items-center justify-end">
            {/* Ambient Cyber Grid & Crosshairs in background */}
            <motion.div
              style={{ x: bgShiftX, y: bgShiftY }}
              className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,rgba(6,182,212,0.08)_50%,transparent_80%)]"
            />
            
            {/* Tech Corner Reticles */}
            <div className="absolute top-2 left-2 text-emerald-500/40 font-mono text-[9px] pointer-events-none z-10">
              [POS: 3D_CORE]
            </div>
            <div className="absolute top-2 right-2 text-cyan-500/40 font-mono text-[9px] pointer-events-none z-10 flex items-center gap-1">
              <Zap size={10} />
              <span>STABLE</span>
            </div>

            {/* Side Altitude/Depth Measurement Markers */}
            <div className="absolute left-2 top-12 bottom-16 w-3 flex flex-col justify-between py-2 text-[8px] font-mono text-zinc-600 pointer-events-none select-none z-10">
              <span>+10</span>
              <span>+05</span>
              <span>0.0</span>
              <span>-05</span>
              <span>-10</span>
            </div>

            {/* Vertical Hologram Scanline Light Beam */}
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent z-10 pointer-events-none"
            />

            {/* Floating 3D Telemetry Badges (Mid-Air Parallax) */}
            <motion.div
              style={{
                x: badgeMoveX,
                y: badgeMoveY,
                transform: "translateZ(45px)",
              }}
              className="absolute top-10 right-3 z-30 pointer-events-none"
            >
              <div className="px-2.5 py-1 rounded-xl bg-black/80 border border-cyan-500/30 text-cyan-300 font-mono text-[9px] backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>100m // SPRINTER</span>
              </div>
            </motion.div>

            <motion.div
              style={{
                x: badgeMoveX,
                y: badgeMoveY,
                transform: "translateZ(35px)",
              }}
              className="absolute top-24 left-3 z-30 pointer-events-none"
            >
              <div className="px-2.5 py-1 rounded-xl bg-black/80 border border-emerald-500/30 text-emerald-300 font-mono text-[9px] backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Compass size={10} className="text-emerald-400" />
                <span>IIT GUWAHATI DEL.</span>
              </div>
            </motion.div>

            {/* Continuous Floating Levitation + Interactive Mouse Move */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotateZ: [-0.6, 0.6, -0.6],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                x: avatarMoveX,
                y: avatarMoveY,
                transformStyle: "preserve-3d",
                transform: "translateZ(25px)",
              }}
              className="relative z-20 w-full h-[360px] sm:h-[390px] flex items-end justify-center pointer-events-none will-change-transform"
            >
              {/* High-Resolution Cutout Photo (Transparent background - NO white box) */}
              <div className="relative w-[210px] sm:w-[230px] h-[340px] sm:h-[370px]">
                <Image
                  src="/assets/images/avatar-cutout.png"
                  alt="RR HIMANSHU SEKHAR DAS 3D Floating Avatar"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_18px_35px_rgba(0,0,0,0.95)] drop-shadow-[0_0_25px_rgba(16,185,129,0.22)] transition-transform duration-300"
                  priority
                  sizes="(max-width: 768px) 240px, 260px"
                />
              </div>
            </motion.div>

            {/* 3D Ground Holographic Pedestal & Reactive Floating Shadow */}
            <div className="relative -mt-4 w-full flex flex-col items-center pointer-events-none z-10">
              {/* Floating Ground Shadow (expands & contracts inversely to height) */}
              <motion.div
                animate={{
                  scale: [1, 0.82, 1],
                  opacity: [0.65, 0.35, 0.65],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-40 sm:w-44 h-5 rounded-full bg-black/90 blur-sm transform -rotate-x-60"
              />

              {/* 3D Holographic Platform Laser Rings */}
              <div className="w-56 h-10 -mt-3 relative flex items-center justify-center">
                {/* Outer Glow Disc */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/25 via-cyan-500/25 to-teal-500/25 blur-md transform -rotate-x-60" />
                {/* Concentric High-Tech Ring */}
                <div className="w-48 h-4 rounded-full border border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.5)] transform -rotate-x-60" />
                {/* Inner Core Light Ring */}
                <div className="w-32 h-2.5 rounded-full border border-cyan-300/70 shadow-[0_0_12px_rgba(6,182,212,0.8)] transform -rotate-x-60" />
              </div>
            </div>

            {/* Floating Spec Bar Tag at bottom of stage */}
            <div
              style={{ transform: "translateZ(40px)" }}
              className="absolute bottom-2 left-3 right-3 z-30 flex items-end justify-between p-3 rounded-xl bg-black/85 border border-white/10 backdrop-blur-xl shadow-xl"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-0.5">
                  RR HIMANSHU SEKHAR DAS
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white font-heading">
                  Full Stack Engineer &amp; Athlete
                </h4>
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Sparkles size={14} />
              </div>
            </div>
          </div>

          {/* Interactive Pedestal Footer */}
          <div
            style={{ transform: "translateZ(20px)" }}
            className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400 relative z-20"
          >
            <span className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>3D Float &amp; Pointer Tilt</span>
            </span>
            <span className="text-emerald-400 font-semibold">GIET UNIVERSITY</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Floating3DAvatar;
