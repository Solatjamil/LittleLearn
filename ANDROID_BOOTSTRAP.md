# Android Bootstrapping — LittleLearn (Capacitor)

This project is **web-first, native-ready**. `index.html` is the production bundle (no Vite build step) — Capacitor wraps it as a native Android app.

## What you get
- **PWA** (web) + **Capacitor Android shell** sharing the same code
- Bottom navigation that feels native on Android (edge-to-edge, gesture-safe)
- Offline-first: all assets bundled at install, `sw.js` caches, zero post-install downloads

---

## Option A — Capacitor (recommended, full native)

### Prerequisites
- Node 18+, Java 17, Android Studio (with SDK + Platform Tools)
- `ANDROID_HOME` env set

### Steps
```bash
# 1. Install deps
npm install

# 2. Init (already configured, but if fresh)
npx cap init LittleLearn com.littlelearn.kids --web-dir=.

# 3. Add Android platform (creates ./android/)
npm run cap:add:android
# or: npx cap add android

# 4. Sync web assets → native
npm run cap:sync
# or: npx cap sync

# 5. Open in Android Studio
npm run cap:open:android

# 6. Run on device/emulator from Android Studio, or:
npm run android:debug
# APK → android/app/build/outputs/apk/debug/app-debug.apk
```

### Icons & Splash
```bash
# Place 1024x1024 icon at assets/icon.png and 2732x2732 splash at assets/splash.png
npx @capacitor/assets generate --android
```

### Release (AAB for Play Store)
```bash
cd android
# Create keystore once:
keytool -genkey -v -keystore littlelearn.keystore -alias littlelearn -keyalg RSA -keysize 2048 -validity 10000
# Then:
./gradlew bundleRelease
# AAB → android/app/build/outputs/bundle/release/app-release.aab
```

**Config** (`capacitor.config.json`):
```json
{
  "appId": "com.littlelearn.kids",
  "appName": "LittleLearn",
  "webDir": ".",
  "server": { "androidScheme": "https" },
  "plugins": {
    "SplashScreen": { "launchShowDuration": 1200, "backgroundColor": "#FFF7ED" },
    "StatusBar": { "style": "LIGHT", "backgroundColor": "#FFF7ED" }
  }
}
```

---

## Option B — Trusted Web Activity (TWA) / PWABuilder (no Android Studio)

If you host the PWA (e.g., Vercel/Netlify/GitHub Pages):

```bash
# Install bubblewrap
npm i -g @bubblewrap/cli

# Init from manifest
bubblewrap init --manifest https://your-domain/manifest.json

# Build
bubblewrap build
# → app-release-signed.apk
```

Or upload `manifest.json` to **PWABuilder.com** → Generate Android package.

---

## Option C — Quick APK without building (for demo)

- Install the PWA on Android Chrome: visit hosted URL → ⋮ → **Install app** / **Add to Home screen** — it runs standalone, offline, with the same bottom nav and eye-care.

---

## Verifying Eye Protection on Android

1. Launch app — notice **warm filter** (slightly sepia/warm, eye-care badge green: ON)
2. Top pill shows `⏳ 30:00 left today` counting down
3. Toggle `🌐 Website / 📱 App` not needed on Android — phone chrome already in App view
4. In Parent Mode → toggle **Demo: 25s** → watch 20-20-20 takeover fire every 25s (Leo + 20s countdown + progress)
5. Check daily cap: set to 1 min for demo, watch gentle Goodnight lock at 60s
6. Test printables: Parent → Print This Week's Lessons → PDF saved via Android share sheet (no server)

---

## Troubleshooting

- **White screen?** Ensure `webDir` is `.` and `index.html` is at root. Run `npx cap sync` after any web change.
- **SW not caching?** Clear app data or bump `CACHE` name in `sw.js`.
- **jsPDF blocked?** Offline fallback uses `window.print()` → Save as PDF still works.

---

Generated 2026-09-12 — Package: `com.littlelearn.kids` — Offline-first, eye-safe by default.
