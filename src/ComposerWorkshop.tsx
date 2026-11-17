import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, CanvasImage, Easing, Interactive, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FontGate, display } from "./parts/fonts";
import { seconds } from "./config";
import beats from "./workshop-beats.json";

const black = "#0c0b0a";
const paper = "#fbf3e5";
const orange = "#ff771e";
const asset = (file: string) => staticFile(`workshop/${file}`);
const hub = (file: string) => staticFile(`creator-hub/${file}`);
const clamped = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type Beat = (typeof beats)[number];
export const workshopFrames = seconds(beats.reduce((total, beat) => total + beat.duration, 0));

function useShot() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  return { frame, fps, portrait: height > width };
}

function Headline({ children, size, color = paper }: { children: string; size: number; color?: string }) {
  const { frame } = useShot();
  return (
    <Interactive.Div name="Shot headline" style={{
      color, fontSize: size, lineHeight: 0.99, fontWeight: 700, letterSpacing: "-0.041em",
      translate: interpolate(frame, [0, 12], ["0px 25px", "0px 0px"], { ...clamped, easing: Easing.out(Easing.cubic) }),
      opacity: interpolate(frame, [0, 9], [0.5, 1], clamped),
    }}>{children}</Interactive.Div>
  );
}

function Mark() {
  return (
    <div style={{ display: "flex", gap: 22, alignItems: "center", fontSize: 46, fontWeight: 700 }}>
      <CanvasImage src={staticFile("img/composer-icon.svg")} style={{ width: 68, height: 68 }} />
      <span>App Composer</span>
    </div>
  );
}

