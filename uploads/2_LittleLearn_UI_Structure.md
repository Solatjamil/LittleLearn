# LittleLearn — UI Structure

## 1. App Modes
Two top-level modes, switched via a **parent-gated toggle** (simple math problem or long-press to prevent child access):
- **Child Mode** — the entire play experience
- **Parent Mode** — dashboard, settings, printables, sync

---

## 2. Child Mode — Screen Map

```
Splash/Loading Screen
   └── Profile Picker (avatars only, no text needed — if multiple children)
         └── Home Hub (main screen)
               ├── Module Grid (icon tiles: ABC Land, Animal Kingdom, Bird Buddies,
               │     Count & Play, Color Splash, Write with Me, Story Time,
               │     Rhyme Time, My Body & Senses, Weather & Seasons,
               │     Emotions Corner, Community Helpers, Music & Rhythm,
               │     Opposites, Shape Detective, Puzzle Path, Math Magic,
               │     Memory Match, Odd One Out, Sequence Builder)
               ├── "Choose Your Next Adventure" (2–3 activity choice, autonomy feature)
               ├── Sticker Book / Reward Shelf (visual progress, no numbers/scores)
               ├── Mascot Character (persistent guide, voice narration source)
               └── Eye-Break Overlay (triggers automatically, not a menu item)
```

### Home Hub
- Mascot greets child by name (or avatar) with voice line
- Module tiles are large, colorful, icon-only, animated on tap
- Small progress trail (visual path/map metaphor, not a percentage bar)
- No visible clock/timer (time management is invisible to the child)

### Activity Screen (shared template across modules)
- Full-screen single-focus layout — one concept/interaction at a time
- Persistent mascot in a corner for encouragement/narration
- Large tap targets (min. 88x88pt equivalent) for all interactive elements
- No text-only instructions — every instruction is spoken + illustrated
- "Try again" animation instead of an "X" or red error state
- Optional parent-assist prompt icon (small, unobtrusive) for co-play activities

### Eye-Break Overlay
- Triggers automatically every 20 minutes of active use
- Full-screen takeover with mascot leading a 20-second "look far away" moment
- After the 30-minute daily cap, a longer "eye stretch" mini-game (60–120 sec) plays, then the app gently closes/locks with a friendly goodnight-style message
- Cannot be dismissed by the child without the parent-gate interaction

### Choice-Based Activity Picker
- Appears between activities: 2–3 illustrated options, child taps to choose
- No "back" navigation needed — flow is linear and forward-moving by design

### Peer/Sibling Mode Screen
- Split-screen or turn-based single-screen layout for two avatars
- No scoreboard — shared celebratory animation at the end regardless of outcome

---

## 3. Parent Mode — Screen Map

```
Parent Gate (PIN or simple adult-only challenge)
   └── Parent Dashboard (Home)
         ├── Usage Summary (time today/this week, modules used)
         ├── Skill Map (visual grid: shapes, patterns, memory, logic, literacy, numeracy)
         ├── Child Profile Settings
         │     ├── Age tier override
         │     ├── Time limit adjustment (default 30 min)
         │     ├── Navigation style (icon-only / voice-guided / combined)
         │     └── Multiple child profile management
         ├── Printables Center
         │     ├── "Print This Week's Lessons" (auto-generated pack)
         │     ├── Browse by Module (manual worksheet picker)
         │     └── Blank Templates Library
         ├── Cloud Sync & Backup (optional, off by default)
         └── About / Privacy / Offline Status Indicator
```

### Printables Center
- Preview pane (thumbnail) before printing/exporting PDF
- Filter by module, by date range, or "based on recent activity"
- Export as PDF (local file share/print) — no server call

### Skill Map
- Visual, non-judgmental representation (e.g., filled leaves on a tree per skill area)
- No comparison to other children, no percentile ranking

---

## 4. Shared Component Library
- `MascotCharacter` — animated guide, used across all screens, drives voice narration
- `ActivityCard` — template for any single learning interaction
- `ChoiceTile` — large icon+illustration tap target
- `ProgressTrail` — visual, non-numeric progress indicator
- `RewardSticker` — unlock animation for mastery milestones
- `EyeBreakOverlay` — full-screen break component, non-dismissible by child
- `ParentGate` — math-challenge or long-press modal
- `PrintPreviewCard` — worksheet thumbnail + export action
- `VoiceNarrationBar` — invisible controller triggering audio per screen (no visible UI needed unless parent enables captions)

## 5. Visual/Interaction Guidelines
- Rounded shapes, high-contrast but warm/soft color palette (blue-light-reduced default filter)
- Consistent mascot-led narration on every screen — child should never face unexplained silence
- All animations short (under 3 seconds) to keep attention without overstimulating
- No countdown timers visible to the child anywhere in Child Mode
