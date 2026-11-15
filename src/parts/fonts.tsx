import { useEffect, useState, type ReactNode } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

// Space Grotesk is the approved App Composer display face. Body copy uses the
// system sans so small UI text stays native to the platform, exactly as the
// live site does.
export const display = "Space Grotesk";

const faces = [
  { weight: 400, file: "space-grotesk-latin-400-normal.woff2" },
  { weight: 500, file: "space-grotesk-latin-500-normal.woff2" },
  { weight: 700, file: "space-grotesk-latin-700-normal.woff2" },
];

export const FontFaces: React.FC = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: faces
        .map(
          (face) => `@font-face{font-family:"${display}";font-style:normal;font-weight:${face.weight};font-display:block;src:url("${staticFile(`fonts/${face.file}`)}") format("woff2");}`,
        )
        .join("\n"),
    }}
  />
);

/**
 * Holds the frame until the display face is ready. A failed load still releases
 * the frame so a render never hangs on a font request.
 */
export const FontGate: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [handle] = useState(() => delayRender("Load Space Grotesk"));
  useEffect(() => {
    const run = async () => {
      try {
        await Promise.all([document.fonts.load(`700 96px "${display}"`), document.fonts.load(`400 24px "${display}"`)]);
        await document.fonts.ready;
      } finally {
        continueRender(handle);
      }
    };
    void run();
  }, [handle]);
  return (
    <>
      <FontFaces />
      {children}
    </>
  );
};
