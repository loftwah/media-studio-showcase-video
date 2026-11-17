import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const source = "https://media.loftwah.com/p/EVaGOC_peleSRSHQ/media";
const destination = new URL("../public/low-tide.mp4", import.meta.url);
const expected = "8c5588b826c38dac4da32abb4a65a57ca0350259f03d2cce74b05bfd34859ce8";
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

let existing;
try {
  existing = await readFile(destination);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
if (existing) {
  if (sha256(existing) !== expected) {
    throw new Error("public/low-tide.mp4 differs from the reviewed source. Move it aside before retrying.");
  }
} else {
  const response = await fetch(source, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`Low Tide download returned HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (sha256(bytes) !== expected) throw new Error("Low Tide bytes differ from the reviewed source.");
  await writeFile(destination, bytes, { flag: "wx" });
}
