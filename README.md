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

## Vertical recut

`MediaStudioTeaserRecut` is the editable 30-second alternate cut for
[Studio #222](https://github.com/loftwah/composer-media-studio/issues/222).
The original compositions can still be rendered with their existing commands.

```bash
npm ci
npm run render:teaser-recut
node scripts/captions.mjs
```

The pre-render step downloads the already public [Low Tide motion
study](https://media.loftwah.com/p/EVaGOC_peleSRSHQ) and checks its SHA-256 before
using it. Run `node scripts/prepare-teaser-recut.mjs` before opening this
composition in Remotion Studio. The film pairs five seconds of the study's
picture with the existing walkthrough bed, then shows focused crops of the
original Init and Studio recordings and the published work page. The source
clip's own audio is muted. Shot boundaries and visible text are in
`teaserRecutBeats` in `src/config.ts`, which also drives the caption and transcript
exports. Frames start at 0, 150, 360, 570 and 750 at 30 fps.

For a playback review, compare against the
[published 30-second teaser](https://composer.loftwah.com/media-studio/watch/media-studio-teaser.mp4).
Inspect the first frame, the frames on either side of each cut and the last
frame at 390 px wide. Play the complete edit muted and sound-on. Keep the
approved original and the new render under different filenames. For this cut,
the team used the installed Remotion markup and rendering skills, the
[Take One launch-film guidance](https://github.com/talsiach/take-one/blob/43fd27b8878241deb50a5884a154b173272b858f/references/launch-film.md)
for shot selection, and the local `probe.py` / `look.py` tools from
[ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill/tree/f1c97cbffeac71b8fdfca2f790ceb00db3bcce65)
for the export review. Human listening and publication approval are tracked
in Studio #222.
