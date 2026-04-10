"use client";
// import YouTubeCard, { PlaylistItem } from "@/component/videoCard";
// import { usePlayListFinder, useYoutube } from "@/utils/api/endpoints";

// export default function Home() {
//   // const { data, isFetching, error } = useYoutube();
//   // console.log(data?.items);
//   // const { data: searchData } = usePlayListFinder("digital");
//   // console.log(searchData);
//   return (
//     <>
//       {/* <div className="grid grid-cols-5 gap-5 p-12">
//         {data?.items?.map((data: PlaylistItem, index: number) => (
//           <YouTubeCard
//             key={data.id}
//             item={data}
//             index={index}
//             onHover={() => {}}
//             isHovered={false}
//           ></YouTubeCard>
//         ))}
//       </div> */}

//     </>
//   );
// }
import React, { useState, useRef } from "react";
import { Download, Copy, Check, Play } from "lucide-react";

interface CompileResponse {
  success: boolean;
  pdf?: string;
  error?: string;
}

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

  const [pdf, setPdf] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [scale, setScale] = useState(100);

  const SERVER_URL =
    process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

  // Compile LaTeX
  const handleCompile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${SERVER_URL}/compile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latex }),
      });

      const data: CompileResponse = await response.json();

      if (data.success && data.pdf) {
        setPdf(data.pdf);
      } else {
        setError(data.error || "Compilation failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Server error");
    } finally {
      setLoading(false);
    }
  };

  // Download PDF
  const downloadPDF = () => {
    if (!pdf) return;

    const binary = atob(pdf);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([array], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download LaTeX
  const downloadTex = () => {
    const blob = new Blob([latex], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.tex";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .header {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          color: white;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .header-title {
          font-size: 20px;
          font-weight: 600;
        }

        .header-subtitle {
          font-size: 12px;
          opacity: 0.8;
          margin-left: 8px;
        }

        .toolbar {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .btn {
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .btn-primary {
          background: #10b981;
          border-color: #059669;
        }

        .btn-primary:hover {
          background: #059669;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn svg {
          width: 16px;
          height: 16px;
        }

        .container {
          display: flex;
          flex: 1;
          gap: 1px;
          background: #d1d5db;
          overflow: hidden;
        }

        .panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .editor-panel {
          background: white;
        }

        .preview-panel {
          background: #f9fafb;
        }

        textarea {
          flex: 1;
          padding: 20px;
          border: none;
          outline: none;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 13px;
          line-height: 1.6;
          resize: none;
          color: #1f2937;
        }

        textarea::selection {
          background: #dbeafe;
        }

        .preview-container {
          flex: 1;
          overflow: auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
          background: #f3f4f6;
        }

        .pdf-viewer {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          max-width: 816px;
          border: none;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #6b7280;
          gap: 12px;
        }

        .error-box {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 12px 16px;
          border-radius: 6px;
          margin: 12px;
          font-size: 12px;
          line-height: 1.5;
        }

        .controls {
          padding: 12px 20px;
          background: white;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .scale-control {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #6b7280;
        }

        .scale-input {
          width: 50px;
          padding: 4px 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 12px;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f3f4f6;
        }

        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <div>
          <span className="header-title">
            LaTeX Editor
            <span className="header-subtitle">Compile to PDF</span>
          </span>
        </div>

        <div className="toolbar">
          <button className="btn" onClick={copyToClipboard} title="Copy code">
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          <button className="btn" onClick={downloadTex} title="Download .tex">
            <Download size={16} /> TEX
          </button>

          <button
            className="btn btn-primary"
            onClick={handleCompile}
            disabled={loading}
            title="Compile to PDF"
          >
            <Play size={16} />
            {loading ? "Compiling..." : "Compile"}
          </button>

          {pdf && (
            <button className="btn" onClick={downloadPDF} title="Download PDF">
              <Download size={16} /> PDF
            </button>
          )}
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="container">
        {/* Left: Editor */}
        <div className="panel editor-panel">
          <textarea
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            spellCheck={false}
            placeholder="Enter LaTeX code..."
          />
        </div>

        {/* Right: Preview */}
        <div className="panel preview-panel">
          {error && (
            <div className="error-box">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="preview-container">
            {pdf ? (
              <div
                style={{
                  transform: `scale(${scale / 100})`,
                  transformOrigin: "top center",
                }}
              >
                <iframe
                  srcDoc={`<embed src="data:application/pdf;base64,${pdf}" type="application/pdf" width="816" height="1056" style="border:none;" />`}
                  style={{
                    width: "816px",
                    height: "1056px",
                    border: "none",
                    background: "white",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  }}
                />
              </div>
            ) : (
              <div className="empty-state">
                <p>Click "Compile" to generate PDF</p>
              </div>
            )}
          </div>

          {pdf && (
            <div className="controls">
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "11px", color: "#6b7280" }}>
                  PDF compiled successfully
                </p>
              </div>
              <div className="scale-control">
                <label>Scale:</label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="scale-input"
                />
                <span>{scale}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaTeXEditor;
