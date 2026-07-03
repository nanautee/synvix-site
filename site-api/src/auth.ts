import crypto from "crypto";

const sessions = new Map<string, { expires: number }>();
const SESSION_TTL = 4 * 60 * 60 * 1000; // 4 hours

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error("ADMIN_PASSWORD environment variable is not set");
    return false;
  }
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSession(): string {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { expires: Date.now() + SESSION_TTL });
  return token;
}

export function validateSession(token: string): boolean {
  const session = sessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expires) {
    sessions.delete(token);
    return false;
  }
  return true;
}

export function authMiddleware(req: { headers: { authorization?: string } }, res: { status: (n: number) => { json: (o: object) => void } }, next: () => void) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = header.slice(7);
  if (!validateSession(token)) {
    res.status(401).json({ error: "Session expired" });
    return;
  }
  next();
}