function Opening() {
  const { frame, portrait } = useShot();
  return (
    <AbsoluteFill style={{ color: paper }}>
      <CanvasImage src={asset(portrait ? "machine-detail.jpg" : "build-it.jpg")} style={{
        position: "absolute", width: "100%", height: portrait ? "58%" : "100%", bottom: 0,
        objectFit: portrait ? "cover" : "contain", objectPosition: "56% 62%",
      }} />
      <div style={{ position: "absolute", top: portrait ? "41.8%" : "95.5%", width: "100%", height: 4, overflow: "hidden" }}>
        <div style={{
          background: orange, width: interpolate(frame, [4, 69], ["0%", "100%"], { ...clamped, easing: Easing.inOut(Easing.cubic) }),
          height: "100%", boxShadow: "0 0 24px #ff771e",
        }} />
      </div>
      {portrait && <div style={{ position: "absolute", left: 76, top: 155, right: 68 }}>
        <Mark />
        <div style={{ marginTop: 42, fontSize: 118, fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.04em" }}>
          Build it.<br />Keep it running.
        </div>
      </div>}
    </AbsoluteFill>
  );
}

function Studio() {
  const { frame, portrait } = useShot();
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={seconds(2.1)} name="Media Studio · Paperwork in motion">
        <Video src={asset("paperwork.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: portrait ? "50% 50%" : "50% 58%" }} />
      </Sequence>
      <Sequence from={seconds(2.1)} durationInFrames={seconds(1.9)} name="Media Studio · Paper workbench in motion">
        <Video src={asset("paper-workbench.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% 50%" }} />
      </Sequence>
      <AbsoluteFill style={{ background: "linear-gradient(0deg, #0c0907 0%, #0c0907d9 17%, transparent 56%)" }} />
      <div style={{ position: "absolute", left: portrait ? 76 : 116, right: 76, bottom: portrait ? 285 : 106 }}>
        <Headline size={portrait ? 103 : 114}>Give the idea a shape.</Headline>
        <div style={{ marginTop: 19, fontSize: portrait ? 37 : 35, color: "#f8bc8c" }}>Motion studies made in Media Studio</div>
      </div>
      <div style={{ position: "absolute", top: portrait ? 144 : 84, left: portrait ? 76 : 116, fontSize: 34, fontWeight: 700, padding: "14px 22px", color: paper, background: black }}>
        {frame < seconds(2.1) ? "Paperwork" : "Paper workbench"}
      </div>
    </AbsoluteFill>
  );
}

function Brief() {
  const { frame, fps, portrait } = useShot();
  const enter = spring({ frame: frame - 8, fps, config: { damping: 24, stiffness: 112 } });
  return (
    <AbsoluteFill style={{ background: paper, color: black, padding: portrait ? "145px 76px 235px" : "100px 116px", display: "grid", gridTemplateColumns: portrait ? "1fr" : "1.02fr 1fr", gridTemplateRows: portrait ? "auto 1fr" : "1fr", alignItems: "center", gap: portrait ? 58 : 100 }}>
      <div>
        <Headline color={black} size={portrait ? 102 : 124}>Brief to build plan.</Headline>
        <div style={{ fontSize: portrait ? 48 : 47, marginTop: 30, maxWidth: 780, lineHeight: 1.14 }}>“A ceramics profile and a guestbook I can moderate.”</div>
      </div>
      <div style={{
        width: "100%", height: portrait ? 910 : 805, overflow: "hidden", position: "relative",
        borderRadius: 16, background: "#201e1c", boxShadow: "0 30px 60px #512a1c38",
        translate: interpolate(enter, [0, 1], ["0px 85px", "0px 0px"]),
        clipPath: `inset(0 0 ${interpolate(enter, [0, 1], [42, 0])}% 0 round 16px)`,
      }}>
        <CanvasImage src={hub("init.webp")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 0%" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: black, color: paper, fontSize: 42, padding: "24px 35px" }}>App Composer · Init preview</div>
      </div>
    </AbsoluteFill>
  );
}

function AppStrip({ name, caption, image, from }: { name: string; caption: string; image: string; from: number }) {
  const { frame, fps, portrait } = useShot();
  const insert = spring({ frame: frame - from, fps, config: { damping: 26, stiffness: 122 } });
  return (
    <div style={{
      width: "100%", display: "grid", gridTemplateColumns: portrait ? "0.9fr 1fr" : "1fr",
      gridTemplateRows: portrait ? "1fr" : "1fr auto", minHeight: 0,
      height: portrait ? 298 : 546, overflow: "hidden", background: "#24201d", border: "2px solid #68472f",
      translate: interpolate(insert, [0, 1], [portrait ? "0px 90px" : "85px 0px", "0px 0px"]), opacity: insert,
    }}>
      <CanvasImage src={hub(image)} style={{ width: "100%", height: "100%", minHeight: 0, objectFit: "cover", objectPosition: "50% 0%" }} />
      <div style={{ padding: portrait ? "27px 30px" : "23px 32px", alignSelf: "center", color: paper }}>
        <div style={{ fontSize: portrait ? 49 : 51, fontWeight: 700 }}>{name}</div>
        <div style={{ fontSize: portrait ? 35 : 33, marginTop: 8, color: "#ead5c1" }}>{caption}</div>
      </div>
    </div>
  );
}

function Join() {
  const { frame, portrait } = useShot();
  return (
    <AbsoluteFill style={{ color: paper, padding: portrait ? "160px 76px 240px" : "102px 116px" }}>
      <Headline size={portrait ? 105 : 122}>Two apps. One project.</Headline>
      <div style={{ position: "relative", marginTop: portrait ? 125 : 78, display: "grid", gridTemplateColumns: portrait ? "1fr" : "1fr 1fr", gap: portrait ? 118 : 104 }}>
        <div style={{ position: "absolute", inset: portrait ? "0 auto 0 28%" : "45% 0 auto", width: portrait ? 7 : "100%", height: portrait ? "100%" : 7, background: "#62391d" }}>
          <div style={{
            background: orange, boxShadow: "0 0 31px #ff771e",
            width: portrait ? 7 : interpolate(frame, [14, 41], ["0%", "100%"], clamped),
            height: portrait ? interpolate(frame, [14, 41], ["0%", "100%"], clamped) : 7,
          }} />
        </div>
        <AppStrip from={3} name="Here / there" caption="Receives and holds postcards." image="postcard.webp" />
        <AppStrip from={22} name="Linkarooie" caption="Shows Mara’s work." image="profile-20261112.webp" />
      </div>
      <div style={{ marginTop: portrait ? 65 : 45, fontSize: portrait ? 43 : 41, color: "#ead5c1" }}>Each keeps its own source, data and release.</div>
    </AbsoluteFill>
  );
}

function Live() {
  const { portrait } = useShot();
  return (
    <AbsoluteFill style={{ background: "#17120f", color: paper, padding: portrait ? "148px 76px 215px" : "82px 116px" }}>
      <Headline size={portrait ? 98 : 108}>Open the live build.</Headline>
      <div style={{ position: "relative", marginTop: 41, width: "100%", height: portrait ? 1060 : 682, overflow: "hidden", background: paper }}>
        <Sequence durationInFrames={seconds(5.7)} name="Production recording · Profile to approved postcards">
          <Video src={asset("live-creator-hub.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: portrait ? "10% 20%" : "50% 15%" }} />
        </Sequence>
        <Sequence from={seconds(5.7)} name="Published postcard · Jules">
          <CanvasImage src={hub("postcard.webp")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </Sequence>
      </div>
      <div style={{ fontSize: portrait ? 41 : 34, marginTop: 25, color: "#f3baa0" }}>Creator Hub · Live reference build</div>
    </AbsoluteFill>
  );
}

function Return() {
  const { frame, portrait } = useShot();
  const reveal = interpolate(frame, [32, 59], [0, 100], { ...clamped, easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ background: paper, color: black, padding: portrait ? "155px 76px 218px" : "112px 116px", display: "grid", gridTemplateColumns: portrait ? "1fr" : "0.72fr 1fr", gridTemplateRows: portrait ? "auto 1fr" : "1fr", alignItems: "center", gap: 59 }}>
      <div>
        <Headline size={portrait ? 102 : 107} color={black}>Return to the same app.</Headline>
        <div style={{ marginTop: 27, fontSize: portrait ? 48 : 45, lineHeight: 1.13 }}>Two new featured links. Jules’s postcard stays.</div>
      </div>
      <div style={{ position: "relative", height: portrait ? 900 : 780, overflow: "hidden", background: "#f5f6f8", border: "2px solid #c6bcac" }}>
        <CanvasImage src={hub("profile-20261111.webp")} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", objectPosition: "0% 22%" }} />
        <CanvasImage src={hub("profile-20261112.webp")} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", objectPosition: "0% 17%", clipPath: `inset(0 ${100 - reveal}% 0 0)` }} />
        <div style={{ position: "absolute", left: `${reveal}%`, top: 0, bottom: 0, width: frame >= 32 && frame <= 59 ? 6 : 0, background: orange }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, color: paper, fontSize: 42, background: black, padding: "23px 32px" }}>{reveal >= 53 ? "After · Featured picks" : "Before · All links"}</div>
      </div>
    </AbsoluteFill>
  );
}

function Close() {
  const { portrait } = useShot();
  return (
    <AbsoluteFill style={{ color: paper }}>
      <CanvasImage src={asset("machine-detail.jpg")} style={{ position: "absolute", right: 0, bottom: 0, height: "100%", width: portrait ? "100%" : "61%", objectFit: "cover", opacity: 0.61 }} />
      <AbsoluteFill style={{ background: portrait ? "linear-gradient(0deg,#080705 10%,transparent 100%)" : "linear-gradient(90deg,#080705 25%,#08070577 67%,transparent)" }} />
      <div style={{ position: "absolute", left: portrait ? 76 : 116, right: 74, bottom: portrait ? 470 : 195 }}>
        <Mark />
        <div style={{ marginTop: 44, maxWidth: 1090 }}><Headline size={portrait ? 120 : 142}>See the Creator Hub build.</Headline></div>
        <div style={{ marginTop: 33, fontSize: portrait ? 46 : 58, color: orange, fontWeight: 700 }}>composer.loftwah.com/creator-hub</div>
      </div>
    </AbsoluteFill>
  );
}

const scenes: Record<string, () => React.JSX.Element> = { open: Opening, studio: Studio, brief: Brief, join: Join, live: Live, return: Return, close: Close };

export function ComposerWorkshop() {
  let from = 0;
  return (
    <FontGate>
      <AbsoluteFill style={{ background: black, fontFamily: `"${display}", sans-serif` }}>
        <Audio src={asset("pixel-box-theory.m4a")} />
        {beats.map((beat: Beat) => {
          const Scene = scenes[beat.id];
          const durationInFrames = seconds(beat.duration);
          const layer = <Sequence key={beat.id} name={beat.title} from={from} durationInFrames={durationInFrames}><Scene /></Sequence>;
          from += durationInFrames;
          return layer;
        })}
      </AbsoluteFill>
    </FontGate>
  );
}
