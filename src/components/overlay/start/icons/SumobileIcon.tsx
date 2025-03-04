import { FaSteam } from "react-icons/fa";

export const SumobileIcon = () => {
  return (
    <>
      <svg width="0" height="0">
        <linearGradient
          id="sumobile-gradient"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop stopColor="#1781b4" offset="0%" />
          <stop stopColor="#7635f0" offset="100%" />
        </linearGradient>
      </svg>

      <FaSteam
        style={{
          fill: "url(#sumobile-gradient)",
          stroke: "url(#sumobile-gradient",
        }}
      />
    </>
  );
};
