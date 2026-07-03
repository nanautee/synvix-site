import { useState, useEffect, useCallback } from "react";
import { API } from "../lib/api";

/** Innocuous-looking status page. Ctrl+Shift+. opens admin login. */
export function HealthPage() {
  const [metrics, setMetrics] = useState({ uptime: "99.9%", latency: "42ms", tickets: 0 });
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");

  // Hidden admin trigger: Ctrl+Shift+.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === ".") {
        e.preventDefault();
        setShowAdmin((s) => !s);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const login = async () => {
    setError("");
    const res = await fetch(`${API}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); return; }
    setToken(data.token);
    setPassword("");
    loadTickets(data.token);
  };

  const loadTickets = useCallback(async (t: string) => {
    const res = await fetch(`${API}/api/admin/tickets`, {
      headers: { Authorization: `Bearer ${t}` },
    });
    if (res.ok) {
      const data = await res.json();
      setTickets(data.tickets);
      setMetrics((m) => ({ ...m, tickets: data.tickets.length }));
    }
  }, []);

  const sendReply = async () => {
    if (!selected || !reply.trim()) return;
    await fetch(`${API}/api/admin/tickets/${selected.id}/reply`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message: reply }),
    });
    setReply("");
    loadTickets(token);
  };

  if (token) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-medium text-white">Operations Console</h1>
          <button onClick={() => { setToken(""); setTickets([]); }} className="text-xs text-neutral-500 hover:text-white">
            Sign out
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {tickets.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelected(t)}
                className={`w-full text-left p-3 rounded-lg border text-sm ${
                  selected?.id === t.id ? "border-white bg-neutral-800" : "border-neutral-800 hover:border-neutral-600"
                }`}
              >
                <p className="text-white font-medium truncate">{t.subject}</p>
                <p className="text-neutral-500 text-xs">{t.email} · {t.status}</p>
              </button>
            ))}
          </div>
          {selected && (
            <div className="border border-neutral-800 rounded-lg p-4">
              <h2 className="text-white font-medium mb-2">{selected.subject}</h2>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {selected.messages.map((m, i) => (
                  <div key={i} className={`text-sm p-2 rounded ${m.from === "admin" ? "bg-neutral-800" : "bg-neutral-900"}`}>
                    <span className="text-xs text-neutral-500">{m.from}</span>
                    <p className="text-neutral-300">{m.text}</p>
                  </div>
                ))}
              </div>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Reply…"
                rows={3}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white mb-2"
              />
              <button onClick={sendReply} className="px-4 py-1.5 rounded-lg bg-white text-black text-sm font-medium">
                Send Reply
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16 text-center">
      <h1 className="text-xl font-medium text-white mb-6">System Status</h1>
      <div className="space-y-3 text-left">
        {Object.entries(metrics).map(([k, v]) => (
          <div key={k} className="flex justify-between p-3 rounded-lg border border-neutral-800 text-sm">
            <span className="text-neutral-500 capitalize">{k}</span>
            <span className="text-neutral-300">{v}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-neutral-700 mt-8">All systems operational.</p>

      {showAdmin && (
        <div className="mt-8 p-4 rounded-xl border border-neutral-700 bg-neutral-900 text-left">
          <p className="text-xs text-neutral-500 mb-2">Operator access</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white mb-2"
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          {error && <p className="text-xs text-red-400 mb-2">{error}</p>}
          <button onClick={login} className="w-full py-2 rounded-lg bg-neutral-700 text-white text-sm hover:bg-neutral-600">
            Authenticate
          </button>
        </div>
      )}
    </div>
  );
}

interface Ticket {
  id: string;
  email: string;
  subject: string;
  status: string;
  messages: { from: string; text: string; at: number }[];
}
