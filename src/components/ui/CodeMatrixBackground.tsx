"use client";

import React, { useEffect, useRef } from "react";

const CODE_SYMBOLS = [
  "< />",
  "{ }",
  "=>",
  "$",
  "#",
  "( )",
  "[ ]",
  "01",
  "10",
  "git",
  "const",
  "return",
  "async",
  "::",
  "//",
  "npm",
];

interface Particle {
  x: number;
  y: number;
  symbol: string;
  speed: number;
  opacity: number;
  size: number;
  color: string;
}

export function CodeMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate ~35 floating code symbols (lightweight for 60fps)
    const count = Math.min(Math.floor(width / 40), 40);
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
      speed: Math.random() * 0.4 + 0.15,
      opacity: Math.random() * 0.14 + 0.04,
      size: Math.floor(Math.random() * 3) + 11,
      color: Math.random() > 0.4 ? "#10b981" : "#06b6d4",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.font = '12px "JetBrains Mono", monospace';

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
          p.symbol = CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)];
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillText(p.symbol, p.x, p.y);
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Digital Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Floating Canvas Symbols */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}

export default CodeMatrixBackground;
