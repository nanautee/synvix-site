import { useState } from "react";

const demoTranscript = [
  { role: "INT", text: "Tell me about your experience with distributed systems." },
  { role: "YOU", text: "I've worked on microservices handling 50k req/s, using Kafka and Redis." },
  { role: "INT", text: "How would you design a real-time sync engine?" },
  { role: "YOU", text: "I'd use WebSockets with CRDTs for conflict resolution." },
];

export function AppMockup() {
  const [listening, setListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl shadow-indigo-950/40"
      style={{
        width: 360,
        background: "rgba(8,8,8,0.75)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="" width={20} height={20} className="rounded-md" style={{ objectFit: "contain" }} />
          <span className="text-[11px] font-medium text-white/80 tracking-wide">Synvix</span>
          <span className="text-[8px] px-1 py-px rounded-full bg-white/10 text-white/50 border border-white/10">stealth</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white" title="Connected" />
          <span className={`w-1.5 h-1.5 rounded-full ${listening ? "bg-white animate-pulse" : "bg-white/20"}`} title="Recording" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" title="AI" />
        </div>

        <div className="flex">
          {["─", "✕"].map((l) => (
            <button
              key={l}
              className={`w-5 h-5 rounded text-[10px] flex items-center justify-center transition-colors text-white/40 hover:text-white/70 ${l === "✕" ? "hover:bg-white/20" : "hover:bg-white/10"}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {showSettings && (
        <div className="mx-2 mt-2 p-2 rounded-xl" style={{ background: "rgba(12,12,12,0.72)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
          <div className="space-y-2">
            <div>
              <p className="text-[8px] uppercase tracking-wider text-white/30 mb-1">API Keys</p>
              {["Gemini", "Groq", "Claude", "OpenAI"].map((k) => (
                <input key={k} type="password" placeholder={k} readOnly
                  className="w-full rounded-md px-2 py-1 text-[9px] outline-none mb-1"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" }}
                />
              ))}
            </div>
            <div className="flex gap-1">
              <select className="flex-1 rounded-md px-2 py-1 text-[9px] outline-none" style={{ background: "#fff", color: "#111", border: "1px solid rgba(255,255,255,0.2)" }}>
                <option>Gemini Flash</option>
              </select>
              <select className="flex-1 rounded-md px-2 py-1 text-[9px] outline-none" style={{ background: "#fff", color: "#111", border: "1px solid rgba(255,255,255,0.2)" }}>
                <option>Groq</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[9px] text-white/50">Opacity</label>
              <input type="range" min="55" max="100" defaultValue="88" className="flex-1" />
            </div>
          </div>
        </div>
      )}

      <div className="px-2.5 pt-2 pb-1 space-y-1.5">
        <section>
          <h2 className="text-[9px] font-semibold uppercase tracking-widest text-white/30 mb-1 px-0.5">
            Transcript
          </h2>
          <div
            className="rounded-lg p-2 space-y-1.5 overflow-y-auto"
            style={{ background: "rgba(12,12,12,0.72)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", maxHeight: 96 }}
          >
            {demoTranscript.map((m, i) => (
              <div key={i} className="flex gap-1.5">
                <span className="text-[9px] font-medium text-white/35 shrink-0 mt-px w-6">{m.role}</span>
                <p className="text-[10px] text-white/75 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold uppercase tracking-widest text-white/30 mb-1 px-0.5 flex items-center gap-1.5">
            Answer
            <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
          </h2>
          <div
            className="rounded-lg p-2.5 space-y-2"
            style={{ background: "rgba(12,12,12,0.72)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
          >
            <p className="text-[10px] text-white/70 leading-relaxed whitespace-pre-wrap">
              Use a conflict-free replicated data type (CRDT) with WebSocket sync. CRDTs allow offline edits that merge automatically.
              <span className="inline-block w-px h-3 bg-white/60 ml-0.5 animate-pulse" />
            </p>
            <div>
              <p className="text-[8px] uppercase tracking-wider text-white/30 mb-0.5">Bullets</p>
              <ul className="space-y-0.5">
                {["CRDT vs OT — choose CRDT for peer-to-peer", "WebSocket for real-time bidirectional sync", "Version vectors to detect conflicts"].map((b, i) => (
                  <li key={i} className="text-[10px] text-white/60 flex gap-1.5">
                    <span className="text-white/30">·</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="flex items-center justify-center gap-1.5 px-2.5 py-2 border-t border-white/8">
        <button
          onClick={() => setListening(!listening)}
          className="px-3 py-1 rounded-md text-[10px] font-medium transition-all"
          style={{
            background: listening ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.92)",
            border: `1px solid ${listening ? "rgba(255,255,255,0.15)" : "transparent"}`,
            color: listening ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.9)",
          }}
        >
          {listening ? "Stop" : "Start"}
        </button>
        <button className="w-7 h-7 rounded-md text-[10px] flex items-center justify-center transition-all"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.5)" }}
        >
          ⌫
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-7 h-7 rounded-md text-[10px] flex items-center justify-center transition-all"
          style={{
            background: showSettings ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: showSettings ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.5)",
          }}
        >
          ⚙
        </button>
      </div>
    </div>
  );
}
