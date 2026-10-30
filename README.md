# LUMIÈRE — The Interactive Chronicle of World Cinema (1878–Present)

**LUMIÈRE** is an interactive archival web exhibition chronicling the complete history of world cinema from Eadweard Muybridge's 1878 chronophotography to contemporary IMAX and international festivals. Designed with a full-bleed 16:9 widescreen-first layout that adapts seamlessly across desktop, laptop, tablet, and mobile viewports.

---

## ✨ Key Exhibition Features

1. **90 Landmark Films Across 7 Historical Eras (1878–2024)**
   - **35mm Celluloid Ribbon View**: Horizontal perforated film-strip track with real theatrical movie posters.
   - **3D Spatial Z-Tunnel**: Interactive mouse-parallax and wheel-driven 3D depth corridor.
   - **Poster Vault Grid**: Full-bleed responsive widescreen poster gallery (`1` to `6` columns).
   - **Full-Span 1878–2024 Interactive Bottom Scrubber**: Proportional timeline bar where every film from 1878 to 2024 is visible and selectable via mouse click, click-and-drag scrubbing, or keyboard arrow keys (`←` / `→`).

2. **World Cinema Movements (`8 Manifestos & Revolutions`)**
   - **French New Wave (*La Nouvelle Vague*)**: *Breathless*, *The 400 Blows*, *Cléo from 5 to 7*.
   - **New French Extremity (*Cinéma du Corps*)**: *Irréversible*, *Trouble Every Day*, *Martyrs*, *Raw*.
   - **Dogme 95 & The Vow of Chastity**: *Festen (The Celebration)*, *Dancer in the Dark*.
   - **German Expressionism**, **Soviet Montage & Mystic Poetics**, **Taiwanese & Hong Kong Second Wave**, **South Korean New Wave**, and **Iranian Poetic New Wave**.

3. **Festival de Cannes & Palme d’Or Exhibition**
   - Dedicated room chronicling legendary **Palme d’Or** winners, Grand Prix triumphs, midnight walkouts, and standing ovations along *La Croisette* (*Taxi Driver*, *Apocalypse Now*, *Possession*, *Paris, Texas*, *Pulp Fiction*, *La Haine*, *Taste of Cherry*, *Irréversible*, *Parasite*, *Titane*, *Anatomy of a Fall*, *The Zone of Interest*).

4. **Directors, Cult Visionaries & Screen Icons (`43 Portraits`)**
   - Full-width portrait gallery of Canon Directors, Cult & Underground Visionaries, and Screen Actors with interactive modal dossiers.

5. **Interactive Optical Lab & Frame Inspector**
   - **1878 Zoetrope Simulator**: Variable FPS (1–24 FPS) and shutter-slit aperture controls demonstrating persistence of vision.
   - **Aspect Ratio & Gate Comparator**: Live visual comparison across `1.33:1`, `1.37:1`, `1.66:1`, `1.85:1`, `2.39:1 Anamorphic`, and `1.43:1 IMAX 70mm`.
   - **Cinematographer’s Frame Overlays**: Toggle Rule-of-Thirds, Fibonacci Golden Spiral, and SMPTE 35mm Gate overlays inside any film’s inspection dossier.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3 + Custom 3D CSS Perspective & Film Grain Shaders
- **Icons**: Lucide React
- **Assets**: 100% locally cached archival theatrical posters (`/public/posters/`) and portraits (`/public/portraits/`) for instant zero-latency loading.

---

## 🚀 Local Development Instructions

### Prerequisites
- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0`

### 1. Clone the Repository
```bash
git clone https://github.com/eyeblech/lumiere.git
cd lumiere
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized static production bundle is generated in the `dist/` directory.

### 5. Preview the Production Build Locally
```bash
npm run preview
```

---

## 🌐 Deployment Guide

Because **LUMIÈRE** is a pure static Single-Page Application (SPA) with all posters and portraits bundled in `public/`, it can be deployed in seconds to any static hosting provider.

### Option A: Deploy to Vercel (Recommended)
1. Push this repository to GitHub (`https://github.com/eyeblech/lumiere`).
2. Go to [vercel.com/new](https://vercel.com/new) and import the `eyeblech/lumiere` repository.
3. Use the default settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy** — Or deploy directly from the terminal using the Vercel CLI:
   ```bash
   npx vercel --prod
   ```

### Option B: Deploy to Netlify
1. Connect your GitHub repository at [app.netlify.com](https://app.netlify.com) or run via CLI:
   ```bash
   npm run build
   npx netlify-cli deploy --prod --dir=dist
   ```
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Option C: Deploy to GitHub Pages
1. Install `gh-pages` as a dev dependency:
   ```bash
   npm install -D gh-pages
   ```
2. Add a deploy script to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run:
   ```bash
   npm run deploy
   ```

### Option D: Self-Hosted / Nginx / Docker
Serve the compiled `dist/` directory with any static file server:
```bash
npm run build
npx serve -s dist -l 3000
```
