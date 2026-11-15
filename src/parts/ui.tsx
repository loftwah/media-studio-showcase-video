import type { CSSProperties, ReactNode } from "react";
import { Video } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "../config";
import { display } from "./fonts";
export { display };

export const bodyFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
export const monoFont =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

/** The paper field every editorial beat sits on. */
export const Paper: React.FC<{ children?: ReactNode; tone?: "paper" | "warm" | "ink" }> = ({
  children,
  tone = "paper",
}) => {
  const background =
    tone === "ink" ? palette.ink : tone === "warm" ? palette.paperWarm : palette.paper;
  return (
    <AbsoluteFill style={{ background }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            tone === "ink"
              ? `repeating-linear-gradient(90deg, rgba(250,249,247,.035) 0 1px, transparent 1px 96px)`
              : `repeating-linear-gradient(90deg, rgba(23,24,27,.045) 0 1px, transparent 1px 96px)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/**
 * One ember route line that travels across the frame. It is the studio motif:
 * a single asset carried from brief, through the app, to an output.
 */
export const EmberRoute: React.FC<{
  progress: number;
  y: number;
  x?: number;
  width: number;
  thickness?: number;
  tone?: "ember" | "paper";
  node?: boolean;
}> = ({ progress, y, x = 0, width, thickness = 3, tone = "ember", node = true }) => {
  const colour = tone === "ember" ? palette.ember : "rgba(250,249,247,.6)";
  return (
    <>
      <div style={{ position: "absolute", left: x, top: y, width, height: thickness, background: "rgba(23,24,27,.10)" }} />
      <div style={{ position: "absolute", left: x, top: y, width: width * progress, height: thickness, background: colour }} />
      {node ? (
        <div
          style={{
            position: "absolute",
            left: x + width * progress - thickness * 2.5,
            top: y - thickness * 1.5,
            width: thickness * 4,
            height: thickness * 4,
            borderRadius: "50%",
            background: colour,
            boxShadow: `0 0 0 ${thickness}px rgba(252,91,5,.16)`,
          }}
        />
      ) : null}
    </>
  );
};

export const ChapterMark: React.FC<{
  index: string;
  label: string;
  tone?: "ink" | "paper";
  compact?: boolean;
}> = ({ index, label, tone = "ink", compact = false }) => {
  const colour = tone === "ink" ? palette.ink : palette.paper;
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: compact ? 14 : 22 }}>
      <span
        style={{
          fontFamily: display,
          fontWeight: 700,
          fontSize: compact ? 22 : 30,
          letterSpacing: "-0.02em",
          color: palette.ember,
        }}
      >
        {index}
      </span>
      <span
        style={{
          fontFamily: monoFont,
          fontSize: compact ? 15 : 20,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: colour,
          opacity: 0.72,
        }}
      >
        {label}
      </span>
      <span style={{ flex: 1, height: 1, background: colour, opacity: 0.22 }} />
    </div>
  );
};

/**
 * Lower-third captions. Solid ink band with ember marker: legible at phone size
 * and stable across every scene so the eye always knows where to read.
 */
export const CaptionBar: React.FC<{
  text: string;
  vertical?: boolean;
  opacity?: number;
}> = ({ text, vertical = false, opacity = 1 }) => {
  if (!text) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: vertical ? 56 : 96,
        right: vertical ? 56 : 96,
        bottom: vertical ? 140 : 56,
        background: palette.ink,
        borderLeft: `8px solid ${palette.ember}`,
        padding: vertical ? "26px 30px" : "22px 34px",
        opacity,
        boxShadow: "0 18px 40px rgba(23,24,27,.24)",
      }}
    >
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: vertical ? 40 : 32,
          lineHeight: 1.24,
          color: palette.paper,
          letterSpacing: "-0.01em",
        }}
      >
        {text}
      </span>
    </div>
  );
};

/** A dark product screenshot or clip placed as a physical plate on the paper. */
export const UIPlate: React.FC<{
  src: string;
  kind: "video" | "image";
  startFrom?: number;
  playbackRate?: number;
  style?: CSSProperties;
  label?: string;
  naturalWidth?: number;
  children?: ReactNode;
}> = ({ src, kind, startFrom = 0, playbackRate = 1, style, label, children }) => (
  <div
    style={{
      position: "absolute",
      borderRadius: 18,
      overflow: "hidden",
      background: "#0c0c0e",
      boxShadow: "0 40px 80px -30px rgba(23,24,27,.55), 0 0 0 1px rgba(23,24,27,.18)",
      ...style,
    }}
  >
    {kind === "video" ? (
      <VideoSurface
        src={src}
        startFrom={startFrom}
        playbackRate={playbackRate}
        label={label}
      />
    ) : (
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    )}
    {children}
  </div>
);

const VideoSurface: React.FC<{
  src: string;
  startFrom: number;
  playbackRate: number;
  label?: string;
}> = ({ src, startFrom, playbackRate, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = interpolate(frame, [0, fps * 20], [0, -1.6], {
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  return (
    <>
      <Video
        src={src}
        trimBefore={Math.max(0, startFrom)}
        playbackRate={playbackRate}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          scale: 1.02,
          translate: `0px ${drift}px`,
        }}
      />
      {label ? (
        <div
          style={{
            position: "absolute",
            left: 18,
            bottom: 16,
            fontFamily: monoFont,
            fontSize: 15,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(250,249,247,.72)",
            background: "rgba(12,12,14,.72)",
            padding: "6px 10px",
            borderRadius: 6,
          }}
        >
          {label}
        </div>
      ) : null}
    </>
  );
};

/** Small monospace annotation used to name what the viewer is looking at. */
export const Note: React.FC<{
  children: ReactNode;
  tone?: "ink" | "paper";
  style?: CSSProperties;
}> = ({ children, tone = "ink", style }) => (
  <div
    style={{
      fontFamily: monoFont,
      fontSize: 17,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: tone === "ink" ? palette.muted : "rgba(250,249,247,.66)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Headline: React.FC<{
  children: ReactNode;
  size: number;
  tone?: "ink" | "paper";
  weight?: 400 | 500 | 700;
  style?: CSSProperties;
}> = ({ children, size, tone = "ink", weight = 700, style }) => (
  <div
    style={{
      fontFamily: display,
      fontWeight: weight,
      fontSize: size,
      lineHeight: 1.02,
      letterSpacing: "-0.03em",
      color: tone === "ink" ? palette.ink : palette.paper,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Suite: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: bodyFont,
      fontSize: 28,
      lineHeight: 1.42,
      color: palette.muted,
      letterSpacing: "-0.005em",
    }}
  >
    {children}
  </div>
);
