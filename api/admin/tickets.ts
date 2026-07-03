import { getAllTickets } from "../_lib/db";
import { authMiddleware } from "../_lib/middleware";

export default async function (req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!(await authMiddleware(req, res))) return;
  const tickets = await getAllTickets();
  res.json({ tickets });
}
