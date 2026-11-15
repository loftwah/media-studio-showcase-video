import { Composition } from "remotion";
import { FPS, VERTICAL, WIDE, seconds, showcaseBeats, teaserBeats } from "./config";
import { Showcase } from "./Showcase";
import { Teaser } from "./Teaser";

const showcaseFrames = seconds(
  Object.values(showcaseBeats).reduce((total, value) => total + value, 0),
);
const teaserFrames = seconds(
  Object.values(teaserBeats).reduce((total, value) => total + value, 0),
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="MediaStudioShowcase"
      component={Showcase}
      durationInFrames={showcaseFrames}
      fps={FPS}
      width={WIDE.width}
      height={WIDE.height}
    />
    <Composition
      id="MediaStudioTeaser"
      component={Teaser}
      durationInFrames={teaserFrames}
      fps={FPS}
      width={VERTICAL.width}
      height={VERTICAL.height}
    />
  </>
);
