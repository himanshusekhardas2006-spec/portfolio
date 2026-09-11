"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticPopTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  intensifyGlow?: boolean;
}

function MagneticLetter({
  char,
  mousePos,
  intensifyGlow,
  isTouch,
}: {
  char: string;
  mousePos: { x: number; y: number } | null;
  intensifyGlow?: boolean;
  isTouch: boolean;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  // Springs for smooth magnetic lift & scale
  const scaleSpring = useSpring(1, { stiffness: 380, damping: 22 });
  const ySpring = useSpring(0, { stiffness: 380, damping: 22 });

  useEffect(() => {
    if (isTouch || !mousePos || !spanRef.current) {
      scaleSpring.set(1);
      ySpring.set(0);
      return;
    }

    const rect = spanRef.current.getBoundingClientRect();
    const letterCenterX = rect.left + rect.width / 2;
    const letterCenterY = rect.top + rect.height / 2;

    const dx = mousePos.x - letterCenterX;
    const dy = mousePos.y - letterCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = 100; // Influence radius

    if (distance < radius) {
      const power = 1 - distance / radius; // 0 to 1
      scaleSpring.set(1 + power * 0.22); // Scale up to 1.22x
      ySpring.set(-power * 12); // Lift up by up to 12px
    } else {
      scaleSpring.set(1);
      ySpring.set(0);
    }
  }, [mousePos, scaleSpring, ySpring, isTouch]);

  if (char === " ") {
    return <span>&nbsp;</span>;
  }

  return (
    <motion.span
      ref={spanRef}
      style={{
        scale: scaleSpring,
        y: ySpring,
        display: "inline-block",
        willChange: "transform",
        transformOrigin: "bottom center",
      }}
      className="inline-block transition-colors select-none cursor-default"
    >
      {char}
    </motion.span>
  );
}

export function MagneticPopText({
  children,
  className = "",
  style,
  as: Component = "span",
  intensifyGlow = true,
}: MagneticPopTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (isTouch) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  // Group by words to prevent mid-word breaking
  const words = children.split(" ");

  const isNowrap = className.includes("nowrap");

  return (
    <Component
      ref={containerRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center ${
        isNowrap ? "flex-nowrap whitespace-nowrap" : "flex-wrap"
      } ${className}`}
      style={style}
    >
      {words.map((word, wordIdx) => (
        <React.Fragment key={wordIdx}>
          <span className="inline-flex whitespace-nowrap">
            {Array.from(word).map((char, charIdx) => (
              <MagneticLetter
                key={`${wordIdx}-${charIdx}`}
                char={char}
                mousePos={mousePos}
                intensifyGlow={intensifyGlow}
                isTouch={isTouch}
              />
            ))}
          </span>
          {wordIdx < words.length - 1 && (
            <span className="inline-block select-none">&nbsp;</span>
          )}
        </React.Fragment>
      ))}
    </Component>
  );
}

export default MagneticPopText;
