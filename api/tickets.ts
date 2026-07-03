import { v4 as uuid } from "uuid";
import { createTicket } from "./_lib/db";

function isSpam(text: string): boolean {
  return /https?:\/\/[^\s]{20,}/gi.test(text) || /viagra|casino|crypto airdrop/i.test(text);
}

export default async function (req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, subject, message, website } = req.body || {};

  if (website) {
    res.status(400).json({ error: "Invalid submission" });
    return;
  }
  if (!email || !subject || !message) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }
  if (subject.trim().length < 3 || subject.length > 200) {
    res.status(400).json({ error: "Subject must be 3–200 characters" });
    return;
  }
  if (message.trim().length < 10 || message.length > 5000) {
    res.status(400).json({ error: "Message must be 10–5000 characters" });
    return;
  }
  if (isSpam(message) || isSpam(subject)) {
    res.status(400).json({ error: "Message rejected" });
    return;
  }

  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
  const ticket = {
    id: uuid().slice(0, 8).toUpperCase(),
    email,
    subject,
    status: "open" as const,
    messages: [{ from: "user" as const, text: message, at: Date.now() }],
    createdAt: Date.now(),
    ip: Array.isArray(ip) ? ip[0] : ip,
  };

  await createTicket(ticket);
  res.json({ ticketId: ticket.id });
}
