"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "orange" | "cyan" | "purple" | "white" | "emerald";
  maxTilt?: number;
}

export function TiltCard({
  children,
  className = "",
  glowColor = "cyan",
  maxTilt = 8,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowStyles = {
    orange: "hover:border-orange-500/50",
    cyan: "hover:border-cyan-500/50",
    emerald: "hover:border-emerald-500/50",
    purple: "hover:border-purple-500/50",
    white: "hover:border-white/40",
  }[glowColor];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl bg-zinc-950/80 backdrop-blur-2xl border border-white/10 transition-colors duration-300 ${glowStyles} ${className}`}
    >
      <div className="relative z-10" style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default TiltCard;
