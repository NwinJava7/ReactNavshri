import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene } from "./Scene";
import { LogoReveal } from "./LogoReveal";

export const NavshriFilm: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#102c1b" }}>
      <Sequence from={0} durationInFrames={120}>
        <Scene
          image="farm.jpg"
          title="Rooted in Nature"
          subtitle="Where every journey begins"
          duration={120}
        />
      </Sequence>
      <Sequence from={120} durationInFrames={120}>
        <Scene
          image="harvest.jpg"
          title="Carefully Harvested"
          subtitle="Nurtured with care"
          duration={120}
        />
      </Sequence>
      <Sequence from={240} durationInFrames={90}>
        <Scene
          image="products.jpg"
          title="Pure Farm Goodness"
          subtitle="Nature's goodness, thoughtfully brought to you"
          duration={90}
        />
      </Sequence>
      <Sequence from={330} durationInFrames={120}>
        <LogoReveal />
      </Sequence>
    </AbsoluteFill>
  );
};
