import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { teaserBeats, teaserCaptions, seconds, palette } from "./config";
import { FontGate } from "./parts/fonts";
import { CaptionBar, EmberRoute, Headline, Note, Paper, bodyFont, display, monoFont } from "./parts/ui";

const CaptionTrack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;
  const hit = teaserCaptions.find((c) => time >= c.from && time < c.to);
  if (!hit) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <CaptionBar text={hit.text} vertical opacity={1} />
    </AbsoluteFill>
  );
};

const TeaserTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: palette.paper }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1080, overflow: "hidden", background: "#0c0c0e" }}>
        <Video
          src={staticFile("footage/studio.mp4")}
          trimBefore={Math.round(fps * 6)}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover", scale: interpolate(frame, [0, fps * 4], [1.08, 1]) }}
        />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(12,12,14,.15) 0%, rgba(12,12,14,.82) 100%)" }} />
        <div style={{ position: "absolute", left: 56, bottom: 48, right: 56 }}>
          <Note tone="paper">App Composer × Media Studio</Note>
        </div>
      </div>
      <div style={{ position: "absolute", left: 56, top: 1128, width: 968 }}>
        <Headline size={92}>
          Build an owned
          <br />
          <span style={{ color: palette.emberDeep }}>Media Studio</span>
        </Headline>
        <div style={{ marginTop: 28, fontFamily: bodyFont, fontSize: 36, lineHeight: 1.36, color: palette.muted }}>
          Images, video and sound for your own Cloudflare account.
        </div>
        <div style={{ marginTop: 42 }}>
          <EmberRoute progress={interpolate(frame, [fps * 0.5, fps * 2], [0, 1], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })} y={4} width={948} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TeaserInit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Paper>
        <div style={{ position: "absolute", left: 56, top: 96, width: 968 }}>
          <Note>01 · Specify</Note>
          <div style={{ marginTop: 18 }} />
          <Headline size={64}>Init writes the spec.</Headline>
        </div>
        <div style={{ position: "absolute", left: 56, top: 320, width: 968, height: 760, borderRadius: 20, overflow: "hidden", background: "#0c0c0e", boxShadow: "0 30px 60px -30px rgba(23,24,27,.5)" }}>
          <Video
            src={staticFile("footage/init.mp4")}
            trimBefore={Math.round(fps * 5)}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "70% 40%", scale: 1.25 }}
          />
        </div>
        <div style={{ position: "absolute", left: 56, top: 1120, width: 968 }}>
          {["Portable JSON you can download", "Source commits pinned exactly", "No credentials in the spec"].map((line, index) => (
            <div key={line} style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 18, opacity: interpolate(frame, [fps * (0.4 + index * 0.25), fps * (0.7 + index * 0.25)], [0, 1], { extrapolateRight: "clamp" }) }}>
              <span style={{ width: 12, height: 12, background: palette.ember, borderRadius: 2 }} />
              <span style={{ fontFamily: bodyFont, fontSize: 32, color: palette.ink }}>{line}</span>
            </div>
          ))}
        </div>
      </Paper>
    </AbsoluteFill>
  );
};

const TeaserStudio: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Paper>
        <div style={{ position: "absolute", left: 56, top: 96, width: 968 }}>
          <Note>02 · Build</Note>
          <div style={{ marginTop: 18 }} />
          <Headline size={64}>Built on your account.</Headline>
        </div>
        <div style={{ position: "absolute", left: 56, top: 320, width: 968, height: 720, borderRadius: 20, overflow: "hidden", background: "#0c0c0e", boxShadow: "0 30px 60px -30px rgba(23,24,27,.5)" }}>
          <Video
            src={staticFile("footage/studio.mp4")}
            trimBefore={Math.round(fps * 2)}
            playbackRate={0.8}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" }}
          />
        </div>
        <div style={{ position: "absolute", left: 56, top: 1120, width: 968 }}>
          <div style={{ fontFamily: bodyFont, fontSize: 30, lineHeight: 1.4, color: palette.muted, marginBottom: 28, opacity: interpolate(frame, [fps * 0.6, fps * 1.2], [0, 1], { extrapolateRight: "clamp" }) }}>
            Your database. Your storage. Your release — with every take still in the library.
          </div>
        </div>
        <div style={{ position: "absolute", left: 56, top: 1300, width: 968, display: "flex", gap: 24 }}>
          {[["13", "assets"], ["6", "takes"], ["1", "cut"]].map(([v, l], i) => (
            <div key={l} style={{ flex: 1, borderTop: `3px solid ${palette.ember}`, paddingTop: 16, opacity: interpolate(frame, [fps * (0.3 + i * 0.2), fps * (0.6 + i * 0.2)], [0, 1], { extrapolateRight: "clamp" }) }}>
              <div style={{ fontFamily: monoFont, fontSize: 52, fontWeight: 700, color: palette.ink }}>{v}</div>
              <div style={{ fontFamily: monoFont, fontSize: 20, letterSpacing: "0.12em", textTransform: "uppercase", color: palette.muted }}>{l}</div>
            </div>
          ))}
        </div>
      </Paper>
    </AbsoluteFill>
  );
};

