import { Video } from "@remotion/media";
import { Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "../config";
import { ChapterMark, Headline, Paper, bodyFont, monoFont } from "../parts/ui";

const stats = [
  ["1", "Project", "LoftwahFM · Creative studies"],
  ["13", "Saved assets", "stills, clips and the source song"],
  ["6", "Generated takes", "six seconds each, one per scene"],
];

/** Chapter 03: the deployed studio and its own library, filmed in the app. */
export const StudioScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Paper>
      <div style={{ position: "absolute", left: 96, top: 84, width: 900 }}>
        <ChapterMark index="03" label="Build" />
      </div>

      <div style={{ position: "absolute", left: 96, top: 150, width: 1020 }}>
        <Headline size={58}>Your agent builds the studio on your account.</Headline>
      </div>


      <div
        style={{
          position: "absolute",
          left: 96,
          top: 262,
          width: 1728,
          height: 520,
          borderRadius: 20,
          overflow: "hidden",
          background: "#0c0c0e",
          boxShadow: "0 40px 90px -40px rgba(23,24,27,.6), 0 0 0 1px rgba(23,24,27,.16)",
          opacity: interpolate(frame, [0, fps * 0.6], [0, 1], { extrapolateRight: "clamp" }),
          translate: `0px ${interpolate(frame, [0, fps * 0.9], [26, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px`,
        }}
      >
        <Video
          src={staticFile("footage/studio.mp4")}
          trimBefore={Math.round(fps * 1.2)}
          playbackRate={0.85}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 24%", scale: 1.16 }}
        />
      </div>

      <div style={{ position: "absolute", left: 96, top: 812, display: "flex", gap: 64 }}>
        {stats.map(([value, label, detail], index) => {
          const start = fps * (0.8 + index * 0.25);
          return (
            <div key={label} style={{ width: 420, opacity: interpolate(frame, [start, start + fps * 0.5], [0, 1], { extrapolateRight: "clamp" }) }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontFamily: monoFont, fontSize: 34, color: palette.ember, fontWeight: 700 }}>{value}</span>
                <span style={{ fontFamily: bodyFont, fontSize: 24, color: palette.ink, fontWeight: 600 }}>{label}</span>
              </div>
              <div style={{ fontFamily: bodyFont, fontSize: 20, color: palette.muted, marginTop: 2 }}>{detail}</div>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

