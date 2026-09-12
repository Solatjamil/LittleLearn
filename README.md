# LittleLearn — Kindergarten Learning (Eye-Safe by Default)

**Free, fully offline-first mobile learning for ages 3–6** with eye protection woven into the learning loop itself.

> One codebase → **Website (responsive web)** + **Native-feel App (bottom navigation)** + **Android (Capacitor)**

---

## ✨ Live Preview

Open `index.html` — it is a **self-contained PWA** (no build step needed). Works fully offline after first load.

- **Website view**: wide layout, header nav, module grid 4 cols, sidebar-style browse
- **App view**: phone frame (420px), bottom navigation, large touch targets — tap the **📱 App / 🌐 Website** toggle in the top bar
- **Both views share the same bottom navigation** — fixed, blurred, rounded pill bar at the bottom (native app pattern)

---

## 👁️ Eye Protection — ON by Default (Core USP)

Not a bolted-on parental control — it's the default loop:

- **Warm/dim blue-light filter** — `body.eye-protection` + overlay `#eyeWarmOverlay` active on first load. Badge shows **Eye Care ON** (green). Stored in `child_profile.color_filter_enabled = true`.
- **20-20-20 story breaks** — timer every **20 min** (demo mode: 25s for review). Full-screen takeover: Leo says “Look at the far mountains for 20 seconds!” — 20s countdown with progress bar, breathing animation. `EyeBreakOverlay` is non-dismissible by child until countdown ends.
- **30-min daily cap** (parent-adjustable 15/30/45/60) — live countdown in top pill `⏳ 30:00 left today`. At cap → gentle “Goodnight” lock (`capOverlay`) with printables teaser — no infinite scroll, no autoplay.
- **2-min Eye Stretch mini-game** — tap 🌬️ to follow the star left/right/far/near with breathing; 15s demo / 60–120s production.
- **No autoplay / no infinite scroll** — every `ActivityCard` has a natural end + “Next variation →” choice.
- **Parent Dashboard** shows `eye_breaks_taken`, time used, modules used, weekly report.

All timers run on-device, no server.

---

## 🧭 Navigation (App + Website)

**Bottom Navigation (always visible):**
- `Home` 🏠 — Home Hub: mascot greeting, progress trail, Choice picker, 20-world grid, sibling mode & sticker teaser
- `Learn` 📚 — Filtered Learn worlds
- `Play` 🎮 — Cognitive games (adaptive difficulty explainer)
- `Rewards` 🏆 — Sticker Book + KPIs (visual, no numeric scores to child)
- `Parents` 👨‍👩‍👧 — **Parent-gated** (math challenge or 2-sec long-press)

**Website header nav** (web-mode only, extra): Home / Learn / Play / Printables / Parents

Switch views with the **🌐 Website / 📱 App** pill in the top bar — the app view constrains to a phone frame with shadows to simulate a device.

Accessibility: `icon_only / voice_guided / combined` per profile; large 56–88pt touch targets; voice narration via Web Speech API on every screen.

---

## 📱 Android Bootstrapping (Capacitor)

### 1. Install & init (one-time)
```bash
npm install
npm run cap:init        # already configured: LittleLearn / com.littlelearn.kids / webDir=.
npm run cap:add:android # creates ./android project
npm run cap:sync        # copies web assets into native shell
```

### 2. Open in Android Studio
```bash
npm run cap:open:android
# or: npx cap open android
```

### 3. Build APK/AAB
```bash
# Debug APK
npm run android:debug
# → android/app/build/outputs/apk/debug/app-debug.apk

# Release (needs keystore)
cd android && ./gradlew bundleRelease
```

**Config** is in `capacitor.config.json`:
- `appId: com.littlelearn.kids`
- `webDir: .` (this folder is the web build — no Vite step; index.html is the bundle)
- Splash `FFF7ED`, StatusBar light, `allowMixedContent` for local PDF generation

> For a true offline APK with zero network at runtime, the web assets are **bundled at install** — no post-install content downloads. The service worker (`sw.js`) also caches for instant offline on web.

