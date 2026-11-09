import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const familyOpacity = interpolate(frame, [0, 18, 45, 70], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [40, 85], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [70, 95], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle, #315c38 0%, #102c1b 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill style={{ opacity: familyOpacity }}>
        <Img
          src={staticFile("family.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <AbsoluteFill
          style={{
            background: "linear-gradient(180deg, rgba(16,44,27,.15), rgba(16,44,27,.7))",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(120deg, transparent, rgba(255,255,255,.07), transparent)",
        }}
      />

      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
        }}
      >
        <Img
          src={staticFile("navshri-logo.png")}
          style={{
            width: 420,
            height: 180,
            objectFit: "contain",
          }}
        />
        <div
          style={{
            opacity: taglineOpacity,
            color: "#f4dfaa",
            fontSize: 38,
            fontFamily: "Georgia, serif",
            letterSpacing: 3,
            textAlign: "center",
          }}
        >
          From Farm to Family
        </div>
      </div>
    </AbsoluteFill>
  );
};
