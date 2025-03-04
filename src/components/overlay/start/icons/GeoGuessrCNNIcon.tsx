import { SiGoogleearth } from "react-icons/si";

export const GeoGuessrCNNIcon = () => {
  return (
    <>
      <svg width="0" height="0">
        <linearGradient
          id="geoguessr-cnn-gradient"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop stopColor="#07575B" offset="0%" />
          <stop stopColor="#0dd148" offset="100%" />
        </linearGradient>
      </svg>

      <SiGoogleearth
        style={{
          fill: "url(#geoguessr-cnn-gradient)",
          stroke: "url(#geoguessr-cnn-gradient",
        }}
      />
    </>
  );
};
