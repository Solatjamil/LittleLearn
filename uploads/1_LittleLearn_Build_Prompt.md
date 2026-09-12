# LittleLearn — Kindergarten Learning App
### Master Build Prompt (for AI Agent / Development Use)

## 1. App Summary
LittleLearn is a **free, fully offline-first** mobile learning app for children ages 3–6. It teaches early literacy, numeracy, science basics, and cognitive/logic skills through short, adaptive, story-wrapped activities — while actively protecting children's eyes and screen-time habits as a **core built-in feature**, not a bolted-on parental control layer.

## 2. Unique Selling Proposition (USP)
1. **Eye protection woven into the learning loop itself** — breaks are framed as in-story moments (a character asks the child to look far away), not jarring lockout screens.
2. **One-tap printable homeschool worksheets** generated locally from whatever the child just practiced digitally — bridging screen and paper instantly.
3. **100% offline, 100% free, zero login required** for full core functionality — matches or beats the best free competitor (Khan Academy Kids) while removing any account/data requirement for a preschool audience.

## 3. Target Users
- **Children:** ages 3–6, non-readers to early readers, tiered automatically by age with live adaptive difficulty on top.
- **Parents:** primary account holder/administrator; sets up child profile, views dashboard, prints worksheets, adjusts time limits.

## 4. Core Learning Modules
| Module | Skill Focus |
|---|---|
| ABC Land | Letter recognition, phonics, tracing |
| Animal Kingdom | Animal names & sounds |
| Bird Buddies | Bird names & sounds |
| Count & Play | Counting, simple addition/subtraction |
| Color Splash | Digital coloring, color recognition |
| Write with Me | Guided letter/number tracing |
| Story Time | Read-along picture books, listening comprehension |
| Rhyme Time | Nursery rhymes, phonemic awareness |
| My Body & Senses | Body parts, five senses, hygiene habits |
| Weather & Seasons | Cause-effect, dress-for-weather |
| Emotions Corner | Identify feelings via expressions |
| Community Helpers | Roles/occupations, mini role-play |
| Music & Rhythm | Tap-along beats, action songs |
| Opposites & Comparisons | Big/small, hot/cold, fast/slow |
| Shape Detective | Shape recognition & sorting |
| Puzzle Path | Jigsaw puzzles, adjustable difficulty |
| Math Magic | Animated math tricks, patterns, visual arithmetic |
| Memory Match | Flip-card matching |
| Odd One Out | Categorization |
| Sequence Builder | Logical ordering, early storytelling |

**Target content volume:** 5,000+ activities, achieved via a **procedural variation engine** per module (e.g., one counting-game engine generating thousands of object/count/layout permutations) rather than hand-authoring each instance — see Section 7 of the Backend/Data doc.

## 5. Eye Protection & Screen-Time System (Core Requirement)
- 30-minute daily default cap (parent-adjustable)
- 20-20-20 reminders embedded as in-story character prompts
- Warm/dim, blue-light-reduced color filter, always on by default
- 2-minute "eye stretch" mini-game/animation before resuming after a break
- No autoplay, no infinite scroll — every activity has a natural end
- Parent dashboard: usage time, modules used, weekly reports

## 6. Homeschool Printables
- Every activity has a matching printable PDF (tracing sheets, coloring pages, counting sheets, matching sheets)
- "Print This Week's Lessons" auto-generates a PDF pack from the child's actual in-app activity history
- Blank templates available for offline-only practice
- QR code on each sheet links back to the matching in-app lesson
- **Generated 100% locally on-device — no server round trip**

## 7. Cognitive/Logic Games
Shape Detective, Puzzle Path, Math Magic, Memory Match, Odd One Out, Sequence Builder — difficulty adapts via age tier + live performance (see Backend doc, Section 4).

## 8. Learning Methods to Implement
- Multi-sensory learning (sound + visual + touch simultaneously)
- Repetition with variation (same concept, different contexts)
- Reward-based mastery (badge unlocks after 3 correct demonstrations, not 1)
- Storytelling-based lesson wrappers (no bare flashcard drills)
- Real-world connection prompts ("find something red in your room")
- Peer/sibling mode (turn-based, no losing state)
- Parent-child co-play prompts
- Spaced repetition (struggled concepts resurface 1–2 days later)
- Errorless learning for youngest tier (gentle guidance instead of "wrong")
- Scaffolded difficulty within a single activity (easy → hard, same screen)
- Modeling before doing (app demonstrates once, then child tries)
- Chunking (break skills into micro-steps)
- Cross-modal reinforcement (concept reappears across modules)
- Choice-based engagement (child picks next activity from 2–3 options)
- Positive-only feedback loop (no fail states, only "try again")

## 9. Navigation & Accessibility
- Configurable per user/parent preference: icon-only, voice-guided, or combined icon + voice narration
- Large touch targets throughout, no reliance on reading text
- Full voice narration for every screen and instruction

## 10. Monetization & Access
- Free app, no ads, no in-app purchases directed at children
- No login required for core child-facing functionality
- Optional parent account for cloud backup/sync only (never required)

## 11. Platform & Technical Constraints
- **Offline-first**: all core modules, games, and printable generation must work with zero internet connection
- All assets (audio, animations, images) bundled at install — no post-install content downloads required for core functionality
- Local-only progress storage by default; optional cloud sync layer is additive, not load-bearing
- Optimize asset sizes (compressed audio/images) to manage install footprint given full offline bundling

## 12. Companion Documents
- `2_LittleLearn_UI_Structure.md` — full screen map, navigation flow, component breakdown
- `3_LittleLearn_Backend_Data_Structure.md` — local data schema, content structure, adaptive engine, sync design

Build the app to satisfy all sections above, using the UI and Backend/Data documents as the detailed technical specification for implementation.
