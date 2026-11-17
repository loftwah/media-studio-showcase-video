import { readFileSync, writeFileSync } from "node:fs";

const source = readFileSync(new URL("../src/CreatorHub.tsx", import.meta.url), "utf8");
const beats = [...source.matchAll(/\{ duration: (\d+), title: "([^"]+)", detail: "([^"]+)"/g)];
if (beats.length !== 6) throw new Error("Expected six Creator Hub beats.");

let seconds = 0;
const transcript = beats.map(([, duration, title, detail]) => {
  const start = seconds;
  seconds += Number(duration);
  return `0:${String(start).padStart(2, "0")}  ${title}\n${detail}`;
});

writeFileSync(new URL("../out/creator-hub-film.txt", import.meta.url), [
  "Creator Hub — App Composer",
  "Silent film with on-screen text. Images are edited captures of the fictional reference build.",
  ...transcript,
  "Live profile: https://creator-hub.loftwah.com/",
  "Build and release record: https://composer.loftwah.com/creator-hub",
].join("\n\n") + "\n");
