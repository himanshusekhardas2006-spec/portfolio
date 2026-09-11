"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Folder,
  FolderOpen,
  ExternalLink,
  Layers,
  Sparkles,
  X,
  ChevronRight,
  Terminal,
  GitBranch,
  Code2,
  CheckCircle2,
} from "lucide-react";
import MagneticPopText from "@/components/ui/MagneticPopText";

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.38 6.52-1.6 6.52-7.1a4.8 4.8 0 0 0-1.3-3.31 4.4 4.4 0 0 0-.1-3.2s-1.1-.35-3.5 1.25a12.1 12.1 0 0 0-6.4 0C6.9 1.45 5.8 1.8 5.8 1.8a4.4 4.4 0 0 0-.1 3.2 4.8 4.8 0 0 0-1.3 3.3c0 5.4 3.3 6.7 6.5 7.1a4.8 4.8 0 0 0-1 3.03v4" />
  </svg>
);

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  role: string;
  github?: string;
  demo?: string;
  highlights: string[];
}

export const PROJECTS: ProjectData[] = [
  {
    id: "easybuy",
    title: "EasyBuy",
    subtitle: "FULL-STACK E-COMMERCE PLATFORM",
    description:
      "A daily essentials e-commerce web application with product search, filtering, cart management, seamless checkout, order tracking, and comprehensive admin dashboard.",
    longDescription:
      "EasyBuy is a comprehensive full-stack e-commerce solution engineered to streamline online retail. It provides customers with an intuitive product catalog, responsive cart state, simulated checkout processing, and real-time order tracking. The administrative portal enables store owners to manage inventory, categories, customers, and fulfillment workflows.",
    image: "/assets/projects/easybuy.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Flask", "SQLite"],
    role: "Core Developer & System Architect",
    github: "https://github.com/",
    demo: "#",
    highlights: [
      "Dynamic catalog browsing with multi-parameter filtering and search",
      "Robust cart and session state management",
      "Administrative portal with inventory and order fulfillment controls",
      "Relational database schema with SQLite and Flask ORM",
    ],
  },
  {
    id: "uhims",
    title: "UHIMS",
    subtitle: "URBAN HEAT ISLAND MITIGATION SIMULATOR",
    description:
      "An AI-driven climate tech concept analyzing urban microclimates, pinpointing temperature hotspots, and simulating tree canopy and cool pavement mitigations.",
    longDescription:
      "UHIMS (Urban Heat Island Mitigation Simulator) utilizes GIS spatial analysis, satellite surface telemetry, and machine learning models to simulate microclimate dynamics across densely populated urban centers. The platform models cooling interventions such as urban forestry, reflective pavement, and green corridors, providing actionable environmental metrics for urban planners.",
    image: "/assets/projects/uhims.jpg",
    tags: ["Python", "Machine Learning", "GIS Mapping", "Data Visualization"],
    role: "Lead Researcher & Algorithm Designer",
    github: "https://github.com/",
    demo: "#",
    highlights: [
      "Satellite temperature raster ingestion and thermal anomaly detection",
      "Tree canopy coverage simulation with microclimate impact projections",
      "Cool pavement reflective coefficient calculation module",
      "Spatial heat map rendering with contour gradient visualization",
    ],
  },
  {
    id: "dfuse",
    title: "D-FUSE",
    subtitle: "DISASTER EVIDENCE FUSION ENGINE",
    description:
      "A multi-source disaster response engine synthesizing fragmented telemetry, social reports, and sensor streams to optimize evidence-backed rescue operations.",
    longDescription:
      "D-FUSE is an emergency intelligence architecture built to resolve crisis data chaos. By aggregating citizen reports, weather radars, and drone telemetry through multi-source data fusion algorithms, D-FUSE generates an actionable Common Operating Picture (COP) for first responders and disaster management authorities.",
    image: "/assets/projects/dfuse.jpg",
    tags: ["Data Fusion", "Crisis AI", "Python", "Spatial Analytics"],
    role: "Data Pipeline & Synthesis Engineer",
    github: "https://github.com/",
    demo: "#",
    highlights: [
      "Multi-source heterogeneous crisis stream ingestion pipeline",
      "Evidence verification scoring and deduplication algorithm",
      "Priority triage heatmap generation for rescue deployments",
      "Offline-first synchronization for low-connectivity disaster zones",
    ],
  },
  {
    id: "voice-cloning",
    title: "AI Voice Cloning Detection",
    subtitle: "BIOMETRIC AUDIO SECURITY // SIH 2026",
    description:
      "An SIH 2026 cybersecurity innovation project engineered to identify synthetic voice deepfakes, evaluate impersonation fraud risk, and safeguard human verification.",
    longDescription:
      "Engineered for Smart India Hackathon (SIH 2026), this audio security system conducts deep spectral analysis on incoming voice feeds. By identifying acoustic phase artifacts, unnatural pitch distributions, and synthetic breath cadences, it differentiates human speech from generative voice models (e.g., ElevenLabs, VALL-E) in real time.",
    image: "/assets/projects/voice-cloning.jpg",
    tags: ["Cybersecurity", "Audio Forensics", "Deep Learning", "Signal Processing"],
    role: "Biometric AI & Forensics Developer",
    github: "https://github.com/",
    demo: "#",
    highlights: [
      "Mel-spectrogram feature extraction and phase coherence evaluation",
      "Dual-stream CNN-Transformer model classifying authentic vs. synthetic audio",
      "Low-latency inference pipeline optimized for telecom call verification",
      "Impersonation risk confidence index generation",
    ],
  },
];