**Alternative without Android Studio** (quick test):
- Use **PWABuilder** or **Trusted Web Activity (TWA)**: bubblewrap `bubblewrap init --manifest https://your-host/manifest.json`
- Or `npx @capacitor/assets generate` for icons/splash.

---

## 🗃️ Offline Data Layer (per `3_LittleLearn_Backend_Data_Structure.md`)

All local, in `localStorage` key `littlelearn_v1`:

- `child_profile` — `profile_id, display_name_or_avatar_id, age_tier (3-4|4-5|5-6), navigation_preference, daily_time_limit_minutes, color_filter_enabled`
- `activity_progress` — per activity `attempts, correct_streak, mastered, next_review_due_at` (spaced repetition)
- `session_log` — `started_at, ended_at, modules_used, eye_breaks_taken, daily_cap_reached`
- `reward_state` — `stickers_unlocked[], skill_map {literacy,numeracy,shapes,memory,logic,patterns:0-100}` (internal, never shown as number to child)
- `settings` — `offline_mode_forced:true, cloud_sync_enabled:false, parent_gate_type`

**Content Pack**: 20 modules × procedural variation engines (e.g., `counting_engine_v1` → object × count × layout × interaction = thousands of instances). Deterministic `activity_id` = hash of generator params for spaced repetition.

**Adaptive Engine** (local, rule-based): age tier band → +1 notch after `correct_streak>=3`, −1 + reschedule 1–2d after `attempts>2`; errorless nudge for 3–4 tier.

---

## 🖨️ Printables (Local PDF)

- `Local PDF Generator` uses `jsPDF` (CDN, graceful fallback to `window.print()` if offline-first preview blocks CDN)
- Input: `activity_progress` / “this week” filter / manual picker
- Output: A4 PDF with tracing lines, QR `littlelearn://activity/<id>` deep-link
- `Printables Center` in Parent Mode: preview thumbnails → Export as PDF → `LittleLearn-Weekly-YYYY-MM-DD.pdf` (no server round-trip)

Try: Parent Mode → 🖨️ Print This Week’s Lessons

---

## 🎨 UI Structure (per `2_LittleLearn_UI_Structure.md`)

- **Child Mode** screens: Splash → Profile Picker → Home Hub → Activity Screen (shared template) → Choice picker → Eye-Break Overlay → Peer Mode → Sticker Book
- **Parent Mode** (gated): Dashboard → Usage Summary → Skill Map (leaves, not percentiles) → Child Profile Settings → Printables Center → Cloud Sync & Backup → About/Privacy/Offline indicator
- **Components**: `MascotCharacter`, `ActivityCard`, `ChoiceTile`, `ProgressTrail`, `RewardSticker`, `EyeBreakOverlay`, `ParentGate`, `PrintPreviewCard`, `VoiceNarrationBar`
- Palette: warm, high-contrast but soft (blue-light-reduced default); rounded 22–28px; animations <3s

---

## 🚀 Run Locally

No build needed:
```bash
# Option A: just open index.html in browser
open index.html

# Option B: serve (for PWA install + SW)
npx serve . -l 5173
# then visit http://localhost:5173
```

Install as PWA: browser → Install / Add to Home Screen → standalone.

---

## 🔐 Privacy & Offline

- No ads, no child-directed IAP, no login for core play
- Optional parent account for cloud backup only (off by default, last-write-wins)
- All assets compressed & bundled at install; `sw.js` caches for offline

---

## 📂 Files

- `index.html` — full app (HTML/CSS/JS inline, zero-dependency preview-safe)
- `manifest.json` — PWA manifest (standalone, theme #FF8A65)
- `sw.js` — offline cache (cache-first, network-first for CDN)
- `capacitor.config.json` + `package.json` — Android bootstrapping
- `uploads/1..3_LittleLearn_*.md` — source specs

Built for **today 2026-09-12** — ready to demo eye breaks in 25s demo mode.
