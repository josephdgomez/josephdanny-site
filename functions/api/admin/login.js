import { json, passwordOk, makeSession } from "../../_lib/util.js";

const MAX_TRIES = 5;
const WINDOW = 15 * 60;

export async function onRequestPost({ request, env }) {
  if (!env.CONTENT) return json({ error: "storage", message: "The CONTENT storage binding is not connected yet." }, 503);
  if (!env.ADMIN_PASSWORD) return json({ error: "password", message: "ADMIN_PASSWORD is not set yet." }, 503);
  if (request.headers.get("x-admin") !== "1") return json({ error: "csrf", message: "Missing header." }, 403);

  const ip = request.headers.get("cf-connecting-ip") || "local";
  const key = "rl:" + ip;
  const tries = parseInt((await env.CONTENT.get(key)) || "0", 10);
  if (tries >= MAX_TRIES) return json({ error: "limit", message: "Too many attempts. Try again in about 15 minutes." }, 429);

  let body = {};
  try { body = await request.json(); } catch (e) {}
  if (!(await passwordOk(body.password, env.ADMIN_PASSWORD))) {
    await env.CONTENT.put(key, String(tries + 1), { expirationTtl: WINDOW });
    return json({ error: "auth", message: "That password is not right." }, 401);
  }
  await env.CONTENT.delete(key);
  const https = new URL(request.url).protocol === "https:";
  return json({ ok: true }, 200, { "set-cookie": await makeSession(env.ADMIN_PASSWORD, https) });
}
