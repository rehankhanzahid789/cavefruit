# CraveFruit — Crave the Crunch

Frontend-only site: Vite + React 18 + React Router (HashRouter) + plain CSS. No backend, cart, login or checkout.
Routes: `/` · `/product/dragon-fruit` · `/product/banana-punch` · `/product/strawberry` · 404.

## Run it

```bash
npm install
npm run optimize-images   # originals in assets-src/ → WebP in public/assets/optimized/
npm run dev
```

(Optimized images are already included, so `optimize-images` only needs re-running if you change a source photo.)

## Deploy to GitHub Pages

1. **Set your repo name** in `vite.config.js` → `const REPO_NAME = 'cravefruit';` (must match the GitHub repo exactly; use `''` for a `user.github.io` root site).
2. Create the repo, then push:
   ```bash
   git init && git add . && git commit -m "CraveFruit"
   git branch -M main
   git remote add origin https://github.com/<you>/<REPO_NAME>.git
   git push -u origin main
   ```
3. **Option A – gh-pages branch:** `npm run deploy`, then GitHub → Settings → Pages → Source: *Deploy from a branch* → `gh-pages` / `/ (root)`.
4. **Option B – GitHub Actions:** Settings → Pages → Source: *GitHub Actions*. Every push to `main` runs `.github/workflows/deploy.yml`. (Use A or B, not both.)

Live at `https://<you>.github.io/<REPO_NAME>/`. HashRouter means refreshes never 404.

## Structure

```
assets-src/                   original photos + logos (large; not shipped in the build)
scripts/optimize-images.mjs   sharp: WebP ≤1400px q80, trimmed logos, favicon
public/assets/optimized/      the only images the site references
src/data/products.js          single source for flavors, themes, copy, image order
src/components/               Navbar Footer WavyLabel Marquee ProductCard Gallery
                              OutOfStockModal WaveDivider Sticker (+ Decor, Reveal)
src/pages/                    Home Product NotFound
src/styles/global.css         tokens (CSS variables) + all styles
```

## Notes
- Edit flavors, copy and themes in `src/data/products.js`; product pages re-theme automatically.
- For rich link previews, set an absolute Open Graph image URL in `index.html`.
- Motion respects `prefers-reduced-motion`.
- `assets-src/` is ~130 MB. Remove it from git (add to `.gitignore`) if you don't want to push it; the optimized files are all the site needs.
