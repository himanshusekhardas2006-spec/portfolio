"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ExternalLink,
  Mail,
  Download,
  ChevronRight,
  Send,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Code2,
  Heart,
  FileText,
  Terminal,
  Cpu,
  Activity,
  Dumbbell,
  Globe,
  BrainCircuit,
  Camera,
  Target,
  Flame,
  Zap,
  X,
} from "lucide-react";
import Image from "next/image";

import { Navbar } from "@/components/Navbar";
import KineticGrid from "@/components/ui/kinetic-grid";
import { Section, SectionHeader } from "@/components/Section";
import { ImageModal } from "@/components/ImageModal";
import MagneticPopText from "@/components/ui/MagneticPopText";
import TiltButton from "@/components/ui/TiltButton";
import TiltCard from "@/components/ui/TiltCard";
import WelcomeIntro from "@/components/3d/WelcomeIntro";
import Hero3DCanvas from "@/components/3d/Hero3DCanvas";
import ProjectFolder3D from "@/components/3d/ProjectFolder3D";
import CertificateFolder3D from "@/components/3d/CertificateFolder3D";
import Floating3DAvatar from "@/components/3d/Floating3DAvatar";
import AIChatWidget from "@/components/ui/AIChatWidget";
import SkillComputerModal from "@/components/ui/SkillComputerModal";
import { ConstellationField } from "@/shaders/constellation-field/ConstellationField";
import { TerminalBootLoader } from "@/components/ui/TerminalBootLoader";
import { CodeMatrixBackground } from "@/components/ui/CodeMatrixBackground";
import { InteractiveTerminalHero } from "@/components/ui/InteractiveTerminalHero";

const GithubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.38 6.52-1.6 6.52-7.1a4.8 4.8 0 0 0-1.3-3.31 4.4 4.4 0 0 0-.1-3.2s-1.1-.35-3.5 1.25a12.1 12.1 0 0 0-6.4 0C6.9 1.45 5.8 1.8 5.8 1.8a4.4 4.4 0 0 0-.1 3.2 4.8 4.8 0 0 0-1.3 3.3c0 5.4 3.3 6.7 6.5 7.1a4.8 4.8 0 0 0-1 3.03v4" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface InterestItemData {
  name: string;
  category: string;
  badge: string;
  tagline: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  highlights: { label: string; detail: string }[];
  engineeringConnection: string;
}

