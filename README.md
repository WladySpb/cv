# cv.wladyspb.pro

Personal CV / online resume of Vladimir Golubev. Static site, deployed to GitHub Pages.

## Stack

Plain HTML + CSS + a few lines of JS. No build step, no framework.

## Local preview

Just open `index.html` in a browser. Or serve the folder with anything static, e.g.:

```bash
python -m http.server 8080
```

## Deploy

1. Push to `main` on `git@github.com:WladySpb/cv.git`.
2. In GitHub repo settings → Pages → Source: `main` branch, root (`/`).
3. The `CNAME` file binds the site to `cv.wladyspb.pro`. Make sure the DNS for that subdomain points to GitHub Pages (`CNAME` → `wladyspb.github.io`).
4. `.nojekyll` disables Jekyll processing.

## Download as PDF

Use the focus switcher to view the overall CV or a targeted **Tech Lead**,
**Staff Engineer**, or **AI Architect** version. The selected role is kept in
the URL (`?role=...`) and in local storage so a recruiter can receive a direct
link to the relevant version.

The **Download CV** button opens the pre-rendered role PDF from `pdf/` when it
is available. If the file is not available yet (including local `file://`
usage), it falls back to `window.print()`.

The print stylesheet uses a single ATS-friendly column, system fonts, canonical
section headings, and role-aware filtering. GitHub Actions renders the three
targeted PDFs with Puppeteer on pushes to `main` and commits them back to the
site. The overall view remains available through browser printing.
