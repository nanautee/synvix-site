import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

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

const SESSION_TTL = 4 * 60 * 60 * 1000;

export async function createTicket(ticket: Ticket): Promise<void> {
  await supabase.from("tickets").insert({
    id: ticket.id,
    email: ticket.email,
    subject: ticket.subject,
    status: ticket.status,
    messages: JSON.stringify(ticket.messages),
    created_at: new Date(ticket.createdAt).toISOString(),
    ip: ticket.ip,
  });
}

export async function getAllTickets(): Promise<Ticket[]> {
  const { data } = await supabase
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false });

  return (data || []).map((r: any) => ({
    id: r.id,
    email: r.email,
    subject: r.subject,
    status: r.status,
    messages: typeof r.messages === "string" ? JSON.parse(r.messages) : r.messages || [],
    createdAt: new Date(r.created_at).getTime(),
    ip: r.ip,
  }));
}

export async function addReply(id: string, text: string): Promise<Ticket | null> {
  const { data: existing } = await supabase
    .from("tickets")
    .select("messages, status")
    .eq("id", id)
    .single();

  if (!existing) return null;

  const messages = typeof existing.messages === "string"
    ? JSON.parse(existing.messages)
    : existing.messages || [];

  messages.push({ from: "admin", text, at: Date.now() });

  await supabase
    .from("tickets")
    .update({ messages: JSON.stringify(messages), status: "replied" })
    .eq("id", id);

  const { data: updated } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", id)
    .single();

  if (!updated) return null;

  return {
    id: updated.id,
    email: updated.email,
    subject: updated.subject,
    status: updated.status,
    messages: typeof updated.messages === "string" ? JSON.parse(updated.messages) : updated.messages || [],
    createdAt: new Date(updated.created_at).getTime(),
    ip: updated.ip,
  };
}

export async function saveSession(token: string): Promise<void> {
  await supabase.from("sessions").insert({
    token,
    expires_at: new Date(Date.now() + SESSION_TTL).toISOString(),
  });
}

export async function validateSession(token: string): Promise<boolean> {
  const { data } = await supabase
    .from("sessions")
    .select("*")
    .eq("token", token)
    .single();

  if (!data) return false;
  if (Date.now() > new Date(data.expires_at).getTime()) {
    await supabase.from("sessions").delete().eq("token", token);
    return false;
  }
  return true;
}
