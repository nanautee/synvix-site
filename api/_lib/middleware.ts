import { validateSession } from "./db";

export async function authMiddleware(req: any, res: any): Promise<boolean> {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  const token = header.slice(7);
  if (!(await validateSession(token))) {
    res.status(401).json({ error: "Session expired" });
    return false;
  }
  return true;
}
