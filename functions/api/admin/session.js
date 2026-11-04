import { json, isAuthed } from "../../_lib/util.js";

// Tells the editor page whether to show the login form, and whether setup is complete.
export async function onRequestGet({ request, env }) {
  return json({
    storage: !!env.CONTENT,
    password: !!env.ADMIN_PASSWORD,
    authed: await isAuthed(request, env)
  });
}
