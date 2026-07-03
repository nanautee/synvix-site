import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:3002";

export function Support() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [ticketId, setTicketId] = useState("");
  const formStart = useRef(Date.now());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return;
    if (Date.now() - formStart.current < 2000) return;

    setStatus("loading");
    try {
      const res = await fetch(`${API}/api/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message, website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTicketId(data.ticketId);
      setStatus("ok");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Support</h1>
      <p className="text-neutral-400 text-sm mb-8">
        Need help? Open a ticket and we'll get back to you.{" "}
        <Link to="/support/health" className="text-neutral-600 hover:text-neutral-400 underline">
          System status
        </Link>
      </p>

      {status === "ok" ? (
        <div className="p-4 rounded-xl border border-neutral-700 bg-neutral-900">
          <p className="text-white font-medium mb-1">Ticket created</p>
          <p className="text-sm text-neutral-400">
            ID: <code className="text-neutral-300">{ticketId}</code> — save this to track your request.
          </p>
          <button onClick={() => setStatus("idle")} className="mt-3 text-sm text-neutral-500 hover:text-white">
            Submit another
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute opacity-0 h-0 w-0 pointer-events-none"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />

          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Subject" value={subject} onChange={setSubject} required />
          <label className="block">
            <span className="text-xs text-neutral-500 mb-1 block">Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-neutral-600"
            />
          </label>

          {status === "error" && (
            <p className="text-sm text-red-400">Failed to submit. Try again later.</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-neutral-200 disabled:opacity-50"
          >
            {status === "loading" ? "Sending…" : "Submit Ticket"}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs text-neutral-500 mb-1 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-neutral-600"
      />
    </label>
  );
}