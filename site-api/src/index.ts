import "dotenv/config";
import path from "path";
import fs from "fs";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createTicket, getAllTickets, addReply } from "./tickets";
import { verifyPassword, createSession, authMiddleware } from "./auth";

const PORT = Number(process.env.PORT) || 3002;
const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "16kb" }));

// Global rate limit
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// Stricter limit for ticket creation
const ticketLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: "Too many tickets. Try again later." },
});

// Stricter limit for admin login (brute force protection)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts." },
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "synvix-site-api" });
});

app.post("/api/tickets", ticketLimiter, (req, res) => {
  const { email, subject, message, website } = req.body;

  // Honeypot — bots fill hidden field
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

  // Basic spam patterns
  const spam = [/https?:\/\/[^\s]{20,}/gi, /viagra|casino|crypto airdrop/i];
  if (spam.some((p) => p.test(message) || p.test(subject))) {
    res.status(400).json({ error: "Message rejected" });
    return;
  }

  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const ticket = createTicket(email.trim(), subject.trim(), message.trim(), ip);
  res.json({ ticketId: ticket.id });
});

app.post("/api/admin/login", loginLimiter, (req, res) => {
  const { password } = req.body;
  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Password required" });
    return;
  }

  try {
    if (!verifyPassword(password)) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
  } catch {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  res.json({ token: createSession() });
});

app.get("/api/admin/tickets", authMiddleware as never, (_req, res) => {
  res.json({ tickets: getAllTickets() });
});

app.post("/api/admin/tickets/:id/reply", authMiddleware as never, (req, res) => {
  const { message } = req.body;
  if (typeof message !== "string" || message.trim().length < 1 || message.length > 5000) {
    res.status(400).json({ error: "Message must be 1–5000 characters" });
    return;
  }
  const ticket = addReply(req.params.id, message.trim());
  if (!ticket) {
    res.status(404).json({ error: "Ticket not found" });
    return;
  }
  res.json({ ticket });
});

if (!process.env.ADMIN_PASSWORD) {
  console.error("FATAL: ADMIN_PASSWORD environment variable is required");
  process.exit(1);
}

// Serve built frontend in production
const staticDir = path.resolve(__dirname, "../../site/dist");
if (fs.existsSync(path.join(staticDir, "index.html"))) {
  app.use(express.static(staticDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
  console.log(`Serving frontend from ${staticDir}`);
} else {
  console.log(`No frontend build found at ${staticDir} — API only`);
}

app.listen(PORT, () => {
  console.log(`Synvix site on http://localhost:${PORT}`);
});
