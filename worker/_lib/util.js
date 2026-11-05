// Shared helpers for the editor API. Not a route (no onRequest export).

export function json(obj, status = 200, headers = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex", ...headers }
  });
}

const enc = new TextEncoder();

function b64url(buf) {
  let s = "";
  new Uint8Array(buf).forEach(b => (s += String.fromCharCode(b)));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(key, msg) {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(msg)));
}

function equalBytes(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i];
  return d === 0;
}

// Constant-time password check (compares HMACs of both strings).
export async function passwordOk(given, secret) {
  if (!secret || typeof given !== "string") return false;
  const a = await hmac("pw-check", given);
  const b = await hmac("pw-check", secret);
  return equalBytes(a, b);
}

const COOKIE = "jd_sess";
const SESSION_SECONDS = 8 * 60 * 60;

// The session cookie is "<expiry>.<HMAC(password, expiry)>". Changing the password signs everyone out.
export async function makeSession(secret, https) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const sig = b64url(await hmac(secret, "sess:" + exp));
  return `${COOKIE}=${exp}.${sig}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; SameSite=Strict${https ? "; Secure" : ""}`;
}

export function clearSession(https) {
  return `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict${https ? "; Secure" : ""}`;
}

export async function isAuthed(request, env) {
  if (!env.ADMIN_PASSWORD) return false;
  const m = (request.headers.get("cookie") || "").match(new RegExp("(?:^|;\\s*)" + COOKIE + "=([^;]+)"));
  if (!m) return false;
  const [exp, sig] = m[1].split(".");
  if (!/^\d+$/.test(exp || "") || !sig) return false;
  if (Number(exp) < Math.floor(Date.now() / 1000)) return false;
  const good = b64url(await hmac(env.ADMIN_PASSWORD, "sess:" + exp));
  return equalBytes(enc.encode(sig), enc.encode(good));
}

// Gate for every mutating admin call: must be signed in and carry the custom header (blocks cross-site forms).
export async function requireAdmin(request, env, { mutating }) {
  if (!env.CONTENT) return json({ error: "storage", message: "The CONTENT storage binding is not connected yet." }, 503);
  if (!env.ADMIN_PASSWORD) return json({ error: "password", message: "ADMIN_PASSWORD is not set yet." }, 503);
  if (!(await isAuthed(request, env))) return json({ error: "auth", message: "Please sign in." }, 401);
  if (mutating) {
    if (request.headers.get("x-admin") !== "1") return json({ error: "csrf", message: "Missing header." }, 403);
    const origin = request.headers.get("origin");
    if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: "csrf", message: "Bad origin." }, 403);
  }
  return null;
}

/* ---------- Content validation ---------- */

const ID_RE = /^[A-Za-z0-9_-]{10,120}$/;
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,39}$/;
const PHOTO_RE = /^(\/t\d{1,2}\.jpg|\/api\/photo\/[a-f0-9]{16})$/;
const TYPES = new Set(["v", "p", "i"]);

const str = (v, max, label, { required = false } = {}) => {
  if (v === undefined || v === null) v = "";
  if (typeof v !== "string") throw new Error(label + " must be text.");
  v = v.replace(/\s+/g, " ").trim();
  if (required && !v) throw new Error(label + " is required.");
  if (v.length > max) throw new Error(label + " is too long (max " + max + " characters).");
  return v;
};
const longStr = (v, max, label, opts) => {
  // keep line breaks for quotes
  if (v === undefined || v === null) v = "";
  if (typeof v !== "string") throw new Error(label + " must be text.");
  v = v.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  if (opts && opts.required && !v) throw new Error(label + " is required.");
  if (v.length > max) throw new Error(label + " is too long (max " + max + " characters).");
  return v;
};
const arr = (v, max, label) => {
  if (v === undefined || v === null) return [];
  if (!Array.isArray(v)) throw new Error(label + " must be a list.");
  if (v.length > max) throw new Error(label + " has too many entries (max " + max + ").");
  return v;
};
const driveId = (v, label) => {
  if (typeof v !== "string" || !ID_RE.test(v)) throw new Error(label + " is not a valid Google Drive ID.");
  return v;
};

