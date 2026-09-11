"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  X,
  Code2,
  Sparkles,
  Terminal,
  Cpu,
  Database,
  Server,
  Layers,
  Zap,
  FileCode,
  Brain,
  Lightbulb,
  Users,
  MessageSquare,
  BookOpen,
  Compass,
  Activity,
  CheckCircle2,
  CornerDownRight,
  ShieldCheck,
} from "lucide-react";

export type SkillCategory = "technical" | "soft";

export interface SkillDetail {
  name: string;
  category: SkillCategory;
  levelLabel: string;
  levelPercent: number; // 0 to 100
  levelBars: string; // ASCII visual representation
  description: string;
  conceptsLabel: string; // "Concepts" or "Key Areas"
  concepts: string[];
  experience: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: "orange" | "cyan";
}

export const SKILLS_DATA: Record<string, SkillDetail> = {
  // TECHNICAL SKILLS
  HTML: {
    name: "HTML",
    category: "technical",
    levelLabel: "Intermediate",
    levelPercent: 78,
    levelBars: "████████░░",
    description: "I use HTML to create the structure and content of modern, responsive websites.",
    conceptsLabel: "Core Concepts",
    concepts: ["Semantic HTML", "Forms", "Tables", "Accessibility", "Responsive Structure"],
    experience: "Used in portfolio websites and multiple web development projects.",
    icon: FileCode,
    accentColor: "orange",
  },
  CSS: {
    name: "CSS",
    category: "technical",
    levelLabel: "Intermediate",
    levelPercent: 76,
    levelBars: "████████░░",
    description: "I use CSS to design attractive, responsive, and modern user interfaces.",
    conceptsLabel: "Core Concepts",
    concepts: ["Flexbox", "CSS Grid", "Animations", "Transitions", "Media Queries"],
    experience: "Used to create responsive layouts, animations, modern UI designs, and interactive interfaces.",
    icon: Layers,
    accentColor: "orange",
  },
  JavaScript: {
    name: "JavaScript",
    category: "technical",
    levelLabel: "Beginner to Intermediate",
    levelPercent: 68,
    levelBars: "███████░░░",
    description: "I use JavaScript to add interactivity and dynamic functionality to websites.",
    conceptsLabel: "Core Concepts",
    concepts: ["Functions", "DOM Manipulation", "Events", "Arrays", "Objects", "API Basics"],
    experience: "Used for interactive buttons, forms, pop-ups, dynamic content, and website functionality.",
    icon: Zap,
    accentColor: "orange",
  },
  Python: {
    name: "Python",
    category: "technical",
    levelLabel: "Beginner to Intermediate",
    levelPercent: 70,
    levelBars: "███████░░░",
    description: "I use Python for programming, problem solving, backend development, and academic projects.",
    conceptsLabel: "Core Concepts",
    concepts: ["Variables", "Functions", "Loops", "Object-Oriented Programming", "File Handling"],
    experience: "Used for programming practice, problem solving, backend-related tasks, and academic projects.",
    icon: Terminal,
    accentColor: "orange",
  },
  C: {
    name: "C",
    category: "technical",
    levelLabel: "Beginner",
    levelPercent: 55,
    levelBars: "█████░░░░░",
    description: "I use C to build strong programming fundamentals and problem-solving skills.",
    conceptsLabel: "Core Concepts",
    concepts: ["Variables", "Loops", "Functions", "Arrays", "Pointers"],
    experience: "Used for learning programming fundamentals and solving basic programming problems.",
    icon: Cpu,
    accentColor: "orange",
  },
  SQL: {
    name: "SQL",
    category: "technical",
    levelLabel: "Beginner to Intermediate",
    levelPercent: 65,
    levelBars: "███████░░░",
    description: "I use SQL to manage and work with relational databases.",
    conceptsLabel: "Core Concepts",
    concepts: ["SELECT", "INSERT", "UPDATE", "DELETE", "Joins", "Constraints"],
    experience: "Learning and using SQL for database management and full-stack projects.",
    icon: Database,
    accentColor: "orange",
  },
  PHP: {
    name: "PHP",
    category: "technical",
    levelLabel: "Beginner",
    levelPercent: 50,
    levelBars: "█████░░░░░",
    description: "I use PHP to understand server-side programming and backend web development.",
    conceptsLabel: "Core Concepts",
    concepts: ["Variables", "Forms", "Server-Side Programming", "Database Connectivity"],
    experience: "Exploring PHP for backend development and database-connected web applications.",
    icon: Server,
    accentColor: "orange",
  },

  // SOFT SKILLS
  "Problem Solving": {
    name: "Problem Solving",
    category: "soft",
    levelLabel: "Strong",
    levelPercent: 88,
    levelBars: "█████████░",
    description: "I enjoy analyzing problems and finding logical, efficient, and practical solutions.",
    conceptsLabel: "Key Areas",
    concepts: ["Logical Thinking", "Debugging", "Analysis", "Decision Making"],
    experience: "Used regularly while coding, debugging programs, and solving project challenges.",
    icon: Brain,
    accentColor: "cyan",
  },
  Creativity: {
    name: "Creativity",
    category: "soft",
    levelLabel: "Strong",
    levelPercent: 86,
    levelBars: "█████████░",
    description: "I enjoy generating new ideas and finding creative approaches to projects and challenges.",
    conceptsLabel: "Key Areas",
    concepts: ["Creative Thinking", "UI Ideas", "Project Ideas", "Design"],
    experience: "Used while designing websites, presentations, and innovative project concepts.",
    icon: Sparkles,
    accentColor: "cyan",
  },
  Adaptability: {
    name: "Adaptability",
    category: "soft",
    levelLabel: "Strong",
    levelPercent: 85,
    levelBars: "█████████░",
    description: "I can adjust to new technologies, environments, and challenges while continuously learning.",
    conceptsLabel: "Key Areas",
    concepts: ["Learning Technologies", "Flexible Thinking", "Handling Change"],
    experience: "Continuously learning new programming languages, tools, and technologies.",
    icon: Activity,
    accentColor: "cyan",
  },
  Teamwork: {
    name: "Teamwork",
    category: "soft",
    levelLabel: "Strong",
    levelPercent: 85,
    levelBars: "█████████░",
    description: "I work effectively with others by sharing ideas and contributing toward common goals.",
    conceptsLabel: "Key Areas",
    concepts: ["Collaboration", "Coordination", "Responsibility", "Support"],
    experience: "Worked on academic projects, presentations, hackathons, and team activities.",
    icon: Users,
    accentColor: "cyan",
  },
  Communication: {
    name: "Communication",
    category: "soft",
    levelLabel: "Developing",
    levelPercent: 72,
    levelBars: "███████░░░",
    description: "I focus on clearly expressing my ideas and continuously improving my communication skills.",
    conceptsLabel: "Key Areas",
    concepts: ["Presentation Skills", "Team Communication", "Active Listening", "Technical Explanation"],
    experience: "Practicing through presentations, group projects, hackathons, and English communication.",
    icon: MessageSquare,
    accentColor: "cyan",
  },
  "Continuous Learning": {
    name: "Continuous Learning",
    category: "soft",
    levelLabel: "Strong",
    levelPercent: 92,
    levelBars: "██████████",
    description: "I believe in continuously improving my knowledge and learning new skills to grow as a developer.",
    conceptsLabel: "Key Areas",
    concepts: ["Self Learning", "Technology Exploration", "Practice", "Curiosity"],
    experience: "Continuously exploring programming, web development, databases, cybersecurity, AI, and modern development tools.",
    icon: BookOpen,
    accentColor: "cyan",
  },
};

