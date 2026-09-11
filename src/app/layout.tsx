import type { Metadata } from "next";
import { JetBrains_Mono, Space_Mono, Fira_Code } from "next/font/google";
import "./globals.css";
import "@/shaders/threeui.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-heading",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RR Himanshu Sekhar Das // Full Stack Developer",
  description: "Futuristic Developer Portfolio of RR Himanshu Sekhar Das — Computer Science Engineering, GIET University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetbrainsMono.variable} ${spaceMono.variable} ${firaCode.variable} font-mono antialiased bg-[#030508] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300`}
      >
        {children}
      </body>
    </html>
  );
}
