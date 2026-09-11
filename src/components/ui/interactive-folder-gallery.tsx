"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Folder, FolderOpen, FolderClosed, FolderArchive, Maximize2 } from "lucide-react";

export interface GalleryPhoto {
  id: string | number;
  image: string;
  title?: string;
  issuer?: string;
  badge?: string;
  grade?: string;
}

const defaultPhotos: GalleryPhoto[] = [
  {
    id: 1,
    image: "/assets/certificates/certificate-1.jpg",
    title: "Conceptual Framework for Financial Reporting",
    issuer: "Deloitte",
    badge: "DELOITTE",
    grade: "Score: 93.75%",
  },
  {
    id: 2,
    image: "/assets/certificates/certificate-2.jpg",
    title: "Ethical Hacking Virtual Internship",
    issuer: "AICTE & EduSkills",
    badge: "10-WEEK INTERNSHIP",
    grade: "Grade: O (Outstanding)",
  },
  {
    id: 3,
    image: "/assets/certificates/certificate-3.jpg",
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata & Forage",
    badge: "JOB SIMULATION",
    grade: "IAM & Risk Assessment",
  },
  {
    id: 4,
    image: "/assets/certificates/certificate-4.jpg",
    title: "Build with AI 2026 Intensive",
    issuer: "Google Developer Group",
    badge: "GDG ON CAMPUS",
    grade: "Generative AI Hackathon",
  },
  {
    id: 5,
    image: "/assets/certificates/certificate-5.png",
    title: "Data Analysis and Communication",
    issuer: "GIET University",
    badge: "WORKSHOP",
    grade: "Data Analytics & Presentation",
  },
];

export interface InteractiveFolderGalleryProps {
  photos?: GalleryPhoto[];
  folderName?: string;
  dragHintText?: string;
  className?: string;
  onSelectPhoto?: (photo: GalleryPhoto) => void;
}

