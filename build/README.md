# Site sources

`index.html` and `portfolio.html` in the parent folder are generated from these files.

- `head.html` – shared page shell, all CSS, and the markup for every section
- `data_block.js` – content (portfolio work, badges, services, experience, testimonials data lives in `tail.html`)
- `tail.html` – the page script
- `build.py` – splits the shell into the Home and Portfolio pages

Rebuild after editing: `python3 build/build.py` (run from the repo root). Cloudflare Pages needs no build step; it serves the generated files as they are.

## Editor (`/admin`)

- `admin.html` (built into the parent folder) is the login-protected editor for the portfolio pieces and testimonials.
- `../functions/` holds the Cloudflare Pages Functions behind it: sign-in, saving to a KV namespace bound as `CONTENT`, photo upload, and a middleware that injects saved content into the Home and Portfolio pages (`window.__SAVED`). With nothing saved, the pages use the content in `data_block.js` and `tail.html`.
- Needs two settings in the Cloudflare Pages project: a KV binding named `CONTENT` and a secret named `ADMIN_PASSWORD`.

