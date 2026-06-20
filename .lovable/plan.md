## Goal
When the user clicks **Next** or **New topic**, animate the prompt sentence with a "scramble" effect (characters cycling through random glyphs) before settling on the new sentence.

## Approach

1. **New hook** `src/hooks/use-scramble-text.ts`
   - Signature: `useScrambleText(target: string, opts?: { duration?: number; speed?: number; chars?: string }): string`
   - On every change of `target`, runs a short animation (~500–700ms) that:
     - Reveals final characters left-to-right progressively.
     - Renders not-yet-revealed positions as random glyphs from a charset (letters + German `äöüß` + a few symbols).
     - Uses `requestAnimationFrame` with a tick interval (~30ms) so it feels like a terminal scramble.
     - Preserves whitespace and punctuation (skips scrambling them) for readability.
   - Cleans up on unmount / when `target` changes mid-animation.
   - Respects `prefers-reduced-motion`: returns `target` immediately.

2. **Wire into `src/components/practice-app.tsx`**
   - Replace `{display}` inside the `<h1>` with `useScrambleText(display)`.
   - Also scramble the German reveal (`{current.german}`) so revealing the answer feels consistent — only when `revealed` flips true.
   - No state/logic changes: the hook reacts to `display` changing, which already happens on Next / New topic / language tab switch.

3. **Trigger source**
   - The hook runs whenever its input string changes. Since `Next` increments `index` (changing `current` → `display`) and `New topic` swaps `topic`, both flows animate automatically. Switching EN/VI/ES tabs will also scramble, which feels intentional.

## Technical notes
- Pure CSS won't work for per-character random glyph cycling; a JS RAF loop is the simplest robust path.
- No new dependencies (avoid `use-scramble` npm pkg to keep bundle lean).
- Tailwind: add `font-variant-numeric: tabular-nums` style to the `<h1>` so width doesn't jitter while scrambling.

## Files
- **New**: `src/hooks/use-scramble-text.ts`
- **Edit**: `src/components/practice-app.tsx` (use hook for prompt + reveal)
