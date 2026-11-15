import { Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "../config";
import { ChapterMark, Headline, Note, Paper, bodyFont, display, monoFont } from "../parts/ui";

const principles = [
  ["Signed out", "The published page opens without the owner session."],
  ["Credited", "Artwork, model and source travel with the output."],
  ["Reversible", "Withdrawing the page stops new visits."],
];

/** Chapter 05: the public result, the return path and the end card. */
export const ResultScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const endCard = interpolate(frame / fps, [7.4, 8.4], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const firstHalf = 1 - endCard;

  return (
    <Paper>
      <div style={{ position: "absolute", left: 96, top: 84, width: 760, opacity: firstHalf }}>
        <ChapterMark index="05" label="Publish" />
      </div>

      <div style={{ position: "absolute", left: 96, top: 152, width: 660, opacity: firstHalf }}>
        <Headline size={60}>Publishing is a deliberate act.</Headline>
        <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 22 }}>
          {principles.map(([title, detail], index) => {
            const start = fps * (0.5 + index * 0.35);
            return (
              <div key={title} style={{ opacity: interpolate(frame, [start, start + fps * 0.45], [0, 1], { extrapolateRight: "clamp" }) }}>
                <div style={{ fontFamily: bodyFont, fontSize: 26, fontWeight: 600, color: palette.ink }}>{title}</div>
                <div style={{ fontFamily: bodyFont, fontSize: 21, color: palette.muted, marginTop: 4 }}>{detail}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 800,
          top: 150,
          width: 1024,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 80px -34px rgba(23,24,27,.5), 0 0 0 1px rgba(23,24,27,.14)",
          opacity: firstHalf,
          translate: `0px ${interpolate(frame, [0, fps * 0.9], [28, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px`,
        }}
      >
        <img src={staticFile("img/work.png")} alt="" style={{ width: "100%", display: "block" }} />
      </div>

      <div style={{ position: "absolute", left: 800, top: 690, width: 1024, opacity: firstHalf }}>
        <Note>media.loftwah.com · LoftwahFM · Low Tide in motion · published from Studio</Note>
      </div>

      {/* End card */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: palette.paper,
          opacity: endCard,
          clipPath: `inset(${interpolate(endCard, [0, 1], [12, 0])}% 0 0 0)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 96,
          opacity: endCard,
          translate: `0px ${interpolate(endCard, [0, 1], [40, 0])}px`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={staticFile("img/composer-icon.svg")} alt="" style={{ width: 64, height: 64 }} />
          <span style={{ fontFamily: monoFont, fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", color: palette.muted }}>
            App Composer
          </span>
        </div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 104, lineHeight: 1.02, letterSpacing: "-0.035em", color: palette.ink, marginTop: 30 }}>
          Build an owned
          <br />
          <span style={{ color: palette.emberDeep }}>Media Studio</span>
        </div>
        <div style={{ marginTop: 34, fontFamily: bodyFont, fontSize: 30, color: palette.muted }}>
          composer.loftwah.com/media-studio/tutorial
        </div>
        <div style={{ marginTop: 12, fontFamily: monoFont, fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase", color: palette.muted }}>
          Get Ready → Init → your agent → a studio you keep
        </div>
      </div>
    </Paper>
  );
};