const INTERESTS_DATA: Record<string, InterestItemData> = {
  "Outdoor Games": {
    name: "Outdoor Games & Athletics",
    category: "ATHLETICS // SPRINTER & GYM",
    badge: "100m · 200m Track · Gym Fitness",
    tagline: "Competitive 100m/200m Sprinter & Dedicated Gym Fitness Enthusiast",
    icon: Dumbbell,
    description:
      "As an athletic sprinter competing in 100m and 200m track events, speed, explosive acceleration, and physical discipline define my lifestyle. Beyond track racing, I dedicate regular hours to intensive gym workouts and strength conditioning. Athleticism builds the mental resilience, laser focus, and raw stamina that power my software engineering sessions.",
    highlights: [
      { label: "Track Events", detail: "100m & 200m Competitive Sprinting" },
      { label: "Fitness Training", detail: "Intensive Gym Workouts & Strength Conditioning" },
      { label: "Athletic Identity", detail: "High-Energy Athleticism & Explosive Agility" },
      { label: "Endurance & Mindset", detail: "Physical Stamina, Consistency & Mental Grit" },
    ],
    engineeringConnection:
      "A 100m sprint demands instantaneous reaction times, flawless posture, and zero hesitation under intense pressure. This athletic discipline directly shapes my engineering mindset: solving bugs swiftly, executing under deadlines, and maintaining relentless focus through multi-hour programming sprints.",
  },
  "Web Development": {
    name: "Web Development",
    category: "FULL-STACK ARCHITECTURE",
    badge: "Next.js · React · Node · Modern CSS",
    tagline: "Building High-Performance, Immersive Digital Web Applications",
    icon: Globe,
    description:
      "Crafting production-ready full-stack web platforms that combine high-performance logic with sleek, responsive, and futuristic user interfaces. Specializing in modern component architectures, state workflows, RESTful API integrations, and developer-friendly codebases.",
    highlights: [
      { label: "Core Stack", detail: "Next.js 14, React, Tailwind CSS, TypeScript" },
      { label: "Interactive UX", detail: "Framer Motion, 3D Canvas, Responsive UX" },
      { label: "Backend Integration", detail: "REST APIs, Node.js, Database Schemas" },
      { label: "Performance", detail: "Sub-Second Load Times & Clean Routing" },
    ],
    engineeringConnection:
      "Web applications are the most direct bridge between complex software engineering and millions of global users. Delivering seamless, glitch-free UI builds lasting trust.",
  },
  "Programming": {
    name: "Programming",
    category: "SOFTWARE CONSTRUCTION",
    badge: "Python · C · JavaScript · SQL · PHP",
    tagline: "Mastering Core Computer Science Languages & Clean Architecture",
    icon: Code2,
    description:
      "Writing clean, modular, and performant code across multiple programming languages. Passionate about object-oriented principles, memory management in low-level languages like C, dynamic scripting in Python and JavaScript, and database query engineering.",
    highlights: [
      { label: "Multi-Language", detail: "Python, C, JavaScript, SQL, PHP" },
      { label: "Clean Code", detail: "Modular Architecture & DRY Principles" },
      { label: "Data Persistence", detail: "Relational Schemas & High-Efficiency Queries" },
      { label: "Engineering Rigor", detail: "Continuous Coding Practice & Git Workflows" },
    ],
    engineeringConnection:
      "Fluency across both low-level and high-level languages provides complete versatility to design solutions at any layer of the software stack.",
  },
  "Problem Solving": {
    name: "Problem Solving",
    category: "ALGORITHMS & LOGIC",
    badge: "DSA · Analytical Rigor · Edge Cases",
    tagline: "Deconstructing Complex Engineering Bottlenecks with Methodical Rigor",
    icon: Target,
    description:
      "Approaching engineering obstacles with analytical rigor and systematic decomposition. From analyzing time and space complexity to isolating edge cases in distributed code, I thrive on untangling intricate logic and creating mathematically optimal solutions.",
    highlights: [
      { label: "Methodology", detail: "Divide & Conquer, First-Principles Thinking" },
      { label: "Optimization", detail: "Time (O) & Space Complexity Reduction" },
      { label: "Debugging", detail: "Root Cause Isolation & Regression Testing" },
      { label: "Resilience", detail: "Tenacious persistence through stubborn roadblocks" },
    ],
    engineeringConnection:
      "Writing code is only 20% of engineering; the remaining 80% is understanding, modeling, and solving the core logical dilemma.",
  },
  "Artificial Intelligence": {
    name: "Artificial Intelligence",
    category: "INNOVATION & MACHINE LEARNING",
    badge: "GenAI · Voice Detection · Climate Tech",
    tagline: "Exploring Machine Learning Models & Applied Generative AI Hackathons",
    icon: BrainCircuit,
    description:
      "Exploring applied machine learning, neural networks, and modern Generative AI tooling. Actively participated in the Google Developer Group Build with AI 2026 hackathon and developed architectures for AI voice cloning detection and climate microclimate simulation.",
    highlights: [
      { label: "Hackathon Track", detail: "GDG Build with AI 2026 Intensive" },
      { label: "Cybersecurity ML", detail: "AI Voice Cloning Detection & Fraud Prevention" },
      { label: "Climate Tech", detail: "Urban Microclimate & Thermal Hotspot Analytics" },
      { label: "Techniques", detail: "Prompt Engineering, Model Integration, Telemetry" },
    ],
    engineeringConnection:
      "AI is the defining amplifier of our generation. Integrating intelligent models into full-stack systems turns static apps into adaptive cognitive platforms.",
  },
  "Photography": {
    name: "Photography",
    category: "CREATIVE PERSPECTIVE",
    badge: "Framing · Composition · Light Dynamics",
    tagline: "Honing Visual Sensitivity, Symmetry, and Storytelling",
    icon: Camera,
    description:
      "Exploring visual aesthetics through the lens of a camera. Capturing moments with careful attention to lighting angles, rule-of-thirds composition, and color grading. This hobby directly sharpens my design instincts and spatial intuition for modern web interfaces.",
    highlights: [
      { label: "Aesthetic Eye", detail: "Symmetry, Golden Ratio & Visual Balance" },
      { label: "Light Dynamics", detail: "Natural Light Sensitivity & Contrast Dynamics" },
      { label: "Micro-Details", detail: "Storytelling Through Focal Points & Shadows" },
      { label: "UI Synergy", detail: "Directly inspires clean, cinematic Web UI layouts" },
    ],
    engineeringConnection:
      "A great developer must appreciate both algorithmic correctness and visual delight. Photography ensures my software interfaces feel visually harmonious and human.",
  },
};

