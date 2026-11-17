import { readFileSync, writeFileSync } from "node:fs";

const beats = JSON.parse(readFileSync(new URL("../src/workshop-beats.json", import.meta.url), "utf8"));
let time = 0;
const transcript = beats.map(({ duration, title, detail }) => {
  const start = time;
  time += duration;
  return `0:${String(start).padStart(2, "0")}  ${title}\n${detail}`;
});

writeFileSync(new URL("../out/workshop-film.txt", import.meta.url), [
  "App Composer — Build it. Keep it running.",
  "On-screen text with instrumental music. Studio illustrations are cutaways. The profile, guestbook and saved changes come from a fictional live reference build.",
  ...transcript,
  "Music: Pixel Box Theory by LoftwahFM, from Cartridge Funk.",
  "Paperwork motion: https://media.loftwah.com/p/1qjHzSyIrIAQ4Zuk",
  "Paper workbench motion: https://media.loftwah.com/p/IZQJamDc5xiMsLG7",
].join("\n\n") + "\n");
