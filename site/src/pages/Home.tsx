import { useState } from "react";
import { Logo } from "../components/Logo";
import { AppMockup } from "../components/AppMockup";
import HowItWorks from "../components/HowItWorks";
import { API } from "../lib/api";

export function Home() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.12)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-20">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Logo size={120} />
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mt-8 leading-[1.15] py-4 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent" style={{ fontFamily: "Borney, sans-serif", letterSpacing: "0.05em" }}>
              Synvix
            </h1>
            <p className="text-neutral-300 text-xl md:text-2xl mt-6 max-w-lg leading-relaxed">
              Real-time AI interview assistant.
              <br />
              <span className="text-indigo-400">Invisible</span> during screen share.
              <br />
              Your keys, your device.
            </p>
            <button
              onClick={() => setShowComingSoon(true)}
              className="mt-10 px-10 py-4 rounded-xl bg-white text-black text-lg font-medium hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
            >
              Download for Windows
            </button>
            <p className="text-sm text-neutral-600 mt-4">Windows 10+ · macOS · Linux</p>
          </div>

          <div className="shrink-0">
            <AppMockup />
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm tracking-[0.2em] uppercase font-medium">Why Synvix</span>
          <h2 className="text-4xl font-bold mt-4 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Built for real interviews
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Stealth Mode", d: "Visible only to you — hidden from screen share, recording, and streaming software via Windows DDA API." },
            { t: "Local-First", d: "API keys stored on your computer. No cloud relay, no accounts, no data leaks." },
            { t: "Multi-Model", d: "Gemini, Groq, Claude, OpenAI — switch providers on the fly with streaming answers." },
            { t: "Real-Time", d: "Low-latency transcription and LLM streaming keeps your answers only seconds behind the conversation." },
            { t: "No Setup", d: "Launch, paste your key, and go. No configuration files or command-line wizardry." },
            { t: "Cross-Platform", d: "Windows, macOS, and Linux — the same experience everywhere." },
          ].map((f) => (
            <div key={f.t} className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-colors">
              <h3 className="font-medium text-white mb-2">{f.t}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowComingSoon(false)}>
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 max-w-sm mx-4 text-center" onClick={(e) => e.stopPropagation()}>
            <Logo size={48} />
            <h2 className="text-xl font-bold text-white mt-4 mb-2">Coming Soon</h2>
            <p className="text-neutral-400 text-sm">
              The first public release is being polished. Leave your email and we'll let you know when it's ready.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const email = (e.target as HTMLFormElement).email.value;
                if (!email) return;
                try {
                  await fetch(`${API}/api/tickets`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, subject: "Notify me about Synvix release", message: email }),
                  });
                } catch {}
                setShowComingSoon(false);
              }}
              className="mt-6 flex gap-2"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-neutral-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200"
              >
                Notify
              </button>
            </form>
            <button
              onClick={() => setShowComingSoon(false)}
              className="mt-4 text-xs text-neutral-500 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
