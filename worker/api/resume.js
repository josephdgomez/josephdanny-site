// Serves the live resume as a PDF (exported from the Google Doc that the site's resume links point to).
// The phone viewer renders it page by page; "?dl=1" makes it download. Cached at the edge for 10 minutes
// so edits to the Google Doc show up within minutes without hammering Google.

const DOC_ID = "1kia_8wKuOrGpDp3uzUiFT2xI9fVxtSvapqBMX_5C3LM";
const SRC = "https://docs.google.com/document/d/" + DOC_ID + "/export?format=pdf";
const NAME = "Joseph-Gomez-de-la-Mora-Resume.pdf";

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const dl = url.searchParams.has("dl");
  const store = typeof caches !== "undefined" ? caches.default : null;
  const key = new Request(url.origin + "/__resume-cache");

  let res = store ? await store.match(key) : null;
  if (!res) {
    try {
      const up = await fetch(SRC, { redirect: "follow" });
      if (up.ok && (up.headers.get("content-type") || "").includes("pdf")) {
        res = new Response(await up.arrayBuffer(), { headers: { "content-type": "application/pdf", "cache-control": "public, max-age=600" } });
        if (store) await store.put(key, res.clone());
      }
    } catch (e) { /* fall through */ }
  }
  if (!res) {
    // Google didn't answer: a download can still go straight to Google, a preview can't.
    return dl ? Response.redirect(SRC, 302) : new Response("Resume unavailable", { status: 502 });
  }
  const h = new Headers(res.headers);
  h.set("content-type", "application/pdf");
  h.set("content-disposition", (dl ? "attachment" : "inline") + '; filename="' + NAME + '"');
  h.set("cache-control", "public, max-age=300");
  return new Response(res.body, { status: 200, headers: h });
}
