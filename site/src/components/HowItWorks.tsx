import { useRef, useEffect, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Listen",
    desc: "Synvix captures audio from your interview call in real-time, with zero setup required.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Transcribe",
    desc: "Powered by Whisper, speech is converted to text with high accuracy, even with accents.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="13" y2="13" />
        <line x1="9" y1="17" x2="11" y2="17" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Analyze",
    desc: "LLM evaluates every answer in context, identifying strong points and improvement areas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Answer",
    desc: "A structured, real-time answer appears on your screen — suggestions, corrections, and talking points.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-indigo-400 text-sm tracking-[0.2em] uppercase font-medium">
            How it works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            From conversation to insight
          </h2>
          <p className="text-neutral-400 mt-4 max-w-xl mx-auto text-lg">
            Four seamless steps — no tabs to switch, no buttons to press.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative group transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="h-full bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:border-indigo-800/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-bold bg-gradient-to-b from-indigo-500 to-indigo-700 bg-clip-text text-transparent leading-none">
                    {step.num}
                  </span>
                  <div className="w-px h-8 bg-neutral-700" />
                  <div className="text-indigo-400">{step.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
              </div>

              {i < steps.length - 1 && (
                <div
                  className={`hidden md:block absolute top-1/2 -right-3 z-10 transition-all duration-700 delay-700 ${
                    visible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-indigo-600">
                    <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
