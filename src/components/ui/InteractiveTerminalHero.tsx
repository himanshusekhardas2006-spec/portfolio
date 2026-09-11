"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  FileCode2,
  FolderGit2,
  Play,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Code2,
  Sparkles,
  Cpu,
} from "lucide-react";
import TiltButton from "./TiltButton";

const CODE_LINES = [
  { num: 1, text: '// Developer Profile & Systems Architecture' },
  { num: 2, text: 'interface FullStackDeveloper {' },
  { num: 3, text: '  name: string;' },
  { num: 4, text: '  role: string;' },
  { num: 5, text: '  education: string;' },
  { num: 6, text: '  location: string;' },
  { num: 7, text: '  coreStack: string[];' },
  { num: 8, text: '}' },
  { num: 9, text: '' },
  { num: 10, text: 'export const developer: FullStackDeveloper = {' },
  { num: 11, text: '  name: "RR HIMANSHU SEKHAR DAS",' },
  { num: 12, text: '  role: "Aspiring Full Stack Engineer",' },
  { num: 13, text: '  education: "B.Tech in CSE @ GIET University",' },
  { num: 14, text: '  location: "Bhadrak, Odisha, India",' },
  { num: 15, text: '  coreStack: ["React", "Next.js", "Python", "Flask", "SQL", "Three.js"],' },
  { num: 16, text: '};' },
];

export function InteractiveTerminalHero() {
  const [activeTab, setActiveTab] = useState<"code" | "bash">("code");
  const [copied, setCopied] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  // Smooth typing effect for terminal command
  const fullCommand = "npx run portfolio --profile=himanshu --status=ready";
  const [typedCommand, setTypedCommand] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = () => {
    const codeText = CODE_LINES.map((l) => l.text).join("\n");
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-[#04070d]/95 border border-emerald-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-2xl overflow-hidden font-mono text-zinc-200 select-none">
      {/* 1. Terminal / IDE Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#020408] border-b border-emerald-500/20 text-xs">
        {/* Traffic Lights */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:opacity-100 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity" />
          </div>

          {/* Editor Tabs */}
          <div className="flex items-center gap-1 pl-3 border-l border-white/10">
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                activeTab === "code"
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <FileCode2 size={12} className="text-emerald-400" />
              <span>developer.ts</span>
            </button>

            <button
              onClick={() => setActiveTab("bash")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                activeTab === "bash"
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Terminal size={12} className="text-cyan-400" />
              <span>bash ~ terminal</span>
            </button>
          </div>
        </div>

        {/* Right Telemetry Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            title="Copy code snippet"
            className="p-1 rounded text-zinc-500 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            git:(main)*
          </span>
        </div>
      </div>

      {/* 2. Interactive Terminal Body */}
      <div className="p-5 sm:p-7 relative min-h-[290px]">
        {/* Subtle CRT Scanline overlay */}
        <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />

        {activeTab === "code" ? (
          <div className="space-y-1 text-xs sm:text-sm leading-relaxed overflow-x-auto">
            {/* Command Prompt simulation */}
            <div className="flex items-center gap-2 text-zinc-400 pb-2 mb-2 border-b border-white/5 text-[11px]">
              <span className="text-emerald-400 font-bold">$</span>
              <span>{typedCommand}</span>
              <span className="inline-block w-1.5 h-3.5 bg-emerald-400 animate-terminal-cursor ml-0.5" />
            </div>

            {/* Syntax Highlighted Code Display */}
            {CODE_LINES.map((line) => {
              if (line.text === '') return <div key={line.num} className="h-2" />;
              const isComment = line.text.startsWith('//');
              const isInterface = line.text.includes('interface') || line.text.includes('export');
              return (
                <div key={line.num} className="flex items-center gap-4 hover:bg-white/[0.02] px-1 rounded transition-colors">
                  <span className="text-zinc-600 select-none text-[11px] w-6 text-right shrink-0">
                    {line.num}
                  </span>
                  <div className="font-mono flex-1">
                    {isComment ? (
                      <span className="text-zinc-500 italic">{line.text}</span>
                    ) : (
                      <span className="tracking-wide">
                        {line.text.split('"').map((part, i) => {
                          if (i % 2 === 1) {
                            return <span key={i} className="text-cyan-300 font-medium">"{part}"</span>;
                          }
                          return (
                            <span key={i}>
                              {part.split(/(\b(?:const|export|interface|string)\b)/).map((word, wIdx) => {
                                if (['const', 'export', 'interface'].includes(word)) {
                                  return <span key={wIdx} className="text-emerald-400 font-semibold">{word}</span>;
                                }
                                if (word === 'string') {
                                  return <span key={wIdx} className="text-amber-300 font-medium">{word}</span>;
                                }
                                return word;
                              })}
                            </span>
                          );
                        })}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Bash Interactive Console Tab */
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <div className="flex items-center gap-2 text-zinc-400 text-xs">
              <span className="text-emerald-400">himanshu@workstation:~$</span>
              <span className="text-zinc-200">whoami && uname -a</span>
            </div>
            <div className="text-zinc-400 pl-4 border-l border-emerald-500/30 text-xs space-y-1">
              <p className="text-emerald-300">&gt; User: RR HIMANSHU SEKHAR DAS (UID: 1000)</p>
              <p>&gt; System: Linux Workstation x86_64 // Node.js v20 // Turbopack Active</p>
              <p>&gt; Academic: GIET University, Gunupur &middot; B.Tech Computer Science</p>
              <p>&gt; Target: Full Stack Engineering Internships &amp; SDE-1 Opportunities</p>
            </div>
            <div className="flex items-center gap-2 pt-2 text-xs">
              <span className="text-emerald-400">himanshu@workstation:~$</span>
              <span className="text-cyan-300">cat /etc/mission.txt</span>
            </div>
            <p className="text-zinc-300 text-xs pl-4 italic">
              "Building modern, performant, and reliable full-stack digital architectures with a passion for creative 3D computing and AI integration."
            </p>
            <div className="flex items-center gap-2 text-xs pt-1">
              <span className="text-emerald-400">himanshu@workstation:~$</span>
              <span className="w-2 h-4 bg-emerald-400 animate-terminal-cursor" />
            </div>
          </div>
        )}

        {/* 3. Terminal Bottom Action Controls */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all hover:scale-105 cursor-pointer"
            >
              <Terminal size={14} />
              <span>View Works</span>
              <ChevronRight size={14} />
            </a>

            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-white/[0.04] text-zinc-200 hover:text-white border border-white/10 hover:border-emerald-500/40 transition-all hover:scale-105"
            >
              <FileCode2 size={14} className="text-emerald-400" />
              <span>Resume</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-white/[0.04] text-zinc-200 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-all hover:scale-105"
            >
              <span>Contact Me</span>
            </a>
          </div>

          <div className="text-[11px] text-zinc-500 font-mono hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>DEV_SHELL: READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveTerminalHero;
