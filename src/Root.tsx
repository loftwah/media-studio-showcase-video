import { Composition } from "remotion";
import { FPS, VERTICAL, WIDE, seconds, showcaseBeats, teaserBeats, teaserRecutBeats } from "./config";
import { Showcase } from "./Showcase";
import { Teaser } from "./Teaser";
import { CreatorHub, creatorHubFrames } from "./CreatorHub";
import { TeaserRecut } from "./TeaserRecut";

const showcaseFrames = seconds(
  Object.values(showcaseBeats).reduce((total, value) => total + value, 0),
);
const teaserFrames = seconds(
  Object.values(teaserBeats).reduce((total, value) => total + value, 0),
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="CreatorHubFilm" component={CreatorHub} durationInFrames={creatorHubFrames} fps={FPS} {...WIDE} />
    <Composition id="CreatorHubPortrait" component={CreatorHub} durationInFrames={creatorHubFrames} fps={FPS} {...VERTICAL} />
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
    <Composition
      id="MediaStudioTeaserRecut"
      component={TeaserRecut}
      durationInFrames={seconds(teaserRecutBeats[teaserRecutBeats.length - 1].to)}
      fps={FPS}
      width={VERTICAL.width}
      height={VERTICAL.height}
    />
  </>
);
