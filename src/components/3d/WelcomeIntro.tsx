"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown, Terminal } from "lucide-react";
import { WarpFieldBackground } from "@/shaders/warp-field/WarpFieldBackground";

export function WelcomeIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1. Scroll progress tracker for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 2. Surrounding elements fade and move away early in the scroll (progress: 0 -> 0.22)
  const surroundingOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const pillY = useTransform(scrollYProgress, [0, 0.22], [0, -35]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.22], [0, 35]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.18], [0, 40]);

  // 3. Cinematic zoom target: The Name scales up dramatically toward camera
  // Desktop: 1x -> 12x (camera flies through the name)
  // Mobile: 1x -> 5.5x (optimized for small viewports)
  const maxScale = isMobile ? 5.5 : 12.0;
  const nameScale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.85],
    [1, 1.4, shouldReduceMotion ? 1 : maxScale]
  );

  // The name dissolves smoothly as it finishes passing the camera (progress: 0.62 -> 0.85)
  const nameOpacity = useTransform(
    scrollYProgress,
    [0, 0.62, 0.85],
    [1, 0.95, 0]
  );

  // 4. Background parallax zoom: moves slower than text to establish real 3D depth
  const bgScale = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, shouldReduceMotion ? 1 : 2.2]
  );
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65, 0.88], [1, 0.85, 0]);

  return (
    <div
      ref={containerRef}
      id="welcome"
      className="relative w-full h-[220vh] select-none"
    >
      {/* Sticky camera frame locking to viewport during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center text-white">
        {/* Layer 1: Background 3D Keycaps WarpField (Parallax Depth Layer) */}
        <motion.div
          style={{
            scale: bgScale,
            opacity: bgOpacity,
            transformOrigin: "center center",
          }}
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
        >
          <WarpFieldBackground
            variant="keycaps"
            speed={15.0}
            streakOpacity={0.60}
            tileOpacity={0.90}
            fov={75}
            hue={0}
            saturation={1.00}
            brightness={1.00}
          />
        </motion.div>

        {/* Layer 2: Radial Vignette & Contrast Overlays */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(3,5,8,0.2)_0%,rgba(3,5,8,0.85)_80%,#030508_100%)]"
        />
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-[#030508]"
        />

        {/* Layer 3: Central Foreground Stage */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-7xl w-full h-full pointer-events-none">
          {/* A. Surrounding Element: Hacker Eyebrow Pill (Fades & drifts away early) */}
          <motion.div
            style={{
              opacity: surroundingOpacity,
              y: pillY,
            }}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase tracking-widest backdrop-blur-md will-change-transform"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <Terminal size={12} />
            <span>PORTFOLIO_OS :: DEVELOPER_CORE</span>
          </motion.div>

          {/* B. MAIN VISUAL FOCUS: The Name scales up deeply toward the camera */}
          <motion.div
            style={{
              scale: nameScale,
              opacity: nameOpacity,
              transformOrigin: "center center",
            }}
            className="relative z-20 my-2 will-change-transform w-full flex justify-center items-center overflow-visible"
          >
            <h1 className="text-[clamp(2rem,6vw,7.5rem)] font-black font-heading tracking-tight mb-2 drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)] leading-none whitespace-nowrap select-none">
              <span className="inline-block whitespace-nowrap text-white">RR HIMANSHU</span>{" "}
              <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 via-cyan-400 to-blue-400">
                SEKHAR DAS
              </span>
            </h1>
          </motion.div>

          {/* C. Surrounding Element: Subtitle / Terminal Path (Fades & drifts away early) */}
          <motion.p
            style={{
              opacity: surroundingOpacity,
              y: subtitleY,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-300 text-sm sm:text-base md:text-lg mb-8 max-w-xl font-mono leading-relaxed drop-shadow-md will-change-transform"
          >
            <span className="text-emerald-400 font-bold">&gt;</span> Aspiring Full Stack Developer &middot; Computer Science Engineering &middot; GIET University
          </motion.p>

          {/* D. Surrounding Element: Scroll prompt button (Fades & drifts away early) */}
          <motion.div
            style={{
              opacity: surroundingOpacity,
              y: scrollIndicatorY,
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col items-center gap-3 cursor-pointer group pointer-events-auto will-change-transform"
            onClick={() => {
              const el = document.getElementById("home");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="flex items-center gap-2.5 px-5 py-2 rounded-xl bg-black/70 border border-emerald-500/30 text-zinc-300 group-hover:text-emerald-300 group-hover:border-emerald-400/60 transition-all text-xs font-mono backdrop-blur-xl">
              <span className="text-emerald-400 font-bold">$</span>
              <span>scroll_down_to_explore()</span>
            </div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="text-emerald-400 flex flex-col items-center"
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeIntro;
