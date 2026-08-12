# Gokula Chandra Kulala — Portfolio

A plain HTML/CSS/JS recreation of the portfolio (home, about, projects, experience, contact +
3 case studies), rebuilt in a dark "signal amber" theme with a custom circular cursor
spotlight that follows the mouse and illuminates a dot-grid background. No build step,
no framework — just static files, so it drops straight into GitHub Pages.

## Structure

```
index.html
about.html
experience.html
contact.html
projects/
  index.html
  handyhelp-context-aware-genai-agent.html
  echovoice-serverless-voice-pipeline.html
  resume-analysis-nlp-gpt.html
assets/
  css/style.css     -> all styling, incl. .spotlight-glow / .spotlight-ring
  js/main.js         -> cursor spotlight, mobile nav, tabs, copy button, scroll reveal
```

## Run it locally

Because the pages link to each other with relative paths, the most reliable way to preview
it is a tiny local server (double-clicking `index.html` also works fine, but a server avoids
any browser quirks with `file://` links):

```bash
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

No dependencies, no `npm install` — just Python (already on macOS/Linux; on Windows use
`py -m http.server 8000`).

## Deploy to GitHub Pages

1. Create a new GitHub repo (or reuse an existing one).
2. Copy everything **inside** this `portfolio` folder to the repo root (so `index.html` sits
   at the repo root, not nested in a subfolder).
3. Commit and push.
4. In the repo: **Settings → Pages → Source → Deploy from a branch**, pick `main` and `/root`.
5. Your site will be live at `https://<username>.github.io/<repo-name>/` within a minute or two.

If you want it at `https://<username>.github.io/` directly (no repo name in the path),
name the repo `<username>.github.io`.

## Customizing

- **Colors / fonts**: edit the `:root` variables at the top of `assets/css/style.css`
  (`--accent` is the amber signal color used throughout).
- **Cursor spotlight**: tuned in `assets/js/main.js` under `initSpotlight()` — `glowEase`
  and `ringEase` control how closely the glow/ring track the mouse; it auto-disables on
  touch devices and respects `prefers-reduced-motion`.
- **Content**: all copy lives directly in the HTML files, matching the original site's text.