const TeaserMake: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Paper>
        <div style={{ position: "absolute", left: 56, top: 150, width: 968 }}>
          <Note>03 · Make</Note>
          <div style={{ marginTop: 18 }} />
          <Headline size={64}>Six scenes. One cut.</Headline>
        </div>
        <div style={{ position: "absolute", left: 56, top: 430, width: 968, borderRadius: 18, overflow: "hidden", boxShadow: "0 30px 60px -30px rgba(23,24,27,.4)", translate: `0px ${interpolate(frame, [0, fps], [24, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px` }}>
          <img src={staticFile("img/storyboard.png")} alt="" style={{ width: "100%", display: "block" }} />
        </div>
        <div style={{ position: "absolute", left: 56, top: 700, width: 968 }}>
          <div style={{ fontFamily: monoFont, fontSize: 44, fontWeight: 700, color: palette.ink }}>33.0 seconds · 6 shots · mixed bed</div>
        </div>
        <div style={{ position: "absolute", left: 56, top: 800, width: 968, display: "flex", flexWrap: "wrap", gap: 12 }}>
          {["Water at dusk", "Lighthouse path", "Desk light", "Paper workbench", "One line", "The water returns"].map((s, i) => (
            <div key={s} style={{ width: 476, fontFamily: monoFont, fontSize: 22, color: palette.muted, borderTop: `1px solid rgba(23,24,27,.16)`, paddingTop: 10, opacity: interpolate(frame, [fps * (0.3 + i * 0.12), fps * (0.6 + i * 0.12)], [0, 1], { extrapolateRight: "clamp" }) }}>
              {String(i + 1).padStart(2, "0")} · {s}
            </div>
          ))}
        </div>
      </Paper>
    </AbsoluteFill>
  );
};

const TeaserResult: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Paper>
        <div style={{ position: "absolute", left: 56, top: 120, width: 968 }}>
          <Note>04 · Publish</Note>
        </div>
        <div style={{ position: "absolute", left: 56, top: 200, width: 968, borderRadius: 18, overflow: "hidden", boxShadow: "0 30px 60px -30px rgba(23,24,27,.4)" }}>
          <img src={staticFile("img/work.png")} alt="" style={{ width: "100%", display: "block" }} />
        </div>
        <div style={{ position: "absolute", left: 56, top: 800, width: 968 }}>
          <Headline size={70}>Signed out. Credited. Reversible.</Headline>
        </div>
        <div style={{ position: "absolute", left: 56, top: 1120, width: 968, opacity: interpolate(frame, [fps * 1.2, fps * 2], [0, 1], { extrapolateRight: "clamp" }) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={staticFile("img/composer-icon.svg")} alt="" style={{ width: 56, height: 56 }} />
            <span style={{ fontFamily: monoFont, fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: palette.muted }}>App Composer</span>
          </div>
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 60, letterSpacing: "-0.03em", color: palette.ink, marginTop: 22 }}>
            Build yours.
          </div>
          <div style={{ fontFamily: bodyFont, fontSize: 34, color: palette.muted, marginTop: 12 }}>
            composer.loftwah.com/media-studio/tutorial
          </div>
        </div>
      </Paper>
    </AbsoluteFill>
  );
};

export const Teaser: React.FC = () => {
  const { fps } = useVideoConfig();
  let cursor = 0;
  const at = (value: number) => {
    const from = cursor;
    cursor += seconds(value);
    return from;
  };
  const titleFrom = at(teaserBeats.title);
  const initFrom = at(teaserBeats.init);
  const studioFrom = at(teaserBeats.studio);
  const makeFrom = at(teaserBeats.make);
  const resultFrom = at(teaserBeats.result);

  return (
    <FontGate>
    <AbsoluteFill style={{ background: palette.paper }}>
      <Sequence from={titleFrom} durationInFrames={seconds(teaserBeats.title)} name="Title">
        <TeaserTitle />
      </Sequence>
      <Sequence from={initFrom} durationInFrames={seconds(teaserBeats.init)} name="Spec">
        <TeaserInit />
      </Sequence>
      <Sequence from={studioFrom} durationInFrames={seconds(teaserBeats.studio)} name="Studio">
        <TeaserStudio />
      </Sequence>
      <Sequence from={makeFrom} durationInFrames={seconds(teaserBeats.make)} name="Cut">
        <TeaserMake />
      </Sequence>
      <Sequence from={resultFrom} durationInFrames={seconds(teaserBeats.result)} name="Result">
        <TeaserResult />
      </Sequence>
      <CaptionTrack />
      <Audio
        src={staticFile("audio/bed-master.m4a")}
        volume={(f) =>
          interpolate(f, [0, fps, cursor - fps * 1.8, cursor - fps * 0.3], [0, 0.95, 0.95, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
    </AbsoluteFill>
    </FontGate>
  );
};
