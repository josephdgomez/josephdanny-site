// Public: serves an uploaded testimonial photo.
export async function onRequestGet({ params, env }) {
  const id = String(params.id || "");
  if (!env.CONTENT || !/^[a-f0-9]{16}$/.test(id)) return new Response("Not found", { status: 404 });
  const buf = await env.CONTENT.get("photo:" + id, "arrayBuffer");
  if (!buf) return new Response("Not found", { status: 404 });
  return new Response(buf, {
    headers: { "content-type": "image/jpeg", "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" }
  });
}