interface SkillComputerModalProps {
  skillName: string | null;
  onClose: () => void;
}

export function SkillComputerModal({ skillName, onClose }: SkillComputerModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile / touch devices to disable or dampen 3D mouse tilt
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Framer Motion spring 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!skillName) return null;
  const skill = SKILLS_DATA[skillName];
  if (!skill) return null;

  const IconComponent = skill.icon;
  const isOrange = skill.accentColor === "orange";

  const glowBorder = isOrange ? "border-orange-500/50 shadow-orange-500/20" : "border-cyan-500/50 shadow-cyan-500/20";
  const neonText = isOrange ? "text-orange-400" : "text-cyan-400";
  const neonBgPill = isOrange ? "bg-orange-500/15 border-orange-500/30 text-orange-300" : "bg-cyan-500/15 border-cyan-500/30 text-cyan-300";
  const progressGradient = isOrange ? "from-orange-500 via-amber-400 to-amber-300" : "from-cyan-500 via-teal-400 to-emerald-300";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
      style={{ perspective: 1200 }}
    >
      {/* 3D Computer Window Chassis */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.88, rotateX: 10, y: 30 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotateX: -8, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => e.stopPropagation()}
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full max-w-2xl my-auto rounded-2xl bg-[#03060c]/98 border ${glowBorder} shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl text-zinc-100 overflow-hidden select-none`}
      >
        {/* CRT Scanlines and Matrix Grid */}
        <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

        {/* Ambient Top Glow */}
        <div
          className={`absolute -top-32 -left-20 w-80 h-80 rounded-full blur-[140px] pointer-events-none opacity-20 ${
            isOrange ? "bg-orange-500" : "bg-emerald-500"
          }`}
        />
        <div
          className={`absolute -bottom-32 -right-20 w-80 h-80 rounded-full blur-[140px] pointer-events-none opacity-20 ${
            isOrange ? "bg-amber-500" : "bg-cyan-500"
          }`}
        />

        {/* Futuristic Circuit Grid Lines Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

        {/* Top Computer Window Title Bar */}
        <div className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.03]">
          {/* OS Window Traffic Lights */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer shadow-sm shadow-red-500/50"
              />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 font-mono text-[11px] text-zinc-400">
              <span className={neonText}>SYS://WORKSTATION.OS</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300">SKILL_EXPLORER.EXE</span>
            </div>
          </div>

          {/* Center / Right Telemetry Status */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ONLINE</span>
            </div>

            {/* Futuristic Close (×) Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/15"
              aria-label="Close window"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Computer Application Body with Layered Depth */}
        <div className="relative z-10 p-6 sm:p-8 space-y-6">
          {/* 1. Skill Header Panel */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-center gap-4">
              {/* Animated Skill Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 350, damping: 20 }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center p-3 shadow-xl backdrop-blur-xl border ${
                  isOrange
                    ? "bg-gradient-to-tr from-orange-500/20 to-amber-500/10 border-orange-500/40 text-orange-400 shadow-orange-500/20"
                    : "bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-400 shadow-cyan-500/20"
                }`}
              >
                <IconComponent size={28} />
              </motion.div>

              {/* Skill Name Heading */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="flex items-center gap-2 mb-1"
                >
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${neonBgPill}`}>
                    {skill.category === "technical" ? "Technical Skill" : "Cognitive & Soft Skill"}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">SYS_ID #0{skillName.charCodeAt(0)}</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight flex items-center gap-2"
                >
                  {skill.name}
                  <span className={`text-xs font-mono font-normal ${neonText}`}>.core</span>
                </motion.h2>
              </div>
            </div>

            {/* Live Indicator Chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="hidden sm:flex flex-col items-end text-right font-mono"
            >
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Architecture</div>
              <div className={`text-xs font-semibold ${neonText}`}>Optimized Runtime</div>
            </motion.div>
          </div>

          {/* 2. Description Panel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${isOrange ? "bg-orange-500" : "bg-cyan-500"}`} />
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 pl-2">
              <Terminal size={12} className={neonText} />
              <span>Skill Specification</span>
            </div>
            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed pl-2 font-sans font-normal">
              {skill.description}
            </p>
          </motion.div>

          {/* 3. Knowledge / Strength Level Meter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 uppercase tracking-wider">
                  {skill.category === "technical" ? "KNOWLEDGE LEVEL" : "STRENGTH LEVEL"}
                </span>
                <span className="text-zinc-600">//</span>
                <span className={`font-bold tracking-wider ${neonText}`}>{skill.levelLabel.toUpperCase()}</span>
              </div>
              <div className="text-zinc-400 font-mono tracking-widest text-[11px] hidden sm:block">
                {skill.levelBars}
              </div>
            </div>

            {/* Glowing Animated Progress Bar */}
            <div className="relative w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.levelPercent}%` }}
                transition={{ delay: 0.45, duration: 0.9, ease: "easeOut" }}
                className={`h-full rounded-full bg-gradient-to-r ${progressGradient} relative shadow-lg`}
              >
                {/* Subtle Shimmer highlight */}
                <span className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
              </motion.div>
            </div>
          </motion.div>

          {/* 4. Concepts / Technologies / Key Areas Chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="space-y-2.5"
          >
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <CornerDownRight size={13} className={neonText} />
              <span>{skill.conceptsLabel.toUpperCase()}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {skill.concepts.map((concept, index) => (
                <motion.span
                  key={concept}
                  initial={{ opacity: 0, scale: 0.8, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.52 + index * 0.06, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs border backdrop-blur-md transition-all select-none ${
                    isOrange
                      ? "bg-orange-500/10 text-orange-200 border-orange-500/30 hover:border-orange-400 hover:bg-orange-500/20"
                      : "bg-cyan-500/10 text-cyan-200 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/20"
                  }`}
                >
                  <span className="text-zinc-500 mr-1.5">[</span>
                  <span>{concept}</span>
                  <span className="text-zinc-500 ml-1.5">]</span>
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* 5. My Experience Terminal Box */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono space-y-1.5 text-xs sm:text-sm"
          >
            <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-white/5 pb-1 mb-2">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck size={13} className={neonText} />
                <span>MY EXPERIENCE & APPLICATION</span>
              </span>
              <span className="text-zinc-600 hidden sm:inline">STDIO_LOG</span>
            </div>

            <div className="flex items-start gap-2 text-zinc-300 font-sans leading-relaxed">
              <span className={`font-mono ${neonText} shrink-0 mt-0.5`}>$&gt;</span>
              <p className="text-zinc-200">{skill.experience}</p>
            </div>
          </motion.div>

          {/* Footer Telemetry & Close Guidance */}
          <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-white/5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>STATUS: OPERATIONAL</span>
            </span>
            <span className="flex items-center gap-3">
              <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-400">
                ESC
              </kbd>
              <span>or click outside to close</span>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SkillComputerModal;
