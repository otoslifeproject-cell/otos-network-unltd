# OTOS Continuity — private briefing for UnLtd

Static single-page site. No build step, no dependencies, no framework.

## Deploy

1. Create a **new, private** GitHub repository — e.g. `otos-unltd`.
2. Upload the contents of this folder to the repository root (not the folder itself — `index.html`
   must sit at the top level).
3. In Vercel: **Add New → Project → import the repository.**
   - Framework preset: **Other**
   - Build command: **leave empty**
   - Output directory: **leave empty** (root)
4. Add the domain **unltd.otos.network** in Vercel → Project → Settings → Domains, and point the
   `unltd` CNAME at Vercel in your DNS.

## What is in here

| File | |
|---|---|
| `index.html` | The page. All content. |
| `assets/otos.css` | The OTOS design system — the same stylesheet the partner microsite uses. |
| `assets/otos.js` | Scroll reveal and progress bar. Progressive enhancement only. |
| `assets/lockup-white.png` | The logo, nav and footer. |
| `assets/lockup-black.png` | Apple touch icon. |
| `assets/brain.svg` | Favicon. |
| `assets/noise.png` | Paper grain texture. |
| `robots.txt` | Disallows all crawlers. |
| `vercel.json` | Sends `X-Robots-Tag: noindex` on every response. |

## Not indexed

The page carries `<meta name="robots" content="noindex, nofollow">`, `robots.txt` disallows
everything, and `vercel.json` sets the header server-side. Three layers.

**None of that is access control.** Anyone with the URL can read it. Do not treat it as private —
treat it as unlisted.

## Rules

- Do not add analytics, tag managers, chat widgets or embeds.
- Do not link the partner microsite from this page. It names real NHS and charity services who have
  not agreed to appear on an OTOS surface.
- Any change to the figures on this page must be checked against `0 - LAW/03 - THE CLAIMS` first.
