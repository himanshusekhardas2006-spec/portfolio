"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "glass";
  target?: string;
  rel?: string;
}

export function TiltButton({
  children,
  href,
  onClick,
  className = "",
  variant = "glass",
  target,
  rel,
}: TiltButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-black font-bold shadow-xl shadow-orange-500/25 border border-orange-400/40",
    secondary:
      "bg-white/10 hover:bg-white/15 text-white font-semibold backdrop-blur-xl border border-white/20 shadow-xl shadow-black/40",
    glass:
      "bg-black/50 hover:bg-black/70 text-zinc-200 hover:text-white font-semibold backdrop-blur-xl border border-white/15 hover:border-orange-500/40 shadow-xl shadow-black/50",
  }[variant];

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className={`relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl cursor-pointer select-none transition-colors duration-200 perspective-1000 ${variantStyles} ${className}`}
    >
      {/* Glare Reflection overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%)",
        }}
      />
      <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide">
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className="inline-block">
      {content}
    </div>
  );
}

export default TiltButton;
