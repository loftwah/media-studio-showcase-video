export const FPS = 30;
export const WIDE = { width: 1920, height: 1080 } as const;
export const VERTICAL = { width: 1080, height: 1920 } as const;

export const palette = {
  paper: "#faf9f7",
  paperWarm: "#f3efe8",
  ink: "#17181b",
  inkSoft: "#2a2b2f",
  muted: "#6b6560",
  ember: "#fc5b05",
  emberDeep: "#c74400",
} as const;

/** Captions are authored once and rendered as burned-in lower thirds. */
export type Caption = { from: number; to: number; text: string };

export const showcaseCaptions: Caption[] = [
  { from: 1.0, to: 7.4, text: "App Composer starts with a sentence. Your agent builds an app you own." },
  { from: 8.6, to: 19.4, text: "Get Ready checks the machine and the account before anything is built." },
  { from: 20.6, to: 29.4, text: "Init turns the idea into a specification you can read, save and change." },
  { from: 30.0, to: 37.6, text: "The handoff is a real document your agent can follow." },
  { from: 38.6, to: 45.4, text: "The studio is built on your account, with its own database and storage." },
  { from: 45.4, to: 51.6, text: "Every still, clip and song is saved in the app you own." },
  { from: 52.6, to: 60.4, text: "Six scenes from one song, each with a reference and a take." },
  { from: 60.4, to: 67.6, text: "A 33-second cut, mixed and rendered, kept in the library." },
  { from: 68.6, to: 75.4, text: "Publishing is deliberate: signed out, credited, reversible." },
  { from: 75.6, to: 81.4, text: "Build your own media studio at composer.loftwah.com." },
];

export const teaserCaptions: Caption[] = [
  { from: 0.8, to: 3.8, text: "Build an owned Media Studio." },
  { from: 4.6, to: 10.6, text: "Describe it. Init writes the specification." },
  { from: 11.4, to: 17.4, text: "Your agent builds it on your Cloudflare account." },
  { from: 18.2, to: 23.4, text: "Six scenes, real takes, one saved cut." },
  { from: 24.2, to: 29.4, text: "composer.loftwah.com" },
];

/** Scene timings in seconds, shared by both edits. */
export const showcaseBeats = {
  title: 8,
  ready: 12,
  init: 18,
  studio: 14,
  make: 16,
  result: 14,
} as const;

export const teaserBeats = {
  title: 4,
  init: 7,
  studio: 7,
  make: 6,
  result: 6,
} as const;

export const seconds = (value: number) => Math.round(value * FPS);

export const teaserRecutBeats = [
  { kind: "result", from: 0, to: 5, title: "Your studio. Your work.", detail: "Low Tide · LoftwahFM" },
  { kind: "brief", from: 5, to: 12, title: "Start with one brief.", detail: "Set out what your studio should do in App Composer." },
  { kind: "library", from: 12, to: 19, title: "Keep every take.", detail: "Your media library runs on your Cloudflare account." },
  { kind: "publish", from: 19, to: 25, title: "Share the one you choose.", detail: "The published work has its own credited page." },
  { kind: "end", from: 25, to: 30, title: "Build your own Media Studio.", detail: "composer.loftwah.com/media-studio/tutorial" },
] as const;

export const teaserRecutCaptions: Caption[] = teaserRecutBeats.map(({ from, to, title, detail }) => ({
  from, to, text: `${title}\n${detail}`,
}));