export default function Home() {
  const [selectedCert, setSelectedCert] = useState<{ src: string; alt: string } | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <>
      <TerminalBootLoader />
      <KineticGrid globalColor="default">
        <CodeMatrixBackground />
        <Navbar />

        <main className="flex flex-col min-h-screen relative overflow-hidden">
          {/* ───────────────────────────────────────────────────────── */}
          {/* 1. WELCOME 3D HERO (ThreeUI WarpField Keycap Drift)       */}
          {/* ───────────────────────────────────────────────────────── */}
          <WelcomeIntro />
          {/* ───────────────────────────────────────────────────────── */}
          {/* 2. DEVELOPER WORKSTATION / CODER HERO                     */}
          {/* ───────────────────────────────────────────────────────── */}
          <motion.section
            id="home"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative min-h-[92vh] flex flex-col items-center justify-center pt-8 pb-16 overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-10 left-1/3 w-[500px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
              {/* Developer Eyebrow Header */}
              <div className="w-full text-center mb-6 flex flex-col items-center">
                {/* NAME: Guaranteed in one single line with Full Large Font Size */}
                <div className="relative my-3 py-1 w-full flex justify-center items-center overflow-visible">
                  <h1 className="text-[clamp(1.85rem,5.6vw,6.5rem)] font-black font-heading tracking-tight leading-none text-white select-none whitespace-nowrap drop-shadow-[0_10px_32px_rgba(0,0,0,0.95)]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 via-teal-300 to-amber-400 inline-block whitespace-nowrap">
                      <MagneticPopText as="span" className="whitespace-nowrap flex-nowrap">
                        RR HIMANSHU SEKHAR DAS
                      </MagneticPopText>
                    </span>
                  </h1>
                </div>

                {/* Programmer tagline */}
                <h2 className="text-base sm:text-xl md:text-2xl text-zinc-300 font-mono font-medium mt-2 tracking-tight flex items-center justify-center gap-2">
                  <Code2 size={20} className="text-emerald-400 shrink-0" />
                  <span>Aspiring Full Stack Developer // CSE @ GIET University</span>
                </h2>
              </div>

              {/* Interactive IDE / Terminal Hero Component */}
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-5xl"
              >
                <InteractiveTerminalHero />
              </motion.div>
            </div>
          </motion.section>

          {/* ───────────────────────────────────────────────────────── */}
          {/* ABOUT SECTION                                             */}
          {/* ───────────────────────────────────────────────────────── */}
          <Section id="about">
            <SectionHeader
              title="Building while learning."
              subtitle="Computer Science Engineering student passionate about full stack web development, algorithmic problem solving, and intelligent digital solutions."
            />
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-2xl bg-[#04070d]/90 border border-emerald-500/25 p-6 sm:p-8 shadow-xl backdrop-blur-xl font-mono text-zinc-300 space-y-5">
                <p className="text-sm md:text-base leading-relaxed text-zinc-300">
                  I enjoy solving real-world challenges through clean code and modern architectures. Based in <strong className="text-white">Bhadrak, Odisha</strong>, I am actively preparing for software development engineering opportunities while contributing to impactful full-stack and algorithmic projects.
                </p>

                <div className="pt-3 border-t border-white/10 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">&gt;</span>
                    <span className="text-zinc-400">Origin:</span>
                    <strong className="text-zinc-100">Bhadrak, Odisha, India</strong>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-bold">&gt;</span>
                    <span className="text-zinc-400">Education:</span>
                    <strong className="text-zinc-100">B.Tech CSE @ GIET University (2025 - 2029)</strong>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-bold">&gt;</span>
                    <span className="text-zinc-400">Specialization:</span>
                    <strong className="text-zinc-100">Full Stack Engineering, Python, AI Concepts</strong>
                  </div>
                </div>
              </div>

              {/* 3D Glass Profile Showcase Card with 2nd Photo (face centered and kept in frame) */}
              <motion.div
                whileHover={{ rotateY: 6, rotateX: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-3xl p-3.5 border border-emerald-500/25 bg-gradient-to-br from-zinc-900/80 via-black/85 to-[#03060c] backdrop-blur-xl shadow-2xl overflow-hidden"
              >
                <div className="relative w-full aspect-[4/5] min-h-[420px] rounded-2xl overflow-hidden group bg-black/40">
                  <Image
                    src="/assets/images/portrait.jpg"
                    alt="RR HIMANSHU SEKHAR DAS"
                    fill
                    className="object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
                    <div>
                      <div className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
                        CSE UNDERGRADUATE
                      </div>
                      <div className="text-lg font-bold text-white font-heading">
                        GIET University
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-cyan-300 border border-white/10 backdrop-blur-md">
                      Batch 2029
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Section>

          {/* ───────────────────────────────────────────────────────── */}
          {/* 3D INTERACTIVE TELEMETRY & CORE (Placed AFTER About)      */}
          {/* ───────────────────────────────────────────────────────── */}
          <Section id="core-telemetry" delay={0.1}>
            <SectionHeader
              title="Interactive 3D Core & System Matrix."
              subtitle="Interact directly with the real-time Three.js particle core. Orbiting telemetry cards dynamically track core competencies, built repositories, and academic recognition."
            />
            <div className="relative w-full max-w-5xl mx-auto rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-zinc-950/90 via-black/95 to-[#040810] backdrop-blur-2xl shadow-2xl p-4 sm:p-6 md:p-8 overflow-hidden group">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-cyan-400 pl-2 border-l border-white/10 flex items-center gap-1.5">
                    <Cpu size={14} />
                    THREEJS_PARTICLE_CORE :: TELEMETRY_MATRIX.mesh
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-zinc-300">GPU ACCELERATED</span>
                </div>
              </div>

              {/* 3D Canvas Box - Spacious and fully visible without overlapping text */}
              <div className="w-full h-[450px] sm:h-[500px] md:h-[550px] relative">
                <Hero3DCanvas />
              </div>

              {/* Window Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500">
                <span>INTERACTION: HOVER &amp; ROTATE 3D CARDS</span>
                <span>ENGINE: THREE.JS + REACT THREE FIBER</span>
              </div>
            </div>
          </Section>

          {/* ───────────────────────────────────────────────────────── */}
          {/* 3. SKILLS SECTION — TWO FLOATING 3D PANELS                */}
          {/* ───────────────────────────────────────────────────────── */}
          <Section id="skills" delay={0.1}>
            <SectionHeader
              title="Technical expertise & soft skills."
              subtitle="Two interactive 3D floating glass panels. Click any skill to launch its futuristic 3D computer telemetry explorer."
            />
            <div className="grid md:grid-cols-2 gap-8">
              {/* Technical Skills 3D Panel */}
              <TiltCard glowColor="orange" className="p-8 group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[90px] pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    <Code2 size={22} />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    <MagneticPopText as="span">Technical Skills</MagneticPopText>
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Python",
                    "C",
                    "SQL",
                    "PHP",
                  ].map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <motion.button
                        key={skill}
                        type="button"
                        onClick={() => setSelectedSkill(skill)}
                        whileHover={{ scale: 1.08, y: -3 }}
                        whileTap={{ scale: 0.94 }}
                        className={`group/btn relative px-4 py-2.5 rounded-xl border font-mono text-sm cursor-pointer select-none transition-all duration-200 outline-none flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-orange-500/25 border-orange-400 text-orange-300 ring-1 ring-orange-400/60"
                            : "bg-zinc-900/90 border-white/10 text-zinc-100 hover:border-orange-500 hover:text-orange-300 hover:bg-orange-500/15"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400/60 group-hover/btn:bg-orange-400 transition-colors" />
                        <span>{skill}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </TiltCard>

              {/* Soft Skills 3D Panel */}
              <TiltCard glowColor="cyan" className="p-8 group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Sparkles size={22} />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    <MagneticPopText as="span">Soft Skills</MagneticPopText>
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Problem Solving",
                    "Creativity",
                    "Adaptability",
                    "Teamwork",
                    "Communication",
                    "Continuous Learning",
                  ].map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <motion.button
                        key={skill}
                        type="button"
                        onClick={() => setSelectedSkill(skill)}
                        whileHover={{ scale: 1.08, y: -3 }}
                        whileTap={{ scale: 0.94 }}
                        className={`group/btn relative px-4 py-2.5 rounded-xl border text-sm cursor-pointer select-none transition-all duration-200 outline-none flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-cyan-500/25 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400/60"
                            : "bg-zinc-900/90 border-white/10 text-zinc-100 hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/15"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 group-hover/btn:bg-cyan-400 transition-colors" />
                        <span>{skill}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </TiltCard>
            </div>
          </Section>

          {/* ───────────────────────────────────────────────────────── */}
          {/* 4. MY INTERESTS SECTION — FLOATING 3D PANEL & AVATAR      */}
          {/* ───────────────────────────────────────────────────────── */}
          <section id="interests" className="py-24 relative z-10 overflow-hidden">
            {/* Constellation Field Animation — full-bleed background */}
            <div className="absolute inset-0 -z-10">
              <ConstellationField
                mode="dark"
                speed={1.00}
                size={1.00}
                strokeWidth={1.00}
                length={1.00}
                density={1.00}
                opacity={1.00}
                hue={0}
                saturation={1.00}
                brightness={1.00}
                style={{ width: "100%", height: "100%", display: "block" }}
              />
              {/* Semi-transparent overlay so text stays readable over the constellation */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/85 via-[#070709]/60 to-[#070709]/85 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/70 via-transparent to-[#070709]/70 pointer-events-none" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="container mx-auto px-6 max-w-6xl"
            >
              <SectionHeader
                title="Passions & creative curiosities."
                subtitle="Interests that inspire my engineering mindset, problem solving, and technological exploration."
              />
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Interests Glass Card */}
                <div className="lg:col-span-7">
                  <TiltCard glowColor="purple" className="p-8 md:p-10 group h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <Heart size={22} />
                      </div>
                      <h3 className="text-2xl font-bold text-white font-heading">
                        <MagneticPopText as="span">My Interests</MagneticPopText>
                      </h3>
                    </div>

                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8">
                      Beyond core full stack programming, these areas expand my creative horizons, foster disciplined execution, and sharpen algorithmic intuition:
                    </p>

                    <div className="flex flex-wrap gap-2.5 mb-6">
                      {[
                        "Outdoor Games",
                        "Web Development",
                        "Programming",
                        "Problem Solving",
                        "Artificial Intelligence",
                        "Photography",
                      ].map((interestKey) => {
                        const isSelected = selectedInterest === interestKey;
                        const data = INTERESTS_DATA[interestKey];
                        const Icon = data ? data.icon : Sparkles;
                        return (
                          <motion.button
                            key={interestKey}
                            type="button"
                            onClick={() => setSelectedInterest(isSelected ? null : interestKey)}
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 select-none ${
                              isSelected
                                ? "bg-purple-500/25 border-purple-400 text-purple-200 ring-1 ring-purple-400/60 font-semibold"
                                : "bg-black/60 border-white/10 text-zinc-300 hover:border-purple-400/70 hover:text-purple-300 hover:bg-purple-500/10"
                            }`}
                          >
                            <Icon size={15} className={isSelected ? "text-purple-300" : "text-zinc-400"} />
                            <span>{interestKey === "Outdoor Games" ? "Outdoor Games & Athletics" : interestKey}</span>
                          </motion.button>
                        );
                      })}
                    </div>

                    {!selectedInterest && (
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60 animate-pulse" />
                        <span>Click any button above to explore detailed information & athletics</span>
                      </div>
                    )}

                    {/* Interactive Telemetry Data Box for Selected Interest */}
                    <AnimatePresence mode="wait">
                      {selectedInterest && INTERESTS_DATA[selectedInterest] && (
                        <motion.div
                          key={selectedInterest}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="rounded-2xl bg-black/80 border border-purple-500/30 p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden"
                        >
                          {/* Top Header */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-md">
                                {INTERESTS_DATA[selectedInterest].category}
                              </span>
                              <span className="text-[11px] font-mono text-zinc-400">
                                {INTERESTS_DATA[selectedInterest].badge}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300">
                                <Sparkles size={13} />
                                <span>TELEMETRY ACTIVE</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setSelectedInterest(null)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                title="Close details"
                              >
                                <X size={15} />
                              </button>
                            </div>
                          </div>

                          {/* Title and Tagline */}
                          <div className="mb-3">
                            <h4 className="text-lg sm:text-xl font-bold font-heading text-white flex items-center gap-2">
                              {React.createElement(INTERESTS_DATA[selectedInterest].icon, {
                                size: 20,
                                className: "text-purple-400 shrink-0",
                              })}
                              <span>{INTERESTS_DATA[selectedInterest].name}</span>
                            </h4>
                            <p className="text-xs sm:text-sm text-purple-300/90 font-mono mt-0.5">
                              {INTERESTS_DATA[selectedInterest].tagline}
                            </p>
                          </div>

                          {/* Narrative Description */}
                          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                            {INTERESTS_DATA[selectedInterest].description}
                          </p>

                          {/* 4 Highlights Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                            {INTERESTS_DATA[selectedInterest].highlights.map((item, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col"
                              >
                                <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider">
                                  {item.label}
                                </span>
                                <span className="text-xs font-medium text-white mt-0.5">
                                  {item.detail}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Engineering Takeaway Connection */}
                          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-start gap-2.5">
                            <Terminal size={15} className="text-purple-400 shrink-0 mt-0.5" />
                            <div className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed font-mono">
                              <span className="text-purple-300 font-bold">ENGINEERING INSIGHT: </span>
                              {INTERESTS_DATA[selectedInterest].engineeringConnection}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </TiltCard>
                </div>

                {/* Right Column: 3D Floating Avatar (1st Photo as requested) */}
                <div className="lg:col-span-5 flex justify-center">
                  <Floating3DAvatar />
                </div>
              </div>
            </motion.div>
          </section>

          {/* ───────────────────────────────────────────────────────── */}
          {/* 5. "MY WORKS" — 3D PROJECT FOLDER                         */}
          {/* ───────────────────────────────────────────────────────── */}
          <Section id="projects" delay={0.1}>
            <ProjectFolder3D />
          </Section>

          {/* ───────────────────────────────────────────────────────── */}
          {/* 6. "ACHIEVEMENTS" — 3D CERTIFICATE FOLDER & IIT GUWAHATI  */}
          {/* ───────────────────────────────────────────────────────── */}
          <Section id="achievements" delay={0.1}>
            <CertificateFolder3D
              onSelectCert={(cert) => setSelectedCert(cert)}
            />
          </Section>

          {/* ───────────────────────────────────────────────────────── */}
          {/* ───────────────────────────────────────────────────────── */}
          {/* 7. CONTACT SECTION — DEVELOPER CONSOLE & SOCIALS         */}
          {/* ───────────────────────────────────────────────────────── */}
          <Section id="contact" delay={0.1} className="mb-24">
            <div className="relative rounded-3xl p-8 md:p-14 border border-emerald-500/30 bg-gradient-to-br from-[#03060c]/95 via-black/90 to-[#040914] backdrop-blur-2xl shadow-2xl overflow-hidden font-mono">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
                  <MagneticPopText as="span">Initialize Connection</MagneticPopText>
                </h2>
                <p className="text-zinc-300 text-base md:text-lg">
                  Have an internship, full-stack opportunity, or software project? Let&apos;s build something exceptional together.
                </p>
              </div>

              <div className="grid md:grid-cols-12 gap-10 items-start">
                {/* Developer Console Contact Form */}
                <TiltCard glowColor="emerald" className="md:col-span-7 p-6 md:p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-[#03060c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[#03060c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hi Himanshu, I'd like to discuss a software engineering opportunity..."
                        className="w-full bg-[#03060c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 font-mono transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl font-bold font-mono text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send size={16} />
                      Send Message
                    </button>

                    {formSent && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2"
                      >
                        <CheckCircle2 size={16} />
                        <span>Transmission recorded! Thank you for contacting Himanshu.</span>
                      </motion.div>
                    )}
                  </form>
                </TiltCard>

                {/* 3D Social Link Pill Buttons */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-6 rounded-2xl bg-[#03060c]/90 border border-emerald-500/20 backdrop-blur-md">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-2">
                      <Mail size={13} />
                      <span>Direct Inquiries</span>
                    </h4>
                    <p className="text-sm font-semibold text-white mb-4">
                      RR HIMANSHU SEKHAR DAS
                    </p>
                    <a
                      href="mailto:himanshusekharadas2006@gmail.com"
                      className="flex items-center gap-2 text-zinc-300 hover:text-emerald-400 text-sm transition-colors"
                    >
                      <Mail size={16} className="text-emerald-400" />
                      himanshusekharadas2006@gmail.com
                    </a>
                  </div>

                  {/* 3D Pill Social Buttons */}
                  <div className="space-y-3">
                    <motion.a
                      href="https://www.linkedin.com/in/himanshu-sekhar-das-444933377"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-colors">
                          <LinkedinIcon />
                        </div>
                        <div>
                          <div className="text-sm font-bold">LinkedIn</div>
                          <div className="text-[11px] text-zinc-400 font-mono">
                            in/himanshu-sekhar-das-444933377
                          </div>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-zinc-500 group-hover:text-white" />
                    </motion.a>

                    <motion.a
                      href="https://www.instagram.com/him._anshuu/?__pwa=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all text-white group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 group-hover:bg-pink-500 group-hover:text-black transition-colors">
                          <InstagramIcon />
                        </div>
                        <div>
                          <div className="text-sm font-bold">Instagram</div>
                          <div className="text-[11px] text-zinc-400 font-mono">
                            @him._anshuu
                          </div>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-zinc-500 group-hover:text-white" />
                    </motion.a>

                    <motion.a
                      href="https://github.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-white group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                          <GithubIcon />
                        </div>
                        <div>
                          <div className="text-sm font-bold">GitHub</div>
                          <div className="text-[11px] text-zinc-400 font-mono">
                            github.com/himanshu
                          </div>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-zinc-500 group-hover:text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ───────────────────────────────────────────────────────── */}
          {/* FOOTER                                                    */}
          {/* ───────────────────────────────────────────────────────── */}
          <footer className="border-t border-white/10 bg-black/80 backdrop-blur-xl py-8 relative z-10 text-center">
            <p className="text-zinc-500 text-sm font-mono">
              &copy; {new Date().getFullYear()} RR HIMANSHU SEKHAR DAS &middot; Built with React Three Fiber, Next.js &amp; Tailwind CSS
            </p>
          </footer>
        </main>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* 8. AI CHAT ASSISTANT WIDGET ("Ask Himanshu AI")             */}
        {/* ─────────────────────────────────────────────────────────── */}
        <AIChatWidget />

        {/* Image Modal for Certificates / Highlights */}
        <ImageModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          imageSrc={selectedCert?.src || ""}
          altText={selectedCert?.alt || ""}
        />

        {/* Futuristic 3D Computer Skill Explorer Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <SkillComputerModal
              skillName={selectedSkill}
              onClose={() => setSelectedSkill(null)}
            />
          )}
        </AnimatePresence>
      </KineticGrid>
    </>
  );
}