export function ProjectFolder3D() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <div className="w-full relative font-mono">
      {/* 3D Folder Header / Toggle Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white tracking-tight">
            <MagneticPopText as="span">MY REPOSITORIES</MagneticPopText>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl">
            Inspect software applications, AI simulators, and production-tested architectures.
          </p>
        </div>

        {/* 3D Physical Folder Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-3 px-5 py-3 rounded-xl bg-[#03060c] border border-emerald-500/30 text-white shadow-xl hover:border-emerald-400 transition-all cursor-pointer select-none self-start md:self-auto"
        >
          <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
            {isOpen ? <FolderOpen size={18} /> : <Folder size={18} />}
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase tracking-wider text-emerald-400">
              Projects Folder
            </div>
            <div className="text-xs font-bold text-white">
              {isOpen ? "Close Folder" : "Open Folder (4 Repos)"}
            </div>
          </div>
        </motion.button>
      </div>

      {/* 3D FOLDER CONTAINER */}
      <div className="relative rounded-2xl p-6 md:p-8 border border-white/10 bg-[#04070d]/90 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[500px]">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* 3D Folder Spine / IDE Status Bar */}
        <div className="relative flex items-center justify-between pb-5 mb-8 border-b border-white/10 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-zinc-400 pl-2 border-l border-white/10 flex items-center gap-1.5">
              <GitBranch size={13} className="text-emerald-400" />
              <span>Projects Directory</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <Layers size={13} className="text-cyan-400" />
            <span>{PROJECTS.length} ACTIVE MODULES</span>
          </div>
        </div>

        {/* FANNED 3D PROJECT CARDS */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-7 relative z-10"
            >
              {PROJECTS.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{
                    y: -6,
                    rotateX: 2,
                    rotateY: -1,
                    scale: 1.015,
                  }}
                  className="group relative flex flex-col bg-black/60 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-md cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  style={{
                    perspective: 1000,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* 3D Preview Image Container */}
                  <div className="relative w-full h-52 md:h-60 overflow-hidden bg-black/80">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-[#04070d]/50 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                        {project.subtitle}
                      </span>
                      <span className="w-7 h-7 rounded-lg bg-black/70 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-emerald-400 group-hover:border-emerald-400/50 transition-colors backdrop-blur-md">
                        <ExternalLink size={13} />
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3.5 left-4 right-4 z-10">
                      <h3 className="text-xl md:text-2xl font-bold font-heading text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                        <span>{project.title}</span>
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col justify-between flex-1 bg-[#04070d]/80 border-t border-white/5">
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                      {project.description}
                    </p>

                    <div>
                      {/* Tech Tags formatted as clean pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-[10px] font-mono text-emerald-300/90 group-hover:border-emerald-500/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-zinc-400 font-mono text-[11px]">
                          Author: <span className="text-white">Himanshu</span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                          <span>Inspect Project</span>
                          <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* CLOSED FOLDER VIEW */
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="w-full py-16 flex flex-col items-center justify-center text-center cursor-pointer group select-none"
            >
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5 shadow-2xl group-hover:scale-110 group-hover:border-emerald-400 transition-all">
                <Folder size={40} />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                REPOSITORY WORKSPACE MINIMIZED
              </h3>
              <p className="text-zinc-400 text-xs max-w-sm mb-5">
                Click anywhere to expand the terminal drawer and inspect all {PROJECTS.length} repositories.
              </p>
              <span className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-bold text-xs shadow-lg shadow-emerald-500/20">
                Open Workspace
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PROJECT DETAIL MODAL - DEVELOPER REPO INSPECTOR */}
      <AnimatePresence>
        {selectedProject && (
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#04070d] border border-emerald-500/40 rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95),_0_0_35px_rgba(16,185,129,0.25)] text-white cursor-default"
            >
              {/* Prominent Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                className="absolute top-4 right-4 md:top-5 md:right-5 z-50 flex items-center justify-center w-10 h-10 rounded-xl bg-black/80 hover:bg-red-500 text-white border border-white/20 hover:border-red-400 transition-all duration-200 cursor-pointer hover:scale-105"
              >
                <X size={18} />
              </button>

              {/* Inspector Header */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 pb-3 mb-4 border-b border-white/10">
                <span className="text-emerald-400 font-bold">$</span>
                <span>cat /projects/{selectedProject.id}/README.md</span>
              </div>

              {/* Modal Image */}
              <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-6 border border-white/10">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-black/80 px-3 py-1 rounded-full border border-emerald-500/30">
                    {selectedProject.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading mt-2">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="text-xs uppercase text-zinc-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Terminal size={12} className="text-emerald-400" />
                    <span>SYSTEM_OVERVIEW</span>
                  </h4>
                  <p className="text-zinc-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs uppercase text-zinc-400 tracking-wider mb-3 flex items-center gap-1.5">
                    <Code2 size={12} className="text-cyan-400" />
                    <span>ARCHITECTURAL_HIGHLIGHTS</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <span className="text-emerald-400 font-bold mt-0.5">[✔]</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs uppercase text-zinc-400 tracking-wider mb-2">
                    TECH_STACK_MANIFEST
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300"
                      >
                        [ {tag} ]
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                  <div className="text-xs text-zinc-400">
                    ROLE: <span className="text-white font-semibold">{selectedProject.role}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                    <a
                      href={selectedProject.github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                    >
                      <GithubIcon /> View Source Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectFolder3D;
