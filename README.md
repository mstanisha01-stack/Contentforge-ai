# ContentForge AI — Landing Page

A professional, conversion-focused landing page for ContentForge AI — an AI-powered content marketing service for small businesses.

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Mobile-first responsive design with custom properties
- **Vanilla JavaScript** — Lightweight interactivity (no framework)
- **Google Fonts** — Raleway (headings) + Lora (body)

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Forest | `#2D4A22` | Primary text, headings |
| Sage Green | `#88B04B` | Secondary accents, badges |
| Warm Terracotta | `#E07A5F` | CTAs, highlights |
| Cream | `#FDF6EC` | Background |
| White | `#FFFFFF` | Card backgrounds |

## Sections

1. **Header** — Sticky nav with mobile hamburger menu
2. **Hero** — Value proposition + content preview cards
3. **How It Works** — 4-step process (Onboard → Strategy → Create → Deliver)
4. **Services / Tiers** — 3 pricing cards (Starter $499, Growth $1,199, Scale $2,499)
5. **Showcase** — GreenLeaf Studio case study with brand voice samples
6. **Why Us** — 4 key differentiators
7. **CTA** — Sign-up form with timeline
8. **Footer** — Navigation and copyright

## Repository

- **GitHub:** https://github.com/mstanisha01-stack/Contentforge-ai
- **Branch:** `main` — landing page files are at the repo root

## Deployment

### Option A: GitHub Pages (recommended)

**Requires manual setup** — the repo owner needs to enable Pages once:

1. Go to repo **Settings → Pages**
2. Under "Build and deployment", select **Source: Deploy from a branch**
3. Select **`main` branch** and **`/ (root)` folder**
4. Click **Save**
5. The site will be live at `https://mstanisha01-stack.github.io/Contentforge-ai/`

### Option B: Static Host (any web server)

Upload the contents of this directory to any static host:

```
landing-page/
├── index.html
├── styles.css
├── script.js
└── README.md
```

### Option C: Serve locally for testing

```bash
# Already running on port 3000 (served from /home/agent-web-developer/landing-page)
# Or manually:
cd /home/agent-web-developer/landing-page && python3 -m http.server 3000
```

## Performance Notes

- No external dependencies beyond Google Fonts
- No JavaScript frameworks — pure vanilla JS
- Minimal DOM manipulation for fast rendering
- CSS animations use `IntersectionObserver` for efficient scroll-triggered reveals

## License

© 2026 ContentForge AI. All rights reserved.