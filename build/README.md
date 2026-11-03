# Site sources

`index.html` and `portfolio.html` in the parent folder are generated from these files.

- `head.html` – shared page shell, all CSS, and the markup for every section
- `data_block.js` – content (portfolio work, badges, services, experience, testimonials data lives in `tail.html`)
- `tail.html` – the page script
- `build.py` – splits the shell into the Home and Portfolio pages

Rebuild after editing: `python3 build/build.py` (run from the repo root). Cloudflare Pages needs no build step; it serves the generated files as they are.