export function InteractiveFolderGallery({
  photos = defaultPhotos,
  folderName = "Certificates.folder",
  dragHintText = "Drag any certificate down to close · Click to view full size",
  className,
  onSelectPhoto,
}: InteractiveFolderGalleryProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [hoverFolder, setHoverFolder] = useState(false);

  return (
    <div className={`w-full py-12 sm:py-16 relative select-none ${className || ""}`}>
      {/* ─── Top Master Open / Close Toggle Button ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 relative z-30 pointer-events-auto">
        <motion.button
          onClick={() => {
            setIsFolderOpen((prev) => !prev);
            setHoverFolder(false);
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 backdrop-blur-xl shadow-2xl border cursor-pointer ${
            isFolderOpen
              ? "bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25 hover:border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)]"
              : "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
          }`}
        >
          {isFolderOpen ? (
            <>
              <FolderClosed size={18} className="text-amber-400" />
              <span>CLOSE ALL &amp; RETURN TO FOLDER</span>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold">
                1 CLICK
              </span>
            </>
          ) : (
            <>
              <FolderOpen size={18} className="text-emerald-400 animate-pulse" />
              <span>OPEN ALL CERTIFICATES ({photos.length})</span>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold">
                VIEW ALL
              </span>
            </>
          )}
        </motion.button>
      </div>

      <div className="relative w-full min-h-[560px] flex flex-col items-center justify-center">
        <div className="relative w-[380px] sm:w-[420px] h-[520px] flex justify-center pointer-events-none z-0">
          {/* Back of the Folder */}
          <motion.div
            className="absolute bottom-6 w-80 sm:w-88 h-60 drop-shadow-2xl"
            animate={{
              opacity: isFolderOpen ? 0 : 1,
              scale: isFolderOpen ? 0.9 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Top Tab with Computer Style Border */}
            <div className="absolute top-0 left-0 w-36 h-10 bg-gradient-to-t from-[#141d26] to-[#1e2c3a] rounded-t-xl border-t border-l border-r border-emerald-500/30 flex items-center px-3 text-[11px] font-mono text-emerald-400">
              <Folder size={13} className="mr-1.5" />
              <span>SYS_ROOT</span>
            </div>
            {/* Main Back Plate */}
            <div className="absolute top-8 left-0 right-0 bottom-0 bg-gradient-to-b from-[#141d26] to-[#05080e] rounded-b-2xl rounded-tr-2xl border border-emerald-500/25 shadow-[inset_0_0_40px_rgba(0,0,0,0.9),0_15px_35px_rgba(0,0,0,0.8)]" />
            {/* Inside Slot */}
            <div className="absolute top-10 left-2 right-2 bottom-2 bg-[#020408] rounded-xl border border-white/5 shadow-inner pointer-events-none" />
          </motion.div>

          {/* Stacking / Fanning Certificate Cards */}
          <div className="absolute bottom-10 z-10 flex justify-center">
            {photos.map((photo, i) => {
              const offset = i - Math.floor(photos.length / 2);

              const stackY = hoverFolder ? offset * -12 - 40 : offset * -6;
              const stackX = hoverFolder ? offset * 32 : offset * 4;
              const stackRotate = hoverFolder ? offset * 7 : offset * 3;
              const stackScale = 1 - Math.abs(offset) * 0.03;

              // Spread horizontally when open
              const openY = -140;
              const openX = offset * 145;
              const openRotate = offset * 2;
              const openScale = 1.05;

              return (
                <motion.div
                  key={photo.id}
                  drag={isFolderOpen ? true : false}
                  dragSnapToOrigin={true}
                  onDragEnd={(e, info) => {
                    if (info.offset.y > 90 && isFolderOpen) {
                      setIsFolderOpen(false);
                      setHoverFolder(false);
                    }
                  }}
                  onClick={() => {
                    if (isFolderOpen && onSelectPhoto) {
                      onSelectPhoto(photo);
                    }
                  }}
                  className={`absolute bottom-0 w-56 sm:w-60 h-72 sm:h-80 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden border border-emerald-500/30 bg-[#03060c] origin-bottom group ${
                    isFolderOpen
                      ? "cursor-grab active:cursor-grabbing pointer-events-auto hover:border-emerald-400"
                      : "pointer-events-none"
                  }`}
                  animate={
                    !isFolderOpen
                      ? {
                          y: stackY,
                          x: stackX,
                          rotate: stackRotate,
                          scale: stackScale,
                          zIndex: i + 10,
                        }
                      : {
                          y: openY,
                          x: openX,
                          rotate: openRotate,
                          scale: openScale,
                          zIndex: 50,
                        }
                  }
                  whileHover={
                    isFolderOpen
                      ? {
                          scale: openScale + 0.06,
                          zIndex: 100,
                          rotate: 0,
                        }
                      : {}
                  }
                  whileDrag={
                    isFolderOpen
                      ? { scale: openScale + 0.1, rotate: 4, zIndex: 150 }
                      : {}
                  }
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  {/* Certificate Image */}
                  <div className="relative w-full h-full bg-black">
                    <Image
                      src={photo.image}
                      alt={photo.title || "Certificate"}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03060c] via-[#03060c]/20 to-transparent" />

                    {/* Top Floating Badge */}
                    {photo.badge && (
                      <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-black/85 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                          {photo.badge}
                        </span>
                      </div>
                    )}

                    {/* Maximize Icon */}
                    <div className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-lg bg-black/80 border border-white/15 flex items-center justify-center text-white/70 group-hover:text-emerald-400 group-hover:border-emerald-400 transition-colors backdrop-blur-md">
                      <Maximize2 size={12} />
                    </div>

                    {/* Bottom Info Pill */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 bg-black/85 border border-white/10 p-2.5 rounded-lg backdrop-blur-md">
                      <p className="text-[10px] font-mono text-emerald-400 truncate">
                        {photo.issuer || "Verified Issuer"}
                      </p>
                      <h4 className="text-xs font-bold text-white truncate font-heading">
                        {photo.title || "Certificate"}
                      </h4>
                      {photo.grade && (
                        <p className="text-[10px] text-zinc-400 font-mono mt-0.5 truncate">
                          {photo.grade}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Front of Folder with 3D Tilt on Hover */}
          <motion.div
            className="absolute bottom-0 w-[340px] sm:w-[370px] h-44 drop-shadow-[0_-20px_40px_rgba(0,0,0,0.9)] cursor-pointer z-20 pointer-events-auto"
            style={{ transformOrigin: "bottom" }}
            animate={{
              opacity: isFolderOpen ? 0 : 1,
              rotateX: hoverFolder ? -25 : 0,
              y: hoverFolder ? 10 : 0,
              pointerEvents: isFolderOpen ? "none" : "auto",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onMouseEnter={() => setHoverFolder(true)}
            onMouseLeave={() => setHoverFolder(false)}
            onClick={() => setIsFolderOpen(true)}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#1b2633] via-[#0f1722] to-[#070b10] rounded-2xl border border-emerald-500/30 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-end justify-center pb-8">
              {/* Glowing Top Edge */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

              {/* Status Header */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>5 VERIFIED</span>
                </div>
                <span>FOLDER_V2</span>
              </div>

              {/* Central Folder Label Plaque */}
              <div className="px-5 py-2.5 bg-black/90 rounded-xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center gap-2 backdrop-blur-md">
                <FolderOpen size={16} className="text-emerald-400" />
                <span className="text-white text-xs sm:text-sm font-mono font-semibold tracking-wide">
                  {folderName}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Bottom Control Bar when Open */}
        <motion.div
          animate={{
            opacity: isFolderOpen ? 1 : 0,
            y: isFolderOpen ? 0 : 50,
            pointerEvents: isFolderOpen ? "auto" : "none",
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-2 sm:bottom-4 flex flex-col sm:flex-row items-center gap-3 z-30"
        >
          <motion.button
            onClick={() => {
              setIsFolderOpen(false);
              setHoverFolder(false);
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-full bg-[#04070d]/95 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/15 backdrop-blur-md text-emerald-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-2xl cursor-pointer transition-all duration-300 group pointer-events-auto"
          >
            <FolderClosed size={15} className="text-emerald-400 group-hover:rotate-6 transition-transform" />
            <span className="font-semibold">CLOSE ALL &amp; RETURN TO FOLDER</span>
          </motion.button>

          <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline-block pointer-events-none">
            · Or drag any certificate down to close
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export { InteractiveFolderGallery as Component };
export default InteractiveFolderGallery;
