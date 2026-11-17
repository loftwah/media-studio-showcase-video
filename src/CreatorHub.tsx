import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FontGate, display } from "./parts/fonts";
import { FPS, seconds } from "./config";

const ink = "#17181b";
const paper = "#faf6ed";
const orange = "#fc5b05";

export const creatorHubBeats = [
  { duration: 5, title: "A home for your work.", detail: "Mara Quinn’s ceramics and a place for visitors to leave a note.", image: "guestbook-opening.webp", focus: 45 },
  { duration: 6, title: "Start with what you need.", detail: "In App Composer, choose your apps and give your agent the build plan.", image: "init.webp", focus: 0 },
  { duration: 6, title: "Two independent apps.", detail: "Here / there receives postcards. Linkarooie curates what visitors see.", image: "guestbook-20261111.webp", focus: 0 },
  { duration: 5, title: "You decide what goes live.", detail: "This postcard from Jules appeared in the guestbook after approval.", image: "postcard.webp", focus: 0 },
  { duration: 6, title: "Give the work more room.", detail: "Mara featured two pieces of work on the same live profile. Jules’s postcard stayed published.", image: "profile-20261112.webp", focus: 19 },
  { duration: 4, title: "Open the Creator Hub build.", detail: "composer.loftwah.com/creator-hub" },
] as const;

export const creatorHubFrames = seconds(creatorHubBeats.reduce((total, beat) => total + beat.duration, 0));

function Beat({ beat }: { beat: (typeof creatorHubBeats)[number] }) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const motion = interpolate(frame, [0, beat.duration * FPS - 1], [1, 1.075], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  if (!("image" in beat)) {
    return (
      <AbsoluteFill style={{ background: orange, color: ink, alignItems: "flex-start", justifyContent: "center", padding: portrait ? 92 : 140 }}>
        <Img src={staticFile("img/composer-icon.svg")} style={{ width: 116, height: 116, marginBottom: 48 }} alt="" />
        <strong style={{ fontSize: portrait ? 52 : 54, marginBottom: 26 }}>App Composer</strong>
        <div style={{ fontSize: portrait ? 120 : 144, lineHeight: 0.98, fontWeight: 700, maxWidth: 1260, letterSpacing: "-0.035em" }}>{beat.title}</div>
        <div style={{ fontSize: portrait ? 46 : 54, marginTop: 52 }}>{beat.detail}</div>
      </AbsoluteFill>
    );
  }

  const isOpening = beat === creatorHubBeats[0];
  const showEarlierProfile = beat === creatorHubBeats[4] && frame < seconds(2);
  const image = showEarlierProfile ? "profile-20261111.webp" : beat.image;
  const showPostcard = beat.image === "postcard.webp";
  return (
    <AbsoluteFill style={{
      background: isOpening ? ink : paper,
      color: isOpening ? paper : ink,
      padding: portrait ? "150px 72px 240px" : "106px 94px",
      display: "grid",
      gridTemplateRows: portrait ? "minmax(0, 1fr) auto" : undefined,
      gridTemplateColumns: portrait ? "minmax(0, 1fr)" : "minmax(0, 1.55fr) minmax(0, 1fr)",
      alignItems: "center",
      gap: portrait ? 48 : 76,
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: portrait ? (showPostcard ? 820 : 950) : (showPostcard ? 680 : 780),
        overflow: "hidden",
        borderRadius: 16,
        border: isOpening ? "2px solid #5a5148" : "2px solid #c6bcb0",
        background: showPostcard ? "#f3ede1" : "#f5f5f5",
      }}>
        <Img
          src={staticFile(`creator-hub/${image}`)}
          alt=""
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: showPostcard ? "contain" : "cover",
            objectPosition: `${portrait && isOpening ? 78 : 50}% ${beat.focus}%`,
            transformOrigin: "50% 18%",
            scale: motion,
          }}
        />
      </div>
      <div style={{ borderTop: `4px solid ${orange}`, paddingTop: portrait ? 38 : 46 }}>
        {isOpening && <div style={{ fontSize: portrait ? 41 : 34, marginBottom: 22 }}>App Composer · Live reference build</div>}
        <div style={{ fontSize: portrait ? 102 : 98, lineHeight: 0.99, fontWeight: 700, letterSpacing: "-0.035em" }}>{beat.title}</div>
        <div style={{ marginTop: portrait ? 28 : 34, fontSize: portrait ? 55 : 44, lineHeight: 1.2 }}>{beat.detail}</div>
      </div>
    </AbsoluteFill>
  );
}

export function CreatorHub() {
  let from = 0;
  return (
    <FontGate>
      <AbsoluteFill style={{ fontFamily: `"${display}", sans-serif` }}>
        {creatorHubBeats.map((beat) => {
          const durationInFrames = seconds(beat.duration);
          const sequence = (
            <Sequence key={beat.title} name={beat.title} from={from} durationInFrames={durationInFrames}>
              <Beat beat={beat} />
            </Sequence>
          );
          from += durationInFrames;
          return sequence;
        })}
      </AbsoluteFill>
    </FontGate>
  );
}
