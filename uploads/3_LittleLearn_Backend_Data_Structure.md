# LittleLearn — Backend & Data Structure

## 1. Architecture Overview
LittleLearn is **offline-first with no required backend**. All core functionality (content, progress tracking, adaptive difficulty, PDF generation) runs entirely on-device. A lightweight **optional cloud sync service** exists purely for cross-device backup and is never required for the app to function.

```
[Device: Local Data Layer] ──(optional, if online)──> [Cloud Sync Service] ──> [Parent Web/Account (optional)]
        │
        ├── Content Pack (bundled at install, read-only)
        ├── Local Progress Store (read/write, on-device)
        ├── Adaptive Engine (runs locally)
        └── Local PDF Generator (runs locally)
```

## 2. Local Data Layer (On-Device Storage)
Recommended: embedded local database (e.g., SQLite or equivalent key-value/document store) — no network dependency.

### 2.1 `child_profile`
```json
{
  "profile_id": "string (uuid)",
  "display_name_or_avatar_id": "string",
  "age_tier": "3-4 | 4-5 | 5-6",
  "created_at": "timestamp",
  "navigation_preference": "icon_only | voice_guided | combined",
  "daily_time_limit_minutes": 30,
  "color_filter_enabled": true
}
```

### 2.2 `activity_progress`
```json
{
  "progress_id": "string (uuid)",
  "profile_id": "string (fk -> child_profile)",
  "activity_id": "string (fk -> content activity)",
  "module_id": "string",
  "attempts": "integer",
  "correct_streak": "integer",
  "mastered": "boolean",
  "last_attempted_at": "timestamp",
  "next_review_due_at": "timestamp (for spaced repetition)"
}
```

### 2.3 `session_log`
```json
{
  "session_id": "string (uuid)",
  "profile_id": "string (fk)",
  "started_at": "timestamp",
  "ended_at": "timestamp",
  "modules_used": ["module_id", "..."],
  "eye_breaks_taken": "integer",
  "daily_cap_reached": "boolean"
}
```

### 2.4 `reward_state`
```json
{
  "profile_id": "string (fk)",
  "stickers_unlocked": ["sticker_id", "..."],
  "skill_map": {
    "literacy": "integer (0-100, internal only, never shown as a number to child)",
    "numeracy": "integer",
    "shapes": "integer",
    "memory": "integer",
    "logic": "integer",
    "patterns": "integer"
  }
}
```

### 2.5 `settings` (device-level, not per-child)
```json
{
  "offline_mode_forced": true,
  "cloud_sync_enabled": false,
  "parent_gate_type": "math_challenge | long_press",
  "print_history": ["print_job_id", "..."]
}
```

---

## 3. Content Pack Structure (Bundled, Read-Only)
Content ships as structured data files bundled into the app install — no server dependency for core content.

### 3.1 Module Manifest
```json
{
  "module_id": "count_and_play",
  "display_name": "Count & Play",
  "age_tiers_supported": ["3-4", "4-5", "5-6"],
  "activity_generator": "counting_engine_v1",
  "asset_bundle": "assets/count_and_play/"
}
```

### 3.2 Activity Template (Procedural Variation Engine)
Rather than authoring 5,000+ activities by hand, each module defines a **generator** that produces many activity instances from a template + asset pool. Example for Count & Play:

```json
{
  "generator_id": "counting_engine_v1",
  "parameters": {
    "object_pool": ["apple", "star", "duck", "block", "flower", "..."],
    "count_range_by_tier": {
      "3-4": [1, 5],
      "4-5": [1, 10],
      "5-6": [1, 20]
    },
    "layout_variants": ["grid", "scattered", "line", "circle"],
    "interaction_types": ["tap_to_count", "drag_to_group", "select_matching_number"]
  },
  "output": "activity_instance (object_pool item × count × layout × interaction = thousands of unique instances)"
}
```

This same pattern (template + pool + parameter ranges = generated instances) applies to:
- **ABC Land** (letter × phonics word × tracing pattern)
- **Animal/Bird modules** (creature × sound × habitat scene)
- **Shape Detective** (shape × hidden-in-scene × sorting rule)
- **Memory Match** (theme deck × grid size)
- **Math Magic** (trick type × number range × visual object set)

**Target:** 5,000+ generated activity instances across all modules combined, tracked individually in `activity_progress` by a deterministic `activity_id` (hash of generator parameters) so repetition/spaced-repetition can reference the exact same instance again later.

### 3.3 Asset Bundle Structure
```
/assets
  /count_and_play/
    /images/ (compressed PNG/WebP)
    /audio/ (compressed voice lines + sound effects)
  /abc_land/
  /animal_kingdom/
  /bird_buddies/
  /shared/
    /mascot/
    /ui_icons/
    /music/
```
All assets compressed at build time to manage install footprint given full offline bundling requirement.

---

## 4. Adaptive Difficulty Engine (Local, Rule-Based)
Runs entirely on-device — no server/model call needed.

**Inputs:** `age_tier` (parent-set) + rolling performance from `activity_progress` (correct_streak, attempts, time-to-answer)

**Logic (example):**
1. Start at age-tier default difficulty band for a module's generator parameters.
2. After each activity: if `correct_streak >= 3` → shift parameter range up one notch (e.g., count_range increases) for next instance.
3. If `attempts > 2` on the same instance without success → shift down one notch, and mark `mastered: false`, schedule `next_review_due_at` +1–2 days (spaced repetition).
4. Errorless mode (age tier `3-4` only): incorrect taps trigger a gentle visual nudge toward the correct answer rather than a fail state, and do not decrement difficulty.

---

## 5. Local PDF/Printable Generator
- Runs on-device using a lightweight PDF-generation library
- Input: selected `activity_progress` records (or a date range / "this week" filter) + matching printable templates from the content pack
- Output: a locally rendered, shareable/printable PDF — no network call
- Each generated sheet embeds a QR code encoding the `activity_id` so scanning it (when back online, optional) deep-links to that exact activity in-app

---

## 6. Optional Cloud Sync Service (Additive Only)
- Simple sync layer: on connectivity, `child_profile`, `activity_progress`, and `reward_state` may be pushed to a parent-linked cloud account
- Conflict resolution: last-write-wins per record, keyed by `updated_at` timestamp
- No feature in Child Mode should ever block on sync availability
- Parent Mode "Cloud Sync & Backup" screen is the only place sync status is surfaced

---

## 7. Content Volume Plan (Reaching 5,000+ Activities)
| Module Category | Generator Approach | Approx. Instance Count |
|---|---|---|
| Literacy (ABC, Rhyme, Story, Write) | letter/word/story × tracing pattern × difficulty | ~1,200 |
| Numeracy (Count & Play, Math Magic) | object × count × layout × interaction | ~1,200 |
| Nature (Animal Kingdom, Bird Buddies) | creature × sound × scene × quiz variant | ~1,000 |
| Cognitive (Shape Detective, Puzzle Path, Memory Match, Odd One Out, Sequence Builder) | theme × grid size × rule set | ~1,200 |
| Life Skills (Body & Senses, Weather, Emotions, Community Helpers, Opposites, Music) | scenario × character × prompt variant | ~600 |
| **Total (target)** | | **~5,200+** |

This keeps development effort focused on building strong **generator engines + asset pools** per category rather than hand-authoring every single activity — the same approach large competitors use to reach high activity counts.
