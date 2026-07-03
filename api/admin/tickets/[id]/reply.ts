import { addReply } from "../../../_lib/kv";
import { authMiddleware } from "../../../_lib/middleware";

export default async function (req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!(await authMiddleware(req, res))) return;

  const { message } = req.body || {};
  if (typeof message !== "string" || message.trim().length < 1 || message.length > 5000) {
    res.status(400).json({ error: "Message must be 1–5000 characters" });
    return;
  }

  const ticket = await addReply(req.query.id, message.trim());
  if (!ticket) {
    res.status(404).json({ error: "Ticket not found" });
    return;
  }
  res.json({ ticket });
}
