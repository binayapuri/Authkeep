# Authkeep — GitHub Pages + Namecheap Setup

Complete guide to host Authkeep on GitHub Pages and connect your Namecheap domain.

---

## Part 1: GitHub Pages (Do This First)

### Step 1: Enable GitHub Pages

1. Go to **https://github.com/binayapuri/Authkeep**
2. Click **Settings** → **Pages** (left sidebar under "Code and automation")
3. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**
   - **Branch**: Select `gh-pages` and `/ (root)`
4. Click **Save**

> **Note**: The `gh-pages` branch is created by the workflow. If you don't see it yet, push to `main` first and wait for the Actions workflow to finish (check the **Actions** tab).

### Step 2: Trigger Deployment (if needed)

If you just pushed, the workflow runs automatically. Check:

1. Go to **Actions** tab in your repo
2. You should see "Deploy to GitHub Pages" workflow
3. If it's green ✓, your site is live

If not, push any change to `main`:

```bash
cd /Users/projects/Authkeep
git add .
git commit -m "Trigger deployment" --allow-empty
git push origin main
```

### Step 3: Add Custom Domain (Namecheap)

1. In **Settings** → **Pages**, find **Custom domain**
2. Enter your domain (e.g. `authkeep.com` or `www.authkeep.com`)
3. Click **Save**
4. **Enforce HTTPS** will appear after DNS propagates — turn it ON

---

## Part 2: Namecheap DNS Configuration

Log in to [Namecheap](https://www.namecheap.com) → **Domain List** → **Manage** next to your domain.

### Option A: Use `www` (Recommended — simpler)

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | `binayapuri.github.io` | Automatic |

- **Host**: `www` (or `www.yourdomain.com` depending on Namecheap UI)
- **Value**: `binayapuri.github.io`
- **TTL**: Automatic

In GitHub Pages custom domain, use: `www.yourdomain.com`

### Option B: Use root domain (e.g. `authkeep.com`)

Add these **A Records**:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | Automatic |
| A | @ | 185.199.109.153 | Automatic |
| A | @ | 185.199.110.153 | Automatic |
| A | @ | 185.199.111.153 | Automatic |

Add **CNAME** for www redirect:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | `binayapuri.github.io` | Automatic |

In GitHub Pages custom domain, use: `yourdomain.com` (no www)

### Option C: Both root + www

1. Add all 4 A records for `@` (root)
2. Add CNAME for `www` → `binayapuri.github.io`
3. In GitHub Pages, enter your root domain (e.g. `authkeep.com`)
4. GitHub will serve both `authkeep.com` and `www.authkeep.com`

---

## Part 3: Namecheap Step-by-Step (with screenshots reference)

1. **Domain List** → click **Manage** next to your domain
2. Go to **Advanced DNS** tab
3. Remove any conflicting A or CNAME records for `@` or `www`
4. Click **Add New Record**
5. Add records as in Option A or B above
6. Wait 5–30 minutes for DNS to propagate (can take up to 48 hours)

---

## Part 4: Verify

### Check DNS propagation

- [https://dnschecker.org](https://dnschecker.org) — enter your domain
- Or run: `dig yourdomain.com` or `nslookup yourdomain.com`

### Check GitHub Pages

1. **Settings** → **Pages**
2. Custom domain should show a green checkmark when DNS is correct
3. Enable **Enforce HTTPS**

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "DNS check failed" | Wait 30–60 min, verify records at dnschecker.org |
| "Not a valid domain" | Use domain without `http://` or `https://` |
| Site loads but no HTTPS | Wait for DNS, then enable "Enforce HTTPS" |
| 404 on custom domain | Ensure GitHub Pages source is **Deploy from a branch** (gh-pages) |
| Namecheap "URL Redirect" | Turn OFF any redirect for `@` or `www` |

---

## Quick Reference

- **Repo**: https://github.com/binayapuri/Authkeep
- **GitHub Pages URL**: https://binayapuri.github.io/Authkeep/
- **Custom domain**: Add in Settings → Pages after DNS is set

---

## 404 Page Note

The `404.html` links to `/` (home). If you're using **only** the GitHub Pages URL (`binayapuri.github.io/Authkeep`) before adding your custom domain, change the link in `404.html` from `href="/"` to `href="/Authkeep/"`. Once you add your custom domain, change it back to `href="/"`.

---

## Summary Checklist

- [ ] GitHub Pages enabled (Source: Deploy from a branch, gh-pages)
- [ ] Workflow ran successfully (Actions tab)
- [ ] Custom domain added in Settings → Pages
- [ ] Namecheap DNS: A records (root) and/or CNAME (www)
- [ ] Waited for DNS propagation
- [ ] Enforce HTTPS enabled
