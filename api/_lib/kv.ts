import { kv } from "@vercel/kv";

export interface TicketMessage {
  from: "user" | "admin";
  text: string;
  at: number;
}

export interface Ticket {
  id: string;
  email: string;
  subject: string;
  status: "open" | "replied" | "closed";
  messages: TicketMessage[];
  createdAt: number;
  ip: string;
}

const SESSION_TTL = 4 * 60 * 60;

export async function createTicket(ticket: Ticket): Promise<void> {
  await kv.lpush("tickets", JSON.stringify(ticket));
}

export async function getAllTickets(): Promise<Ticket[]> {
  const raw = await kv.lrange("tickets", 0, -1);
  return (raw || []).map((s) => (typeof s === "string" ? JSON.parse(s) : s)).sort(
    (a, b) => b.createdAt - a.createdAt
  );
}

export async function addReply(id: string, text: string): Promise<Ticket | null> {
  const raw = await kv.lrange("tickets", 0, -1);
  if (!raw) return null;
  const tickets: Ticket[] = raw.map((s) => (typeof s === "string" ? JSON.parse(s) : s));
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tickets[idx].messages.push({ from: "admin", text, at: Date.now() });
  tickets[idx].status = "replied";

  // Rewrite the list
  await kv.del("tickets");
  for (const t of tickets.reverse()) {
    await kv.lpush("tickets", JSON.stringify(t));
  }
  return tickets.find((t) => t.id === id) || null;
}

export async function saveSession(token: string): Promise<void> {
  await kv.set(`session:${token}`, { expires: Date.now() + SESSION_TTL * 1000 }, { ex: SESSION_TTL });
}

export async function validateSession(token: string): Promise<boolean> {
  const data = await kv.get(`session:${token}`);
  if (!data) return false;
  const session = data as { expires: number };
  if (Date.now() > session.expires) {
    await kv.del(`session:${token}`);
    return false;
  }
  return true;
}
