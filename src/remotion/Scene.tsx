import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  Easing,
} from "remotion";

type SceneProps = {
  image: string;
  title: string;
  subtitle?: string;
  duration: number;
};

export const Scene: React.FC<SceneProps> = ({
  image,
  title,
  subtitle,
  duration,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });

  const opacity = interpolate(frame, [0, 15, duration - 15, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = interpolate(frame, [0, 25], [35, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill>
        <Img
          src={staticFile(image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${1.08 - progress * 0.08})`,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.72))",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 100px 150px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            transform: `translateY(${textY}px)`,
            fontFamily: "Georgia, serif",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: 76,
              lineHeight: 1.1,
              margin: 0,
              fontWeight: 700,
              textShadow: "0 3px 24px rgba(0,0,0,.35)",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                color: "#f4e6c3",
                fontSize: 30,
                marginTop: 22,
                letterSpacing: 2,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
