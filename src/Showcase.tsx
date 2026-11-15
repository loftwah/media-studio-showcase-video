import { Audio } from "@remotion/media";
import { Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Sequence, AbsoluteFill } from "remotion";
import { Caption, showcaseBeats, seconds } from "./config";
import { showcaseCaptions } from "./config";
import { FontGate } from "./parts/fonts";
import { CaptionBar } from "./parts/ui";
import { InitScene } from "./scenes/Init";
import { MakeScene } from "./scenes/Make";
import { ReadyScene } from "./scenes/Ready";
import { ResultScene } from "./scenes/Result";
import { StudioScene } from "./scenes/Studio";
import { TitleScene } from "./scenes/Title";

const captionsAt = (time: number): string => {
  const hit = showcaseCaptions.find((c) => time >= c.from && time < c.to);
  return hit ? hit.text : "";
};

const CaptionTrack: React.FC<{ captions: Caption[] }> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;
  const hit = captions.find((c) => time >= c.from && time < c.to);
  if (!hit) return null;
  const fade = Math.min(
    interpolate(time, [hit.from, hit.from + 0.25], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(time, [hit.to - 0.25, hit.to], [1, 0], { extrapolateRight: "clamp" }),
  );
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <CaptionBar text={hit.text} opacity={fade} />
    </AbsoluteFill>
  );
};

export const Showcase: React.FC = () => {
  const { fps } = useVideoConfig();
  let cursor = 0;
  const at = (secondsValue: number) => {
    const from = cursor;
    cursor += seconds(secondsValue);
    return from;
  };
  const titleFrom = at(showcaseBeats.title);
  const readyFrom = at(showcaseBeats.ready);
  const initFrom = at(showcaseBeats.init);
  const studioFrom = at(showcaseBeats.studio);
  const makeFrom = at(showcaseBeats.make);
  const resultFrom = at(showcaseBeats.result);

  return (
    <FontGate>
    <AbsoluteFill style={{ background: "#faf9f7" }}>
      <Sequence from={titleFrom} durationInFrames={seconds(showcaseBeats.title)} name="Title">
        <TitleScene seconds={showcaseBeats.title} />
      </Sequence>
      <Sequence from={readyFrom} durationInFrames={seconds(showcaseBeats.ready)} name="Get Ready">
        <ReadyScene />
      </Sequence>
      <Sequence from={initFrom} durationInFrames={seconds(showcaseBeats.init)} name="Init and handoff">
        <InitScene />
      </Sequence>
      <Sequence from={studioFrom} durationInFrames={seconds(showcaseBeats.studio)} name="Owned studio">
        <StudioScene />
      </Sequence>
      <Sequence from={makeFrom} durationInFrames={seconds(showcaseBeats.make)} name="Six scenes and takes">
        <MakeScene />
      </Sequence>
      <Sequence from={resultFrom} durationInFrames={seconds(showcaseBeats.result)} name="Publish and end card">
        <ResultScene />
      </Sequence>

      <CaptionTrack captions={showcaseCaptions} />
      <Audio
        src={staticFile("audio/bed-master.m4a")}
        volume={(f) =>
          interpolate(
            f,
            [0, fps * 1.2, cursor - fps * 2.6, cursor - fps * 0.4],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.linear },
          )
        }
      />
    </AbsoluteFill>
    </FontGate>
  );
};

export { captionsAt };
