import { verifyPassword, createSession } from "../_lib/auth";
import { saveSession } from "../_lib/db";

export default async function (req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { password } = req.body || {};
  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Password required" });
    return;
  }
  if (!verifyPassword(password)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const token = createSession();
  await saveSession(token);
  res.json({ token });
}
