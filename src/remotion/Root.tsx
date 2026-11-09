import React from "react";
import { Composition } from "remotion";
import { NavshriFilm } from "./NavshriFilm";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="NavshriFilm"
      component={NavshriFilm}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
