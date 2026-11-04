import { json, requireAdmin } from "../../_lib/util.js";

// Upload one testimonial photo (already cropped to a small square JPEG by the editor).
export async function onRequestPost({ request, env }) {
  const bad = await requireAdmin(request, env, { mutating: true });
  if (bad) return bad;
  const buf = await request.arrayBuffer();
  if (buf.byteLength < 500 || buf.byteLength > 700000) return json({ error: "size", message: "Image must be under 700 KB." }, 413);
  const b = new Uint8Array(buf);
  if (!(b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff)) return json({ error: "type", message: "Photo must be a JPEG." }, 415);
  const id = [...crypto.getRandomValues(new Uint8Array(8))].map(x => x.toString(16).padStart(2, "0")).join("");
  await env.CONTENT.put("photo:" + id, buf);
  return json({ ok: true, url: "/api/photo/" + id });
}
