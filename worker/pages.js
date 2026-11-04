// Puts content saved from /admin into the Home and Portfolio pages before they reach the browser.
// If nothing is saved, storage is not connected, or anything goes wrong, the page is served unchanged
// and the content built into the page is used.

const PAGES = new Set(["/", "/index.html", "/portfolio", "/portfolio.html"]);

export async function onRequest(context) {
  const { request, env, next } = context;
  const isPage = request.method === "GET" && !!env.CONTENT && PAGES.has(new URL(request.url).pathname);
  if (!isPage) return next();

  // Always send the full page (never a 304), so a fresh save is never hidden behind a cached copy.
  const req = new Request(request);
  req.headers.delete("if-none-match");
  req.headers.delete("if-modified-since");
  const res = await next(req);
  try {
    if (!(res.headers.get("content-type") || "").includes("text/html")) return res;
    const raw = await env.CONTENT.get("content", { cacheTtl: 30 });
    if (!raw) return res;
    const LS = new RegExp(String.fromCharCode(0x2028), "g"), PS = new RegExp(String.fromCharCode(0x2029), "g");
    const safe = JSON.stringify(JSON.parse(raw)).replace(/</g, "\\u003c").replace(LS, "\\u2028").replace(PS, "\\u2029");
    const rewritten = new HTMLRewriter()
      .on("head", { element(e) { e.append("<script>window.__SAVED=" + safe + ";</script>", { html: true }); } })
      .transform(res);
    const out = new Response(rewritten.body, rewritten);
    out.headers.delete("etag");
    out.headers.delete("last-modified");
    out.headers.set("cache-control", "public, max-age=0, must-revalidate");
    return out;
  } catch (e) {
    return res;
  }
}
