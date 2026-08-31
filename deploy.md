# Deployment Guide — THAELON

Free-tier deployment to GitHub Pages with full security hardening.
No paid services required.

---

## Prerequisites

- Git installed locally
- GitHub account (free)
- Node.js 18+ installed

---

## Step 1 — Prepare the Repository

### 1.1 Create a GitHub repository

1. Go to [github.com](https://github.com) → **New repository**
2. Name it `thaelon` (or `<your-username>.github.io` for root domain hosting)
3. Set visibility to **Public** (required for free GitHub Pages)
4. Do **not** initialise with README — you already have one
5. Click **Create repository**

### 1.2 Push the project

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/thaelon.git
git push -u origin main
```

---

## Step 2 — Configure Vite for GitHub Pages

GitHub Pages serves the site from a subdirectory by default (e.g. `https://<username>.github.io/thaelon/`).
Vite needs to know the base path so asset URLs resolve correctly.

Open `vite.config.js` and add the `base` option:

```js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/thaelon/',   // match your repo name exactly
})
```

> If you use a **custom domain** (Step 7), set `base: '/'` instead.

---

## Step 3 — Add the GitHub Actions Deployment Workflow

Create the file `.github/workflows/deploy.yml` in your project:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Commit and push this file:

```bash
git add .github/workflows/deploy.yml
git commit -m "add github pages deploy workflow"
git push
```

---

## Step 4 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **GitHub Actions**
3. Save

The workflow will trigger automatically on every push to `main`.
Your site will be live at: `https://<your-username>.github.io/thaelon/`

---

## Step 5 — Security Headers via `_headers` File

GitHub Pages does not support custom HTTP headers natively.
Use **Cloudflare Pages** as a free CDN proxy **or** add a `_headers` file for Netlify/Cloudflare.

### Option A — Cloudflare Pages (recommended free option)

Cloudflare Pages is free, supports custom headers, and adds a CDN.

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repo
3. Build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Create `public/_headers` in your project:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
```

### Option B — Netlify (also free)

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connect your GitHub repo, set build command `npm run build`, publish dir `dist`
3. Create `public/_headers` with the same content as above

> With either option, set `base: '/'` in `vite.config.js` instead of `'/thaelon/'`.

---

## Step 6 — SPA Routing Fix (404 on Refresh)

React Router or direct URL access causes 404 on GitHub Pages because there is no server to rewrite URLs.

Create `public/404.html` with this content:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script>
      var l = window.location;
      l.replace(l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1).join('/') + '/?p=/' +
        l.pathname.slice(1).replace(/&/g, '~and~') + (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash);
    </script>
  </head>
</html>
```

> This project currently uses hash-based anchor links (`#about`, `#contact`) so routing is not an issue. Add this only if you introduce React Router later.

---

## Step 7 — Custom Domain (Optional, Free)

You can point a custom domain to GitHub Pages for free.

### 7.1 Add CNAME in repo

Create `public/CNAME` containing only your domain:

```
thaelon.com
```

Commit and push. GitHub Pages will automatically serve from this domain.

### 7.2 Configure DNS

At your domain registrar, add these DNS records:

| Type  | Name | Value                   |
|-------|------|-------------------------|
| A     | @    | 185.199.108.153         |
| A     | @    | 185.199.109.153         |
| A     | @    | 185.199.110.153         |
| A     | @    | 185.199.111.153         |
| CNAME | www  | `<username>.github.io`  |

### 7.3 Enable HTTPS

1. Repo → **Settings** → **Pages**
2. Under **Custom domain**, enter your domain and save
3. Check **Enforce HTTPS** (appears once DNS propagates, usually 10–30 min)

---

## Step 8 — Pre-Deploy Security Checklist

Run through these before every production push:

### Code

- [ ] Run `npm audit` — must show **0 vulnerabilities**
- [ ] Run `npm run build` locally — must complete with no errors
- [ ] Check browser console on the built site — no errors, no warnings

### Secrets and data

- [ ] No API keys, tokens, or passwords in any file tracked by Git
- [ ] No `.env` files committed (add `.env*` to `.gitignore`)
- [ ] Contact details in `Contact.jsx` are intentional and acceptable

### Headers (verify after deploy)

Test your live site at [securityheaders.com](https://securityheaders.com):

| Header                    | Expected value                          |
|---------------------------|-----------------------------------------|
| Content-Security-Policy   | Present (set in `index.html` meta tag)  |
| X-Frame-Options           | DENY                                    |
| X-Content-Type-Options    | nosniff                                 |
| Referrer-Policy           | strict-origin-when-cross-origin         |
| Strict-Transport-Security | max-age=31536000 (HTTPS only)           |
| Permissions-Policy        | camera=(), microphone=(), geolocation=() |

### HTTPS

- [ ] Site only accessible via HTTPS (no HTTP fallback)
- [ ] `Strict-Transport-Security` header present

### External links

- [ ] All `target="_blank"` links have `rel="noopener noreferrer"` ✓ (already in code)

---

## Step 9 — Ongoing Maintenance

### Check for dependency vulnerabilities monthly

```bash
npm audit
```

If vulnerabilities are found:

```bash
npm audit fix
```

For breaking changes that require manual review:

```bash
npm audit fix --force   # use with caution — may break things
```

### Update dependencies

```bash
npm update
```

Check for major version updates (not applied by `npm update`):

```bash
npx npm-check-updates
```

### Monitor your site

- [Google Search Console](https://search.google.com/search-console) — free, shows crawl errors and security issues Google detects
- [Mozilla Observatory](https://observatory.mozilla.org) — free security scan, aim for B+ or higher

---

## Quick Reference — Deploy Commands

```bash
# Install dependencies cleanly
npm ci

# Local dev server
npm run dev

# Production build (output → dist/)
npm run build

# Preview production build locally
npm run preview

# Lint check
npm run lint

# Dependency security scan
npm audit
```

---

## Security Fixes Already Applied in Codebase

These are already done — no action needed:

| Fix | File | What it does |
|-----|------|--------------|
| CSP meta tag | `index.html` | Blocks XSS, framing, restricts resource origins |
| Referrer-Policy meta | `index.html` | Stops URL leaking to third parties |
| X-Content-Type-Options meta | `index.html` | Prevents MIME sniffing |
| localStorage validation | `App.jsx` + `index.html` FOUC script | Only `'dark'` or `'light'` accepted from storage |
| `rel="noopener noreferrer"` | `Contact.jsx`, `Projects.jsx` | Prevents tab-napping on external links |
| No `dangerouslySetInnerHTML` | All JSX | No XSS surface |
| 0 npm vulnerabilities | `package.json` | Clean dependency tree |