function cleanItems(list, label) {
  return arr(list, 300, label).map((it, i) => {
    if (!Array.isArray(it) || it.length < 3) throw new Error(label + " piece " + (i + 1) + " is incomplete.");
    const [type, id, title] = it;
    if (!TYPES.has(type)) throw new Error(label + " piece " + (i + 1) + " has an unknown type.");
    const row = [type, driveId(id, label + " piece " + (i + 1)), str(title, 160, label + " piece " + (i + 1) + " title", { required: true })];
    const opts = cleanOpts(it[3], label + " piece " + (i + 1));
    if (opts) row.push(opts);
    return row;
  });
}

// Optional thumbnail settings for a piece: { y: 0-100 crop position, img: uploaded thumbnail }
function cleanOpts(o, label) {
  if (!o || typeof o !== "object") return null;
  const out = {};
  if (o.y !== undefined && o.y !== null) {
    const y = Number(o.y);
    if (!Number.isFinite(y)) throw new Error(label + " has an invalid thumbnail position.");
    out.y = Math.max(0, Math.min(100, Math.round(y)));
  }
  if (o.img) {
    if (typeof o.img !== "string" || !/^\/api\/photo\/[a-f0-9]{16}$/.test(o.img)) throw new Error(label + " has an invalid thumbnail image.");
    out.img = o.img;
  }
  return Object.keys(out).length ? out : null;
}

function cleanSection(s, label) {
  const out = { title: str(s.title, 160, label + " title") };
  if (s.folder) out.folder = driveId(s.folder, label + " folder");
  if (Array.isArray(s.subs) && s.subs.length) {
    out.subs = arr(s.subs, 30, label + " sub-groups").map((sb, i) => ({
      title: str(sb.title, 160, label + " sub-group " + (i + 1) + " title"),
      items: cleanItems(sb.items, label + " sub-group " + (i + 1))
    }));
  } else {
    out.items = cleanItems(s.items, label);
  }
  return out;
}

const STAT_ICONS = new Set(["users", "cal", "mic", "funnel", "chart", "heart", "globe", "star"]);
const BANNER_ICONS = new Set(["search", "video", "target", "trophy", "star", "check", "chart"]);
const HOME_IMG_RE = /^(\/(headshot|rainier|team|tacoma)\.jpg|\/api\/photo\/[a-f0-9]{16})$/;

const linkStr = (v, label) => {
  v = str(v, 300, label);
  if (v && !/^https?:\/\/[^\s]+$/i.test(v)) throw new Error(label + " must start with https://");
  return v;
};
const emailStr = (v, label) => {
  v = str(v, 200, label);
  if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) throw new Error(label + " does not look like an email address.");
  return v;
};
const imgStr = (v, label) => {
  if (v === undefined || v === null || v === "") return "";
  if (typeof v !== "string" || !HOME_IMG_RE.test(v)) throw new Error(label + " is not a valid image.");
  return v;
};

