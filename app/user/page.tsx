"use client";

import React, { useState } from "react";
import {
  Download,
  Copy,
  Check,
  Play,
  RotateCcw,
  Maximize2,
  FileText,
  Settings,
  MoreVertical,
  ChevronRight,
  Sparkles,
  Layout,
  ZoomIn,
  ZoomOut,
  History,
  Eye,
  Code2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const LaTeXEditor: React.FC = () => {
  const [latex, setLatex] = useState(`\\documentclass[10.5pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.55in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}

\\titleformat{\\section}{\\large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{7pt}{3pt}

\\pagestyle{empty}
\\setlist{nosep}

\\begin{document}

\\begin{center}
    \\textbf{\\LARGE JOHN DOE}\\\\[2pt]
    City, Country | john@example.com | +1-123-456-7890\\\\[1pt]
    https://portfolio.com | https://github.com
\\end{center}

\\section{Professional Summary}
Experienced software developer with expertise in full-stack development.

\\section{Technical Skills}
\\textbf{Languages:} JavaScript, TypeScript, Python\\\\
\\textbf{Frontend:} React, NextJS, Tailwind CSS\\\\
\\textbf{Backend:} Node.js, Express, MongoDB

\\section{Experience}
\\textbf{Senior Developer} \\hfill 2023 -- Present\\\\
\\textit{Tech Company} \\hfill San Francisco, CA

\\begin{itemize}
    \\item Led development of microservices architecture
    \\item Reduced API latency by 60\\%
    \\item Mentored 5 junior developers
\\end{itemize}

\\section{Education}
\\textbf{Bachelor of Science in Computer Science} \\hfill 2019\\\\
\\textit{University Name}

\\end{document}`);

  const [scale, setScale] = useState(100);

  return (
    <div className="flex px-4 h-screen flex-col bg-[#F9FAFB] dark:bg-[#0A0A0A] text-foreground overflow-hidden font-sans">
      {/* Dynamic Top Navigation */}
      <header className="flex h-14 items-center justify-between border-b border-border/40 bg-white/70 dark:bg-black/40 px-6 backdrop-blur-md z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
              <Code2 size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold tracking-tight">
                  document.tex
                </h1>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Synced
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground/80 font-medium">
                Standard Resume Template
              </p>
            </div>
          </div>

          <Separator orientation="vertical" className="h-6 opacity-30" />

          <nav className="flex items-center gap-2 text-xs font-medium">
            <Link href="/project">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                Project
              </Button>
            </Link>
            <ChevronRight size={14} className="text-muted-foreground/30" />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground bg-muted/50"
            >
              Editor
            </Button>
            <ChevronRight size={14} className="text-muted-foreground/30" />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              History
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1 mr-4 text-[11px] text-muted-foreground">
            <span className="h-2 w-2 -mt-1 rounded-full bg-blue-500 animate-pulse" />
            Autosaved at 7:10 PM
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 cursor-pointer px-4 font-medium border-border/60 hover:bg-muted/80"
          >
            <Share2 size={15} />
            Share
          </Button>
          <Button
            size="sm"
            className="h-9 gap-2 cursor-pointer px-5 font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Play size={15} fill="currentColor" />
            Compile
          </Button>
          <Separator orientation="vertical" className="h-6 mx-1" />
          <Button
            size="sm"
            variant="ghost"
            className="h-9 w-9 p-0 cursor-pointer rounded-full hover:bg-muted"
          >
            <MoreVertical size={18} />
          </Button>
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="flex flex-1 overflow-hidden relative">
        {/* Left Action Rail */}
        <aside className="w-[60px] border-r border-border/40 bg-white/40 dark:bg-black/20 flex flex-col items-center py-6 gap-6 z-10 backdrop-blur-sm">
          <div className="space-y-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-md ring-1 ring-primary/20"
            >
              <FileText size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <History size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Sparkles size={20} />
            </Button>
          </div>
          <div className="mt-auto space-y-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Settings size={20} />
            </Button>
          </div>
        </aside>

        {/* Editor Container */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FFFFFF] dark:bg-[#0D0D0D] shadow-inner">
          <div className="flex h-11 items-center justify-between border-b border-border/40 bg-muted/20 px-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-card/60 border border-border/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">
                  main.tex
                </span>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground/60 italic">
                UTF-8 • LaTeX
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-muted-foreground/60 hover:text-foreground transition-colors">
                <Copy size={16} />
              </button>
              <button className="text-muted-foreground/60 hover:text-foreground transition-colors">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden flex cursor-text">
            {/* Gutter / Line Numbers */}
            <div className="w-[50px] bg-muted/10 border-r border-border/20 flex flex-col items-end pr-3 py-6 text-[11px] font-mono text-muted-foreground/30 select-none">
              {Array.from({ length: 45 }).map((_, i) => (
                <div key={i} className="leading-[1.6] h-[21px]">
                  {i + 1}
                </div>
              ))}
            </div>
            {/* Textarea disguised as IDE */}
            <textarea
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-transparent font-mono text-[13px] leading-[1.6] p-6 outline-none resize-none caret-primary selection:bg-primary/20 overflow-y-auto scrollbar-none"
              placeholder="Start writing your LaTeX code here..."
            />
          </div>
        </div>

        {/* Designer Preview (Right) */}
        <div className="flex-[1.1] flex flex-col bg-[#F3F4F6] dark:bg-[#121212] border-l border-border/40 relative group">
          {/* Virtual Toolbar for Preview */}
          <div className="flex h-11 items-center justify-between border-b border-border/40 bg-white/60 dark:bg-black/40 px-6 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-primary/60" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Preview Canvas
              </span>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5 bg-muted/60 p-0.5 rounded-lg border border-border/40">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setScale(Math.max(50, scale - 5))}
                  className="h-7 w-7 rounded-sm text-muted-foreground hover:bg-white dark:hover:bg-black"
                >
                  <ZoomOut size={14} />
                </Button>
                <span className="text-[10px] font-mono font-bold w-10 text-center text-muted-foreground/80">
                  {scale}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setScale(Math.min(200, scale + 5))}
                  className="h-7 w-7 rounded-sm text-muted-foreground hover:bg-white dark:hover:bg-black"
                >
                  <ZoomIn size={14} />
                </Button>
              </div>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Download size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Maximize2 size={16} />
              </Button>
            </div>
          </div>

          {/* Actual Preview Canvas */}
          <div className="flex-1 overflow-auto p-8 lg:p-12 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground/30">
            <div className="flex justify-center min-h-full">
              <div
                className="bg-white text-slate-900 origin-top transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-black/5 rounded-sm relative"
                style={{
                  width: "210mm",
                  height: "297mm",
                  transform: `scale(${scale / 100})`,
                }}
              >
                {/* Simulated LaTeX Render Content */}
                <div className="p-[0.7in] h-full flex flex-col font-serif">
                  <header className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight uppercase leading-none">
                      JOHN DOE
                    </h1>
                    <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
                      <span>New York, NY</span>
                      <span className="text-slate-300">|</span>
                      <span>john.doe@example.com</span>
                      <span className="text-slate-300">|</span>
                      <span>+1 (555) 000-1234</span>
                    </div>
                    <div className="mt-1 flex justify-center gap-4 text-[10px] text-blue-500 font-bold tracking-wide">
                      <span className="cursor-pointer hover:underline underline-offset-4">
                        LINKEDIN.COM/IN/JDOE
                      </span>
                      <span className="cursor-pointer hover:underline underline-offset-4">
                        GITHUB.COM/JDOE
                      </span>
                    </div>
                  </header>

                  <div className="space-y-6">
                    <section>
                      <h2 className="text-sm font-bold border-b-2 border-slate-900 uppercase tracking-widest pb-1 mb-2.5">
                        Career Summary
                      </h2>
                      <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                        Highly skilled Software Engineer with over 8 years of
                        experience in architecting and delivering
                        high-performance web applications. Expert in TypeScript,
                        React, and Node.js with a strong focus on clean code and
                        scalable infrastructure.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-sm font-bold border-b-2 border-slate-900 uppercase tracking-widest pb-1 mb-2.5">
                        Technical Expertise
                      </h2>
                      <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-700">
                        <div>
                          <p className="mb-1">
                            <strong className="text-slate-900 font-bold">
                              Languages:
                            </strong>{" "}
                            Rust, TypeScript, Go, Python
                          </p>
                          <p>
                            <strong className="text-slate-900 font-bold">
                              Frameworks:
                            </strong>{" "}
                            React, Next.js, Vue, Tailwind
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <strong className="text-slate-900 font-bold">
                              Cloud & DevOps:
                            </strong>{" "}
                            AWS, Docker, Kubernetes, CI/CD
                          </p>
                          <p>
                            <strong className="text-slate-900 font-bold">
                              Databases:
                            </strong>{" "}
                            PostgreSQL, Redis, MongoDB, Prisma
                          </p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-sm font-bold border-b-2 border-slate-900 uppercase tracking-widest pb-1 mb-2.5">
                        Selected Experience
                      </h2>
                      <div className="space-y-4">
                        <div className="relative pl-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <h3 className="text-xs font-bold text-slate-900">
                              Lead Frontend Engineer
                            </h3>
                            <span className="text-[10px] font-bold text-slate-500 italic">
                              Jan 2021 — Present
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline mb-2">
                            <p className="text-[11px] font-bold text-slate-600">
                              Enterprise AI Solutions
                            </p>
                            <span className="text-[10px] text-slate-400 uppercase tracking-tighter">
                              Remote, USA
                            </span>
                          </div>
                          <ul className="list-disc ml-4 text-[10.5px] text-slate-700 space-y-1.5 leading-normal">
                            <li>
                              Architected a design system used by 50+ internal
                              developers, reducing UI development time by 40%.
                            </li>
                            <li>
                              Optimized core dashboard performance, improving
                              First Contentful Paint (FCP) by 1.2 seconds.
                            </li>
                            <li>
                              Mentored a team of 12 engineers, establishing best
                              practices for code reviews and testing.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>
                  </div>

                  <footer className="mt-auto flex justify-between items-end border-t border-slate-100 pt-4">
                    <div className="text-[9px] text-slate-300 uppercase font-bold tracking-widest">
                      Encoded in LaTeX
                    </div>
                    <Sparkles size={16} className="text-primary/10" />
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="h-6 flex items-center justify-between px-4 bg-primary text-[10px] text-primary-foreground font-medium">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/40 shadow-sm" />
            <span>Ready to compile</span>
          </div>
          <Separator orientation="vertical" className="h-3 bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Code2 size={10} />
            <span>main.tex</span>
          </div>
        </div>
        <div className="flex items-center gap-4 uppercase tracking-tighter font-bold">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
        </div>
      </footer>
    </div>
  );
};

export default LaTeXEditor;
