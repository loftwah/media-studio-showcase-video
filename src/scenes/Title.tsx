import { Video } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "../config";
import { ChapterMark, EmberRoute, Headline, Note, Paper, Suite, UIPlate, bodyFont, monoFont } from "../parts/ui";

/**
 * Cold open. The first thing on screen is the studio that was actually built,
 * moving, under a paper title block.
 */
export const TitleScene: React.FC<{ seconds: number }> = ({ seconds }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [0, fps * 0.9], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const headlineLines = ["Build an", "owned", "Media Studio"];

  return (
    <AbsoluteFill style={{ background: palette.ink }}>
      <AbsoluteFill style={{ scale: interpolate(frame, [0, seconds * fps], [1.06, 1], { easing: Easing.linear }) }}>
        <Video
          src={staticFile("footage/studio.mp4")}
          trimBefore={Math.round(fps * 6.2)}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(12,12,14,.86) 0%, rgba(12,12,14,.66) 38%, rgba(12,12,14,.18) 70%, rgba(12,12,14,.42) 100%)" }} />

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 880,
          background: palette.paper,
          translate: `${interpolate(frame, [0, fps * 0.9], [-60, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px 0px`,
          clipPath: `inset(0 ${interpolate(frame, [0, fps * 0.9], [100, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}% 0 0)`,
        }}
      />

      <div style={{ position: "absolute", left: 96, top: 120, width: 700 }}>
        <ChapterMark index="00" label="App Composer × Media Studio" />
      </div>

      <div style={{ position: "absolute", left: 96, top: 236, width: 700 }}>
        {headlineLines.map((line, index) => (
          <div key={line} style={{ overflow: "hidden" }}>
            <Headline
              size={index === 2 ? 96 : 88}
              style={{
                translate: `0px ${interpolate(frame, [fps * (0.25 + index * 0.12), fps * (0.95 + index * 0.12)], [110, 0], {
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                })}px`,
                color: index === 2 ? palette.emberDeep : palette.ink,
              }}
            >
              {line}
            </Headline>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", left: 96, top: 604, width: 620, opacity: enter }}>
        <Suite>
          A working image, video and sound studio for your own Cloudflare account — specified by you,
          built and kept by your agent.
        </Suite>
      </div>

      <div style={{ position: "absolute", left: 96, top: 796, width: 700 }}>
        <EmberRoute progress={interpolate(frame, [fps * 0.6, fps * 1.9], [0, 1], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })} y={6} width={688} />
      </div>

      <div style={{ position: "absolute", left: 96, top: 840, width: 700, display: "flex", gap: 26, opacity: enter }}>
        <div style={{ fontFamily: monoFont, fontSize: 16, letterSpacing: "0.12em", textTransform: "uppercase", color: palette.muted }}>
          Your app
        </div>
        <div style={{ fontFamily: monoFont, fontSize: 16, letterSpacing: "0.12em", textTransform: "uppercase", color: palette.muted }}>
          Your data
        </div>
        <div style={{ fontFamily: monoFont, fontSize: 16, letterSpacing: "0.12em", textTransform: "uppercase", color: palette.muted }}>
          Real takes
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 96,
          bottom: 64,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: interpolate(frame, [fps * 1.2, fps * 2], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <img src={staticFile("img/composer-icon.svg")} alt="" style={{ width: 46, height: 46 }} />
        <span style={{ fontFamily: bodyFont, fontSize: 22, color: "rgba(250,249,247,.82)" }}>composer.loftwah.com</span>
      </div>
    </AbsoluteFill>
  );
};
