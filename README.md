# Media Studio showcase video

Editable Remotion sources for the App Composer public showcase
("Build an owned Media Studio") and its vertical teaser.

- `MediaStudioShowcase` — 1920 × 1080, 30 fps, 82.0 s
- `MediaStudioTeaser` — 1080 × 1920, 30 fps, 30.0 s

Both compositions edit from the live recordings in `public/footage/`, the saved
storyboard card in `public/img/storyboard.png`, and the typeset excerpts of the
real Init specification and handoff in `src/scenes/Init.tsx`.

## Run it

```bash
npm install
npm run dev            # Remotion Studio
npm run render:showcase
npm run render:teaser
node scripts/captions.mjs   # SRT / WebVTT / transcript from the same caption list
```

Renders land in `out/`. Pinned: Remotion 4.0.506 (`remotion`, `@remotion/cli`,
`@remotion/media`, `@remotion/fonts`, `@remotion/captions`,
`@remotion/transitions`), React 19.2.3.

## Structure

| Path | Role |
| --- | --- |
| `src/config.ts` | Beats, captions, palette |
| `src/scenes/` | Title, Get Ready, Init, Studio, Make, Publish |
| `src/Teaser.tsx` | Vertical edit of the same beats |
| `src/parts/ui.tsx` | Paper field, ember route motif, chapter marks, caption bar, UI plates |
| `public/footage/` | Live Composer and Studio recordings (1728 × 850) |
| `public/img/` | Storyboard card, published work page, Composer mark |
| `public/audio/bed-master.m4a` | Studio walkthrough bed, normalised to −16 LUFS |

## Provenance

The music bed is the audio of the studio's own published walkthrough film,
normalised to −16 LUFS. The After Hours song, its takes and its masters are not
used. Every demonstrated product action is a recording of the live surfaces made
on 15 November 2026; the specification and handoff panels are typeset from the
exact captured text and labelled as excerpts.

Space Grotesk is bundled from `@fontsource/space-grotesk` (OFL-1.1); the licence
sits beside the font files.
