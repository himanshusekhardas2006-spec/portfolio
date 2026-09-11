"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Award,
  Sparkles,
  MapPin,
  Calendar,
  Maximize2,
} from "lucide-react";
import MagneticPopText from "@/components/ui/MagneticPopText";
import { InteractiveFolderGallery } from "@/components/ui/interactive-folder-gallery";

export interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  src: string;
  alt: string;
  badge: string;
  grade?: string;
}

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 1,
    title: "Conceptual Framework for Financial Reporting",
    issuer: "Deloitte",
    date: "April 2026",
    src: "/assets/certificates/certificate-1.jpg",
    alt: "Deloitte - Conceptual Framework for Financial Reporting",
    badge: "DELOITTE CERTIFIED",
    grade: "Score: 93.75%",
  },
  {
    id: 2,
    title: "Ethical Hacking Virtual Internship",
    issuer: "AICTE & EduSkills",
    date: "Jan - Mar 2026",
    src: "/assets/certificates/certificate-2.jpg",
    alt: "Ethical Hacking Virtual Internship - AICTE EduSkills",
    badge: "10-WEEK INTERNSHIP",
    grade: "Grade: O (Outstanding)",
  },
  {
    id: 3,
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata & Forage",
    date: "May 2026",
    src: "/assets/certificates/certificate-3.jpg",
    alt: "Tata - Cybersecurity Analyst Job Simulation",
    badge: "JOB SIMULATION",
    grade: "IAM & Risk Assessment",
  },
  {
    id: 4,
    title: "Build with AI 2026 Intensive",
    issuer: "Google Developer Group",
    date: "2026",
    src: "/assets/certificates/certificate-4.jpg",
    alt: "Google Developer Group - Build with AI 2026",
    badge: "GDG ON CAMPUS",
    grade: "Generative AI Hackathon",
  },
  {
    id: 5,
    title: "Data Analysis and Communication",
    issuer: "GIET University / Code Communicators",
    date: "2026",
    src: "/assets/certificates/certificate-5.png",
    alt: "Code Communicators Workshop on Data Analysis",
    badge: "TECHNICAL WORKSHOP",
    grade: "Data Analytics & Presentation",
  },
];

export function CertificateFolder3D({
  onSelectCert,
}: {
  onSelectCert: (cert: { src: string; alt: string }) => void;
}) {
  return (
    <div className="w-full relative">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6a. FEATURED HERO HIGHLIGHT: "IIT GUWAHATI VISIT"            */}
      {/* ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mb-16 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#0c1824]/90 via-black/80 to-[#070b10] p-6 md:p-12 overflow-hidden shadow-2xl backdrop-blur-xl group"
      >
        {/* Ambient 3D Rim Lights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Big Impact Typography */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black font-display tracking-tight sm:tracking-wide uppercase leading-tight text-white select-none whitespace-nowrap drop-shadow-md">
                <MagneticPopText as="span">IIT GUWAHATI</MagneticPopText>
              </h3>
            </div>

            <div className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 pb-1">
              <MagneticPopText as="span">
                Representing GIET University
              </MagneticPopText>
            </div>

            <p className="text-zinc-300 text-base md:text-lg leading-relaxed pt-2">
              Selected to represent <strong className="text-white">GIET University</strong> at the prestigious{" "}
              <strong className="text-cyan-300">Indian Institute of Technology (IIT) Guwahati</strong>. Participated in national innovation summits, tech showcases, and collaborative student engineering forums, engaging with top tech talent and cutting-edge research.
            </p>

            {/* Meta Tags */}
            <div className="flex flex-wrap gap-4 pt-3 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <MapPin size={14} className="text-cyan-400" />
                <span>IIT Guwahati Campus, Assam</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Award size={14} className="text-purple-400" />
                <span>University Delegation</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Calendar size={14} className="text-orange-400" />
                <span>National Tech Summit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real IIT Guwahati Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-[360px] aspect-[3/4] rounded-2xl overflow-hidden border border-cyan-500/40 group cursor-pointer bg-black/60"
              onClick={() =>
                onSelectCert({
                  src: "/assets/projects/iit-guwahati.jpg",
                  alt: "IIT Guwahati Delegation - RR HIMANSHU SEKHAR DAS",
                })
              }
            >
              <Image
                src="/assets/projects/iit-guwahati.jpg"
                alt="IIT Guwahati Visit Representing GIET University"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 360px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-cyan-300">
                    CAMPUS DELEGATION
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    IIT Guwahati Campus
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white/10 text-white backdrop-blur-md hover:bg-cyan-500 hover:text-black transition-colors">
                  <Maximize2 size={16} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6b. ACHIEVEMENTS — INTERACTIVE 3D CERTIFICATE FOLDER          */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
            <MagneticPopText as="span">Achievements</MagneticPopText>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl">
            Interactive folder of verified certificates and credentials earned from industry leaders and hackathons. Use the 1-click button or click the folder to open all certificates, and click Close to return them back into the folder.
          </p>
        </div>
      </div>

      {/* 3D INTERACTIVE FOLDER GALLERY */}
      <InteractiveFolderGallery
        photos={CERTIFICATES.map((cert) => ({
          id: cert.id,
          image: cert.src,
          title: cert.title,
          issuer: cert.issuer,
          badge: cert.badge,
          grade: cert.grade,
        }))}
        folderName="Certificates.folder"
        dragHintText="Drag any certificate down to close · Click to view full size"
        onSelectPhoto={(photo) =>
          onSelectCert({ src: photo.image, alt: photo.title || "Certificate" })
        }
      />
    </div>
  );
}

export default CertificateFolder3D;
