"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "ai",
    text: "Hello! I'm Himanshu's AI assistant. Ask me anything about his full-stack web projects, skills, education at GIET University, or his visit to IIT Guwahati!",
    time: "Just now",
  },
];

const SUGGESTED_QUESTIONS = [
  "What are your primary skills?",
  "Tell me about your projects",
  "Tell me about your IIT Guwahati visit",
  "How can I contact or hire you?",
];

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Context-grounded intelligent answer generator
    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) {
        reply =
          "Himanshu's core technical skills include HTML, CSS, JavaScript, Python, C, SQL, and PHP. On the framework side, he works with React, Next.js, and Flask. He also brings strong problem solving, adaptability, and teamwork capabilities.";
      } else if (
        lower.includes("project") ||
        lower.includes("work") ||
        lower.includes("portfolio") ||
        lower.includes("easybuy") ||
        lower.includes("uhims") ||
        lower.includes("dfuse") ||
        lower.includes("voice")
      ) {
        reply =
          "Himanshu has built several notable applications:\n• EasyBuy: A full-stack e-commerce web app built with Python Flask & SQLite.\n• UHIMS: Urban Heat Island Mitigation Simulator with AI & GIS canopy mapping.\n• D-FUSE: Dynamic Disaster Evidence Fusion Engine for crisis decision-making.\n• AI Voice Cloning Detection: An SIH 2026 biometric audio security prototype.";
      } else if (
        lower.includes("iit") ||
        lower.includes("guwahati") ||
        lower.includes("visit") ||
        lower.includes("achievement")
      ) {
        reply =
          "A major milestone for Himanshu was representing GIET University at the Indian Institute of Technology (IIT) Guwahati. He was selected to participate in technical symposiums, research forums, and collaborative engineering showcases!";
      } else if (
        lower.includes("contact") ||
        lower.includes("hire") ||
        lower.includes("email") ||
        lower.includes("reach") ||
        lower.includes("linkedin")
      ) {
        reply =
          "You can reach Himanshu directly via email at himanshusekhardas2006@gmail.com, or connect with him on LinkedIn (linkedin.com/in/himanshu-sekhar-das-444933377) and Instagram (@him._anshuu). He is actively looking for software engineering internships and junior developer opportunities!";
      } else if (lower.includes("education") || lower.includes("college") || lower.includes("giet")) {
        reply =
          "Himanshu is currently pursuing his B.Tech in Computer Science Engineering at GIET University (Gandhi Institute of Engineering and Technology University). He completed his Intermediate in Science (+2) at DAV SDPS PUBLIC SCHOOL and matriculation at DPS Vidyapeeth.";
      } else {
        reply =
          "Himanshu is an aspiring Full Stack Developer from Bhadrak, Odisha, currently studying CSE at GIET University. He is passionate about building practical digital applications, exploring AI, and collaborating on high-impact projects. Feel free to ask about his specific projects or resume!";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* FLOATING PILL BUTTON */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-zinc-900/90 border border-orange-500/40 text-white shadow-2xl shadow-orange-500/20 backdrop-blur-xl hover:border-orange-400 transition-all cursor-pointer group"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-black font-bold text-xs">
            <Bot size={18} />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-900 animate-pulse" />
        </div>
        <div className="text-left pr-1">
          <div className="text-xs font-bold font-heading text-white flex items-center gap-1">
            Ask Himanshu AI <Sparkles size={11} className="text-orange-400" />
          </div>
          <div className="text-[10px] text-zinc-400 font-mono">Online · Ask anything</div>
        </div>
      </motion.button>

      {/* CHAT DRAWER / PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-sm sm:max-w-md h-[550px] max-h-[85vh] rounded-3xl bg-zinc-950/95 border border-orange-500/30 shadow-2xl shadow-orange-500/15 backdrop-blur-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-zinc-900/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-black">
                  <Bot size={20} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-900" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Himanshu AI <span className="text-[10px] font-mono font-normal text-orange-400 border border-orange-500/30 px-1.5 py-0.2 rounded-full">v1.0</span>
                  </h3>
                  <p className="text-[11px] text-zinc-400">Contextual Assistant</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === "user"
                        ? "bg-orange-500 text-black font-semibold text-xs"
                        : "bg-zinc-800 text-orange-400"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 whitespace-pre-line leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black font-medium"
                        : "bg-zinc-900 border border-white/10 text-zinc-200"
                    }`}
                  >
                    <p className="text-xs md:text-sm">{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1.5 ${
                        msg.sender === "user" ? "text-black/70 text-right" : "text-zinc-500"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
                  <Bot size={14} className="text-orange-400 animate-pulse" />
                  <span>Himanshu AI is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Chips */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/40 overflow-x-auto flex gap-2 no-scrollbar">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] bg-white/5 hover:bg-orange-500/20 hover:text-orange-300 border border-white/10 hover:border-orange-500/40 text-zinc-400 transition-all cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-zinc-900/90 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skills, projects, IIT..."
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-orange-500 text-black disabled:opacity-40 hover:bg-orange-400 transition-colors cursor-pointer"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatWidget;
