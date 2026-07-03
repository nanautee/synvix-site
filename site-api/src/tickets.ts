import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

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

const DATA_DIR = path.join(__dirname, "../data");
const TICKETS_FILE = path.join(DATA_DIR, "tickets.json");

function ensureData() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(TICKETS_FILE)) fs.writeFileSync(TICKETS_FILE, "[]");
}

function readAll(): Ticket[] {
  ensureData();
  return JSON.parse(fs.readFileSync(TICKETS_FILE, "utf-8"));
}

function writeAll(tickets: Ticket[]) {
  ensureData();
  fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2));
}

export function createTicket(
  email: string,
  subject: string,
  message: string,
  ip: string
): Ticket {
  const ticket: Ticket = {
    id: uuid().slice(0, 8).toUpperCase(),
    email,
    subject,
    status: "open",
    messages: [{ from: "user", text: message, at: Date.now() }],
    createdAt: Date.now(),
    ip,
  };
  const all = readAll();
  all.push(ticket);
  writeAll(all);
  return ticket;
}

export function getAllTickets(): Ticket[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function getTicket(id: string): Ticket | undefined {
  return readAll().find((t) => t.id === id);
}

export function addReply(id: string, text: string): Ticket | null {
  const all = readAll();
  const ticket = all.find((t) => t.id === id);
  if (!ticket) return null;
  ticket.messages.push({ from: "admin", text, at: Date.now() });
  ticket.status = "replied";
  writeAll(all);
  return ticket;
}
