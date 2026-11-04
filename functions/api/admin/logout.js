import { json, clearSession } from "../../_lib/util.js";

export async function onRequestPost({ request }) {
  const https = new URL(request.url).protocol === "https:";
  return json({ ok: true }, 200, { "set-cookie": clearSession(https) });
}