function cleanHome(h) {
  if (!h || typeof h !== "object") return undefined;
  const H = h.header || {}, A = h.about || {}, F = h.footer || {};
  const out = {
    header: {
      eyebrow: str(H.eyebrow, 120, "Header small line"),
      nameFirst: str(H.nameFirst, 60, "Header name"),
      nameMark: str(H.nameMark, 60, "Header highlighted name"),
      lede: longStr(H.lede, 500, "Header intro"),
      es: str(H.es, 200, "Header Spanish line"),
      btnPortfolio: str(H.btnPortfolio, 40, "Portfolio button"),
      btnResume: str(H.btnResume, 40, "Resume button"),
      based: longStr(H.based, 120, "Menu location"),
      languages: longStr(H.languages, 120, "Menu languages")
    },
    about: {
      statement: str(A.statement, 300, "About statement"),
      paragraph: longStr(A.paragraph, 1200, "About paragraph"),
      headshot: imgStr(A.headshot, "About photo"),
      pill1: imgStr(A.pill1, "About first strip photo"),
      pill2: imgStr(A.pill2, "About second strip photo"),
      pill3: imgStr(A.pill3, "Experience strip photo")
    },
    stats: arr(h.stats, 8, "Stats").map((x, i) => {
      const icon = STAT_ICONS.has(x.icon) ? x.icon : "star";
      return { value: str(x.value, 20, "Stat " + (i + 1) + " number", { required: true }), label: str(x.label, 120, "Stat " + (i + 1) + " description", { required: true }), icon };
    }),
    services: arr(h.services, 12, "Services").map((x, i) => ({
      title: str(x.title, 100, "Service " + (i + 1) + " title", { required: true }),
      text: str(x.text, 400, "Service " + (i + 1) + " description")
    })),
    banner: arr(h.banner, 20, "Banner").map((x, i) => {
      const L = "Banner badge " + (i + 1);
      const b = { top: str(x.top, 60, L + " top line"), main: str(x.main, 80, L + " main line", { required: true }), icon: BANNER_ICONS.has(x.icon) ? x.icon : "star", type: TYPES.has(x.type) ? x.type : "p", id: "" };
      if (x.id) b.id = driveId(x.id, L + " link");
      return b;
    }),
    footer: {
      heading: str(F.heading, 80, "Footer heading"),
      tagline: str(F.tagline, 200, "Footer line"),
      email: emailStr(F.email, "Footer email"),
      linkedin: linkStr(F.linkedin, "Footer LinkedIn link"),
      website: linkStr(F.website, "Footer website link"),
      owner: str(F.owner, 80, "Footer business name"),
      note: str(F.note, 120, "Footer note")
    }
  };
  for (const k of ["headshot", "pill1", "pill2", "pill3"]) if (!out.about[k]) delete out.about[k];
  return out;
}

export function cleanContent(c) {
  if (!c || typeof c !== "object") throw new Error("Nothing to save.");
  const seen = new Set();
  const work = arr(c.work, 20, "Portfolio").map((o, oi) => {
    const L = "Employer " + (oi + 1);
    const slug = str(o.slug, 40, L + " web address");
    if (!SLUG_RE.test(slug)) throw new Error(L + " needs a web address made of lowercase letters, numbers and dashes.");
    if (seen.has(slug)) throw new Error("Two employers share the web address \"" + slug + "\".");
    seen.add(slug);
    return {
      slug,
      name: str(o.name, 120, L + " name", { required: true }),
      role: str(o.role, 160, L + " role"),
      intro: str(o.intro, 700, L + " intro"),
      groups: arr(o.groups, 20, L + " groups").map((g, gi) => ({
        title: str(g.title, 120, L + " group " + (gi + 1) + " title"),
        sections: arr(g.sections, 40, L + " group " + (gi + 1) + " sections").map((s, si) => cleanSection(s, L + " group " + (gi + 1) + " section " + (si + 1)))
      }))
    };
  });
  const testimonials = arr(c.testimonials, 40, "Testimonials").map((t, i) => {
    const L = "Testimonial " + (i + 1);
    const out = {
      name: str(t.name, 80, L + " name", { required: true }),
      who: str(t.who, 140, L + " role"),
      org: str(t.org, 140, L + " organization"),
      q: longStr(t.q, 800, L + " quote", { required: true }),
      ctx: str(t.ctx, 400, L + " context")
    };
    if (t.photo) {
      if (typeof t.photo !== "string" || !PHOTO_RE.test(t.photo)) throw new Error(L + " has an invalid photo.");
      out.photo = t.photo;
    }
    if (t.src && t.src.id) {
      if (!TYPES.has(t.src.type)) throw new Error(L + " original has an unknown type.");
      out.src = { type: t.src.type, id: driveId(t.src.id, L + " original"), title: str(t.src.title, 160, L + " original title") || out.name };
    }
    return out;
  });
  const home = cleanHome(c.home);
  const res = { work, testimonials, updated: new Date().toISOString() };
  if (home) res.home = home;
  return res;
}
