# START HERE

> **Double-click `setup.bat`**
> Answer 4 questions. Everything else is automatic.

---

## How It Works

```
1. Copy starter-kit\ to your new project folder
2. Copy Portals\Design\ into it as web\
3. Double-click setup.bat
```

**setup.bat asks only 4 things:**
```
Brand color?    #E8A020
Phone?          0800 530 0853
Email?          info@yoursite.co.uk
Domain?         yoursite.co.uk
```

**Everything else is auto:**

| Auto-detected / hardcoded | Value |
|---|---|
| Project name | Your folder name |
| Firebase ID | folder-name (lowercase) |
| GitHub repo | folder-name (lowercase) |
| Google AI key | `AIzaSyAqKnOs6P3CYwtgqNzTv3tciH2fSiTTWEs` |
| 4 brand colors | Computed from your 1 hex input |

**Then setup.bat automatically:**
1. Computes 4 colors: primary, primary-dark, primary-light, accent
2. Replaces all `<<PLACEHOLDER>>` across 200+ files
3. Creates `web/.env.local` with Google AI key pre-filled
4. Updates `globals.css`, `brand-overrides.css`, `.lovable/system.md`
5. Runs `npm install`
6. Creates GitHub repo via API
7. Git init + push
8. Opens 5 browser tabs: GitHub, Stitch, Lovable, Jules, Firebase

---

## After setup.bat (5 min browser setup)

| Tab opened | One-time action |
|---|---|
| **GitHub** | Settings → Secrets → add `FIREBASE_SERVICE_ACCOUNT` |
| **Stitch** | New project → paste brand color |
| **Lovable** | Connect GitHub → select your repo |
| **Jules** | Get API key → add to `web/.env.local` |
| **Firebase** | Enable Hosting + Firestore |

---

## Then start building

```
cd web
npm run dev          → localhost:4000

Edit page.tsx        → replace all content with your company info
Drop images in public\  → hero.png, team.png, service photos
Follow .agents\workflows\master-flow.md
```

---

## Hard Rules

- `.env.local` is never committed (in `.gitignore`)
- Never edit `web\src\components\blocks\`, `\ui\`, `\cinematic\` — READ-ONLY
- Brand color only goes in `globals.css` (`--color-primary`) and `brand-overrides.css`
- Run `/verify-pyramid` before every deploy
