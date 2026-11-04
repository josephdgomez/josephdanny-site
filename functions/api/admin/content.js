import { json, requireAdmin, cleanContent } from "../../_lib/util.js";

export async function onRequestGet({ request, env }) {
  const bad = await requireAdmin(request, env, { mutating: false });
  if (bad) return bad;
  const raw = await env.CONTENT.get("content");
  const prev = await env.CONTENT.get("content:prev");
  return json({ content: raw ? JSON.parse(raw) : null, hasPrev: !!prev });
}

// Save. The previous version is kept for one-step undo.
export async function onRequestPut({ request, env }) {
  const bad = await requireAdmin(request, env, { mutating: true });
  if (bad) return bad;
  const text = await request.text();
  if (text.length > 700000) return json({ error: "size", message: "That is too much content to save at once." }, 413);
  let clean;
  try { clean = cleanContent(JSON.parse(text)); } catch (e) { return json({ error: "invalid", message: e.message || "Could not read that." }, 400); }
  const old = await env.CONTENT.get("content");
  if (old) await env.CONTENT.put("content:prev", old);
  await env.CONTENT.put("content", JSON.stringify(clean));
  return json({ ok: true, content: clean, hasPrev: !!old });
}

// Reset to the content built into the site (keeps the old saved version for undo).
export async function onRequestDelete({ request, env }) {
  const bad = await requireAdmin(request, env, { mutating: true });
  if (bad) return bad;
  const old = await env.CONTENT.get("content");
  if (old) await env.CONTENT.put("content:prev", old);
  await env.CONTENT.delete("content");
  return json({ ok: true, hasPrev: !!old });
}
