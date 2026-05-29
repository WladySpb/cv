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

Click the **Download PDF** button in the top-right corner (or just press Ctrl/Cmd+P).
The print stylesheet hides the toolbar and footer, expands URLs next to links and lays the page out for a clean A4 PDF.
