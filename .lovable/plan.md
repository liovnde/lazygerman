# Satzwerk Redesign — Editorial Navy

Goal: make the app feel like a deliberately designed language tool (think a calm academic reader), not a generic shadcn starter. Locked taste:

- Palette: Navy Trust — `#0f1b3d` deep navy, `#1e3a5f` ink, `#3b6fa0` signal, `#e8edf3` paper
- Type: Space Grotesk (display/headings, tracked tight) + DM Sans (body/UI)
- Layout: proper Sidebar shell (shadcn `Sidebar` with collapsible icon mode)

## What changes

### 1. Design tokens (`src/styles.css`)
- Rewrite `:root` + `.dark` with the Navy Trust palette in oklch:
  - Light: paper `#e8edf3` background, navy `#0f1b3d` foreground, primary `#1e3a5f`, accent/signal `#3b6fa0`, primary-soft as a tinted paper.
  - Dark: deep navy `#0f1b3d` background, paper foreground, primary lifted to `#5a8cc0` for contrast.
- Add `--font-display: "Space Grotesk"` and `--font-sans: "DM Sans"` under `@theme`.
- Add a subtle paper texture via a `--shadow-card` token (soft, navy-tinted) and a 1px hairline border token.
- Set `--radius` to `0.5rem` (less "bubbly", more editorial).

### 2. Fonts (`src/routes/__root.tsx`)
- Add Google Fonts `<link rel="preconnect">` + stylesheet for Space Grotesk (500/600/700) and DM Sans (400/500).
- Apply `font-sans` (DM Sans) to body; headings use `font-display` (Space Grotesk) with tight tracking.

### 3. App shell — real sidebar
Replace the current `<header>` + inline left column with a shadcn `SidebarProvider` shell in `src/routes/__root.tsx`:

```text
┌─────────────────────────────────────────────┐
│ Sidebar (collapsible=icon)  │  Main area    │
│  • Brand mark               │  Topbar with  │
│  • Practice Mode group      │  SidebarTrig, │
│    - Translation            │  breadcrumb,  │
│    - Daily Conversation     │  theme toggle │
│    - Exam Prep              │               │
│  • CEFR Level group         │  <Outlet/>    │
│    A1 / A2 / B1 / B2 / C1   │  (PracticeApp│
│  • Footer: PayPal + © note  │   card)       │
└─────────────────────────────────────────────┘
```

- Sidebar uses `var(--sidebar-width)` per the Tailwind 4 fix.
- Mode + level selection moves OUT of `PracticeApp` body into the sidebar, controlled via a small context (`PracticeSettingsContext`) so `PracticeApp` reads `{ mode, level, setMode, setLevel }` from context.
- Topbar (sticky, hairline border) contains: `SidebarTrigger`, "Satzwerk / {mode} / {level}" crumb in Space Grotesk small-caps, theme toggle on the right.

### 4. Practice card redesign (`src/components/practice-app.tsx`)
- Remove the in-body Mode toggle and Level grid (now in sidebar).
- Single centered editorial column, max ~720px:
  - Tiny eyebrow label "Übersetzung · {topic.title} · {index+1}/{total}" in tracked uppercase Space Grotesk.
  - Prompt sentence in large Space Grotesk (text-3xl→4xl), generous leading, balanced.
  - EN/VI/ES language pills as a minimal underline tab strip, not a pill toggle.
  - Textarea: borderless top, single bottom hairline, no rounded bubble — feels like a notebook line.
  - Action row: primary "Show answer" (filled navy), ghost "Clear", text link "Next →".
  - Reveal panel: left navy accent bar (4px), no big tinted box; german in Space Grotesk medium, note in DM Sans italic muted, keywords as plain `· word · word` inline, not pill badges.
- Progress is a 2px hairline across the top of the card, navy fill.
- Replace the footer tip on right column with the same content rendered inside sidebar collapsed group.

### 5. Hydration fix (root cause of current runtime errors)
`useState(() => pickRandomTopic(...))` runs on the server with one random seed and again on the client with another → topic title mismatches and React throws hydration error #418.

Fix: initialize `topic` deterministically to the first topic of the set, then call `pickRandomTopic` inside a `useEffect` (client-only) on mount.

```ts
const [topic, setTopic] = useState<Topic>(() => modeSets["translation"]["A1"][0]);
useEffect(() => { setTopic(pickRandomTopic(modeSets[mode][level])); }, []);
```

### 6. Footer
Keep the PayPal / Germany good-luck message. Move it into the sidebar bottom slot when expanded, and a compact line under the practice card on mobile (where sidebar collapses to sheet).

## Files touched
- `src/styles.css` — palette + fonts + radius + shadow tokens
- `src/routes/__root.tsx` — Google Fonts links, SidebarProvider shell, topbar, footer relocation
- `src/components/app-sidebar.tsx` — NEW: brand, mode group, level group, footer
- `src/context/practice-settings.tsx` — NEW: tiny provider for mode/level/topic shared state
- `src/components/practice-app.tsx` — strip controls, redesign card, hydration fix
- (no data changes; sentences.ts untouched)

## Non-goals
- No new features, no backend, no new sentences, no translations changes.
- No Three.js / motion library additions; transitions stay CSS.

Approve and I'll build it.