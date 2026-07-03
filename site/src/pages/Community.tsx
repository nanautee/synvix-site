import { useState } from "react";

interface Post {
  id: string;
  date: string;
  title: string;
  tags: string[];
  content: string;
}

const posts: Post[] = [
  {
    id: "p1",
    date: "2026-06-28",
    title: "Synvix v0.1.0 — First Public Preview",
    tags: ["Release"],
    content:
      "The first public preview is here. Stealth mode via Windows Display Affinity, local-first architecture, multi-model support (Gemini, Groq, Claude, OpenAI), real-time Whisper transcription, and structured AI answers.\n\nDownload from our homepage and let us know what you think.",
  },
  {
    id: "p2",
    date: "2026-06-15",
    title: "Designing Stealth Mode",
    tags: ["Engineering"],
    content:
      "Synvix uses Windows Display Affinity (WDA_EXCLUDEFROMCAPTURE) to remain invisible to Zoom, Teams, Meet, and OBS during screen shares. We upgraded from Electron 34 to 35 for Chromium's fix. macOS and Linux support are being investigated.",
  },
  {
    id: "p3",
    date: "2026-06-01",
    title: "Roadmap: What's Coming Next",
    tags: ["Announcement"],
    content:
      "Q3 2026: custom prompt templates, session replay, macOS Sonoma support. Q4 2026: plugin system, team mode for coaches, auto-update with signed binaries. Building in public.",
  },
];

const allTags = [...new Set(posts.flatMap((p) => p.tags))];

export function Community() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">Community</h1>
        <p className="text-neutral-400 text-lg">
          News, updates, and engineering stories from the Synvix team.
        </p>
      </div>

      <div className="flex gap-2 mb-10 flex-wrap">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            !activeTag ? "bg-white text-black" : "bg-neutral-800 text-neutral-400 hover:text-white"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeTag === tag ? "bg-white text-black" : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {filtered.map((post) => (
          <article key={post.id} className="border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <time className="text-xs text-neutral-500">{post.date}</time>
              <div className="flex gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950/50 text-indigo-400 border border-indigo-900/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="text-lg font-semibold text-white mb-3">{post.title}</h2>
            <div className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
