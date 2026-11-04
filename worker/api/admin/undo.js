import { json, requireAdmin } from "../../_lib/util.js";

// Swap the current saved content with the previous version (so a second undo redoes it).
export async function onRequestPost({ request, env }) {
  const bad = await requireAdmin(request, env, { mutating: true });
  if (bad) return bad;
  const prev = await env.CONTENT.get("content:prev");
  if (!prev) return json({ error: "none", message: "There is no earlier version to go back to." }, 404);
  const cur = await env.CONTENT.get("content");
  await env.CONTENT.put("content", prev);
  if (cur) await env.CONTENT.put("content:prev", cur); else await env.CONTENT.delete("content:prev");
  return json({ ok: true, content: JSON.parse(prev), hasPrev: !!cur });
}
