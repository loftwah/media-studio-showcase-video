import { Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "../config";
import { ChapterMark, Headline, Paper, Suite, UIPlate, bodyFont } from "../parts/ui";

const checklist = [
  ["Agent and tools", "Git, GitHub CLI, pnpm and the active coding agent"],
  ["GitHub workspace", "The repository, source and required access"],
  ["Cloudflare connection", "The account and deployment tools"],
];

/** Chapter 01: the real readiness page, recorded signed out of any build. */
export const ReadyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Paper>
      <div style={{ position: "absolute", left: 96, top: 84, width: 700 }}>
        <ChapterMark index="01" label="Prepare" />
      </div>

      <div style={{ position: "absolute", left: 96, top: 156, width: 660 }}>
        <Headline size={64}>
          Get Ready checks the machine and the account.
        </Headline>
        <div style={{ marginTop: 26 }}>
          <Suite>
            Nothing is deployed and no model is called. You get a report you can read, with the next
            action named.
          </Suite>
        </div>
      </div>

      <div style={{ position: "absolute", left: 96, top: 560, width: 640 }}>
        {checklist.map(([title, detail], index) => {
          const start = fps * (0.7 + index * 0.55);
          return (
            <div
              key={title}
              style={{
                borderTop: `1px solid rgba(23,24,27,.16)`,
                paddingTop: 16,
                paddingBottom: 16,
                display: "flex",
                gap: 18,
                opacity: interpolate(frame, [start, start + fps * 0.4], [0, 1], { extrapolateRight: "clamp" }),
                translate: `${interpolate(frame, [start, start + fps * 0.5], [-18, 0], {
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                })}px 0px`,
              }}
            >
              <span style={{ fontFamily: bodyFont, fontSize: 24, color: palette.ember, fontWeight: 600, width: 30 }}>
                {index + 1}
              </span>
              <span>
                <span style={{ display: "block", fontFamily: bodyFont, fontSize: 24, color: palette.ink, fontWeight: 600 }}>
                  {title}
                </span>
                <span style={{ display: "block", fontFamily: bodyFont, fontSize: 20, color: palette.muted, marginTop: 4 }}>
                  {detail}
                </span>
              </span>
            </div>
          );
        })}
      </div>

      <UIPlate
        src={staticFile("footage/ready.mp4")}
        kind="video"
        startFrom={Math.round(fps * 2.2)}
                style={{
          left: 800,
          top: 160,
          width: 1036,
          height: 510,
          translate: `${interpolate(frame, [0, fps * 0.8], [30, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px 0px`,
          opacity: interpolate(frame, [0, fps * 0.6], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />
    </Paper>
  );
};
