import { Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "../config";
import { ChapterMark, EmberRoute, Headline, Note, Paper, Suite, monoFont } from "../parts/ui";

const shots = [
  "Water at dusk · Low Tide",
  "Lighthouse path · last light",
  "Desk light · the room falls away",
  "Paper workbench wakes",
  "One line across the frame",
  "The water returns · title",
];

/** Chapter 04: the real plan, six takes and the saved cut. */
export const MakeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Paper>
      <div style={{ position: "absolute", left: 96, top: 84, width: 700 }}>
        <ChapterMark index="04" label="Make" />
      </div>

      <div style={{ position: "absolute", left: 96, top: 152, width: 700 }}>
        <Headline size={60}>Six scenes from one song, each with a reference and a take.</Headline>
        <div style={{ marginTop: 22 }}>
          <Suite>
            Planning is free. Each take is a bounded paid request with a quote, a ledger entry and a
            saved result.
          </Suite>
        </div>
      </div>

      <div style={{ position: "absolute", left: 96, top: 500, width: 760 }}>
        <EmberRoute
          progress={interpolate(frame, [fps * 0.3, fps * 2.4], [0, 1], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}
          y={0}
          width={720}
        />
        {shots.map((shot, index) => {
          const start = fps * (0.5 + index * 0.28);
          const active = frame > start;
          return (
            <div
              key={shot}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginTop: index === 0 ? 26 : 12,
                opacity: active ? 1 : 0.18,
                translate: `${active ? 0 : -10}px 0px`,
              }}
            >
              <span style={{ fontFamily: monoFont, fontSize: 17, color: palette.ember, width: 26 }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: monoFont, fontSize: 20, color: active ? palette.ink : palette.muted, letterSpacing: "0.02em" }}>
                {shot}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: 900,
          top: 190,
          width: 924,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 80px -34px rgba(23,24,27,.55), 0 0 0 1px rgba(23,24,27,.16)",
          opacity: interpolate(frame, [0, fps * 0.5], [0, 1], { extrapolateRight: "clamp" }),
          translate: `0px ${interpolate(frame, [0, fps * 0.9], [30, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px`,
        }}
      >
        <img src={staticFile("img/storyboard.png")} alt="" style={{ width: "100%", display: "block" }} />
      </div>

      <div style={{ position: "absolute", left: 900, top: 470, width: 924, display: "flex", gap: 18 }}>
        {[
          ["33.0s", "saved cut"],
          ["6", "shots in order"],
          ["1", "mixed bed"],
        ].map(([value, label], index) => (
          <div
            key={label}
            style={{
              flex: 1,
              borderTop: `2px solid ${palette.ember}`,
              paddingTop: 14,
              opacity: interpolate(frame, [fps * (0.8 + index * 0.2), fps * (1.1 + index * 0.2)], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontFamily: monoFont, fontSize: 40, color: palette.ink, fontWeight: 700 }}>{value}</div>
            <div style={{ fontFamily: monoFont, fontSize: 16, letterSpacing: "0.12em", textTransform: "uppercase", color: palette.muted, marginTop: 6 }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", left: 900, top: 640, width: 924 }}>
        <Note>
          Render master or render the MP4 on this device. The earlier result stays with the storyboard.
        </Note>
      </div>

      <div style={{ position: "absolute", left: 96, top: 880, width: 760 }}>
        <div style={{ fontFamily: monoFont, fontSize: 17, letterSpacing: "0.12em", textTransform: "uppercase", color: palette.muted }}>
          The 33-second cut stays private in the studio. The gallery carries the published work.
        </div>
      </div>
    </Paper>
  );
};
