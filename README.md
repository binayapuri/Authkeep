# Authkeep

**AI, Cloud & Security Solutions** | Melbourne, Australia

A modern, animated static website for Authkeep - enterprise-grade solutions for digital transformation.

## Features

- **Modern Design**: Deep teal/cyan color palette with electric accents
- **Smooth Animations**: Scroll-triggered animations, floating orbs, counter effects
- **Responsive**: Mobile-first, works on all devices
- **Fast**: Static HTML/CSS/JS - no build step required
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation

## Tech Stack

- Pure HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (no dependencies)

## Deploy to GitHub Pages

### Option 1: From repository root

1. Create a new GitHub repository
2. Push this folder's contents to the repo
3. Go to **Settings** → **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Select `main` branch and `/ (root)` folder
6. Save - your site will be live at `https://<username>.github.io/<repo>/`

### Option 2: Using GitHub Actions (optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8000`

## Contact

- **Location**: Melbourne, Victoria, Australia
- **Email**: info@authkeep.com

## License

© 2025 Authkeep. All rights reserved.
# Authkeep
