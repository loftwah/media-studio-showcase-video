#!/usr/bin/env node
// Emits the published caption and transcript files from the same caption list
// the compositions render, so screen and sidecar text cannot drift apart.
import { writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { showcaseCaptions, teaserCaptions } = await import("../src/config.ts");

const stamp = (seconds, separator) => {
  const ms = Math.round(seconds * 1000);
  const h = String(Math.floor(ms / 3_600_000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3_600_000) / 60_000)).padStart(2, "0");
  const s = String(Math.floor((ms % 60_000) / 1000)).padStart(2, "0");
  const milli = String(ms % 1000).padStart(3, "0");
  return `${h}:${m}:${s}${separator}${milli}`;
};

const srt = (cues) =>
  cues
    .map(
      (cue, index) =>
        `${index + 1}\n${stamp(cue.from, ",")} --> ${stamp(cue.to, ",")}\n${cue.text}\n`,
    )
    .join("\n");

const vtt = (cues) =>
  `WEBVTT\n\n${cues
    .map((cue) => `${stamp(cue.from, ".")} --> ${stamp(cue.to, ".")}\n${cue.text}\n`)
    .join("\n")}`;

const transcript = (cues, title) =>
  `# ${title}\n\nGenerated from the burned-in caption track. Times are the on-screen cue windows.\n\n${cues
    .map((cue, index) => `${index + 1}. [${stamp(cue.from, ".")}] ${cue.text}`)
    .join("\n")}\n`;

const write = async (name, content) => {
  await writeFile(join(root, "out", "captions", name), content, "utf8");
  console.log("wrote", name);
};

await import("node:fs/promises").then(({ mkdir }) => mkdir(join(root, "out", "captions"), { recursive: true }));
await write("media-studio-showcase.srt", srt(showcaseCaptions));
await write("media-studio-showcase.vtt", vtt(showcaseCaptions));
await write("media-studio-showcase.txt", transcript(showcaseCaptions, "Build an owned Media Studio · 82s showcase"));
await write("media-studio-teaser.srt", srt(teaserCaptions));
await write("media-studio-teaser.vtt", vtt(teaserCaptions));
await write("media-studio-teaser.txt", transcript(teaserCaptions, "Build an owned Media Studio · 30s vertical teaser"));
