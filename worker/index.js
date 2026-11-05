// Entry point for the josephdanny-site Worker.
// Static files are served by Cloudflare directly. This script only runs for the Home and Portfolio pages
// (to inject content saved from /admin) and for /api/* (the editor's sign-in, saving and photos).
// See wrangler.jsonc: assets.run_worker_first.

import * as login from "./api/admin/login.js";
import * as logout from "./api/admin/logout.js";
import * as session from "./api/admin/session.js";
import * as content from "./api/admin/content.js";
import * as undo from "./api/admin/undo.js";
import * as adminPhoto from "./api/admin/photo.js";
import * as photo from "./api/photo/get.js";
import * as resume from "./api/resume.js";
import { onRequest as pages } from "./pages.js";

const ADMIN = {
  "/api/admin/login": login,
  "/api/admin/logout": logout,
  "/api/admin/session": session,
  "/api/admin/content": content,
  "/api/admin/undo": undo,
  "/api/admin/photo": adminPhoto
};

const handlerFor = (mod, method) => mod["onRequest" + method.charAt(0) + method.slice(1).toLowerCase()];

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;

    if (ADMIN[path]) {
      const fn = handlerFor(ADMIN[path], request.method);
      return fn ? fn({ request, env }) : new Response("Method not allowed", { status: 405 });
    }
    const m = path.match(/^\/api\/photo\/([a-f0-9]{16})$/);
    if (m) return request.method === "GET" ? photo.onRequestGet({ request, env, params: { id: m[1] } }) : new Response("Method not allowed", { status: 405 });
    if (path === "/api/resume.pdf") return request.method === "GET" ? resume.onRequestGet({ request, env }) : new Response("Method not allowed", { status: 405 });
    if (path.startsWith("/api/")) return new Response("Not found", { status: 404 });

    return pages({ request, env, next: req => env.ASSETS.fetch(req || request) });
  }
};
