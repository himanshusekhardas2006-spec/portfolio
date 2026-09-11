"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileCode, Terminal, Sparkles, Send } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("welcome");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#welcome" },
    { name: "About", href: "#about" },
    { name: "Core", href: "#core-telemetry" },
    { name: "Skills", href: "#skills" },
    { name: "Works", href: "#projects" },
    { name: "Awards", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "py-2.5 bg-[#030508]/90 backdrop-blur-2xl border-b border-emerald-500/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
        {/* Hacker / Developer Logo */}
        <a href="#welcome" className="group flex items-center gap-2.5 font-mono">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs group-hover:border-emerald-400 group-hover:scale-105 transition-all">
            &lt;RH/&gt;
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              himanshu<span className="text-emerald-400">.dev</span>
            </span>
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: READY
            </span>
          </div>
        </a>

        {/* Desktop Developer Terminal Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-wider font-mono text-zinc-400 hover:text-emerald-300 transition-colors relative py-1 group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-emerald-300 bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 transition-all shadow-sm"
          >
            <FileCode size={13} className="text-emerald-400" />
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500 text-black hover:bg-emerald-400 hover:scale-105 transition-all cursor-pointer"
          >
            <Send size={13} />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-zinc-400 hover:text-emerald-400 p-2 font-mono"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#030508]/98 backdrop-blur-2xl border-b border-emerald-500/30 px-6 py-5 overflow-hidden font-mono"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-wider text-zinc-300 hover:text-emerald-400 transition-colors py-1"
                >
                  <span>{link.name}</span>
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex gap-3">
                <a
                  href="/assets/resume.pdf"
                  target="_blank"
                  className="flex-1 text-center py-2 rounded-lg border border-white/10 text-xs font-mono text-zinc-300 hover:border-emerald-500/40"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-lg bg-emerald-500 text-black text-xs font-bold font-mono shadow-md"
                >
                  Contact Me
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
