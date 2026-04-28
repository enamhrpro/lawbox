# ⚖️ LawBox — Legal Practice Management System

A complete, self-contained legal practice management system for Bangladesh law firms.
Built with React + localStorage (no backend required).

---

## 🚀 DEPLOY IN 5 MINUTES — Choose Your Platform

---

## Option A: Netlify (Recommended — Free, Fast)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "LawBox initial release"
git branch -M main
```
Create a repo at https://github.com/new, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/lawbox.git
git push -u origin main
```

### Step 2 — Deploy on Netlify
1. Go to https://netlify.com → Sign up free with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → Select your `lawbox` repo
4. Build settings (auto-detected):
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
5. Click **"Deploy site"**
6. ✅ Live in ~2 minutes at `https://random-name.netlify.app`

### Custom domain (optional)
Site settings → Domain management → Add custom domain

---

## Option B: Vercel (Also free)

### Step 1 — Push to GitHub (same as above)

### Step 2 — Deploy on Vercel
1. Go to https://vercel.com → Sign up with GitHub
2. Click **"Add New Project"** → Import your `lawbox` repo
3. Framework: **Create React App** (auto-detected)
4. Click **"Deploy"**
5. ✅ Live at `https://lawbox.vercel.app`

---

## Option C: GitHub Pages (Free, no external service)

### Step 1 — Update package.json
Add this line to package.json (replace YOUR_USERNAME):
```json
"homepage": "https://YOUR_USERNAME.github.io/lawbox"
```

### Step 2 — Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 3 — Add deploy scripts to package.json
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

### Step 4 — Deploy
```bash
git add .
git commit -m "Add gh-pages"
git push origin main
npm run deploy
```

### Step 5 — Enable Pages
GitHub repo → Settings → Pages → Source: `gh-pages` branch
✅ Live at `https://YOUR_USERNAME.github.io/lawbox`

---

## Option D: Run Locally

```bash
# 1. Install Node.js from https://nodejs.org (v18+)

# 2. Install dependencies
npm install

# 3. Start development server
npm start
# Opens http://localhost:3000

# 4. Build for production
npm run build
# Creates optimized /build folder
```

---

## 🔐 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@lawbox.bd | admin123 |
| Advocate | advocate@lawbox.bd | adv123 |
| Clerk | clerk@lawbox.bd | clerk123 |
| Client | client@lawbox.bd | client123 |

---

## 📦 Features

- **Dashboard** — Stats, recent cases, upcoming hearings, financials
- **Case Management** — Full CRUD with search, filter, detail view
- **Calendar & Hearings** — Monthly calendar, hearing scheduler
- **Cause List** — Daily court cause list by date/court
- **Documents** — Upload, categorize, manage case documents
- **Document Generator** — Legal Notice, Bail Petition, Vakalatnama, Plaint
- **AI Assistant** — Legal Q&A in English & Bangla
- **Legal Research** — Searchable Bangladesh law database
- **Billing** — Invoice creation, payment tracking
- **Admin Panel** — User management, settings, role permissions

---

## 🏗️ Tech Stack

- **React 18** — UI framework
- **localStorage** — Data persistence (no backend needed)
- **lucide-react** — Icons
- **IBM Plex Sans/Mono** — Typography

---

## 📁 Project Structure

```
lawbox/
├── public/
│   └── index.html
├── src/
│   ├── App.js          ← All components (single file)
│   ├── index.js        ← Entry point
│   └── index.css       ← Global styles
├── package.json
├── netlify.toml        ← Netlify config
├── vercel.json         ← Vercel config
└── README.md
```

---

## ⚠️ Important Notes

1. **Data is stored in localStorage** — data stays in the browser, per device
2. **No backend/database** — perfect for demo/small firm use
3. **For production with real data**, consider adding Supabase/Firebase backend
4. **HTTPS is required** for production (all deployment platforms provide this)

---

## 🛠️ Customization

Edit `src/App.js`:
- `INITIAL_CASES` — Change sample cases
- `LEGAL_DB` — Add/edit legal provisions
- `CHAT_RESPONSES` — Customize AI responses
- CSS variables in `src/index.css` — Change colors/theme
