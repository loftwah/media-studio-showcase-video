import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { palette, seconds, teaserRecutBeats } from "./config";
import { FontGate } from "./parts/fonts";
import { bodyFont, display } from "./parts/ui";

type Beat = (typeof teaserRecutBeats)[number];

const shotStyle = {
  position: "absolute",
  left: 72,
  right: 124,
  overflow: "hidden",
  backgroundColor: palette.ink,
} as const;

const titleStyle = {
  margin: 0,
  fontFamily: display,
  fontSize: 110,
  fontWeight: 700,
  lineHeight: 0.97,
  letterSpacing: "-0.052em",
  textWrap: "balance",
} as const;

const detailStyle = {
  fontFamily: bodyFont,
  fontSize: 42,
  lineHeight: 1.2,
} as const;

const EditBeat: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const showResult = beat.kind === "result";
  const showEndCard = beat.kind === "end";
  const lightInk = showResult || showEndCard || beat.kind === "library";
  const background = lightInk ? palette.ink : palette.paperWarm;

  return (
    <AbsoluteFill style={{ backgroundColor: background, color: lightInk ? palette.paper : palette.ink }}>
      <div style={{ position: "absolute", top: 182, left: 72, right: 124 }}>
        <div style={{ display: "flex", gap: 22, alignItems: "center", marginBottom: 70, ...detailStyle, fontSize: 32 }}>
          <Img alt="" src={staticFile("img/composer-icon.svg")} style={{ width: 52, height: 52 }} />
          App Composer / Media Studio
        </div>
        <h1 style={{ ...titleStyle, color: showEndCard ? "#ff8246" : undefined }}>{beat.title}</h1>
      </div>
      {showResult && (
        <div style={{ ...shotStyle, top: 690, height: 505 }}>
          <Video src={staticFile("low-tide.mp4")} muted objectFit="contain" style={{ width: "100%", height: "100%" }} />
        </div>
      )}
      {beat.kind === "brief" && (
        <div style={{ ...shotStyle, top: 677, height: 600, borderRadius: 12 }}>
          <Video
            src={staticFile("footage/init.mp4")}
            trimBefore={seconds(7)}
            muted
            style={{ position: "absolute", width: 1901, height: 935, left: -192, top: -105 }}
          />
        </div>
      )}
      {beat.kind === "library" && (
        <div style={{ ...shotStyle, top: 666, height: 636, borderRadius: 12 }}>
          <Video
            src={staticFile("footage/studio.mp4")}
            trimBefore={seconds(2.7)}
            muted
            style={{ position: "absolute", width: 1814, height: 893, left: -436, top: -80 }}
          />
        </div>
      )}
      {beat.kind === "publish" && (
        <div style={{ ...shotStyle, top: 668, height: 627, borderRadius: 12 }}>
          <Img
            alt=""
            src={staticFile("img/work.png")}
            style={{
              position: "absolute",
              width: 1600,
              left: -354,
              top: -44,
              transformOrigin: "40% 30%",
              scale: interpolate(frame, [0, seconds(4)], [1, 1.04], {
                extrapolateRight: "clamp",
              }),
            }}
          />
        </div>
      )}
      <div style={{
        ...detailStyle,
        position: "absolute",
        top: showEndCard ? 800 : 1395,
        left: 72,
        right: 124,
        borderTop: `3px solid ${lightInk ? "#f3efe8" : "#17181b"}`,
        paddingTop: 30,
        overflowWrap: "anywhere",
      }}>
        {beat.detail}
      </div>
    </AbsoluteFill>
  );
};

export const TeaserRecut: React.FC = () => (
  <FontGate>
    {teaserRecutBeats.map((beat) => (
      <Sequence key={beat.kind} from={seconds(beat.from)} durationInFrames={seconds(beat.to - beat.from)} name={beat.kind}>
        <EditBeat beat={beat} />
      </Sequence>
    ))}
    <Audio src={staticFile("audio/bed-master.m4a")} volume={(frame) =>
      interpolate(frame, [0, seconds(1), seconds(28.2), seconds(29.7)], [0, 0.95, 0.95, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    } />
  </FontGate>
);
