import { MdPiano } from "react-icons/md";

export const ScaleFinderIcon = () => {
  return (
    <>
      <svg width="0" height="0">
        <linearGradient
          id="scale-finder-gradient"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop stopColor="#ff4141" offset="0%" />
          <stop stopColor="#1db954" offset="100%" />
        </linearGradient>
      </svg>

      <MdPiano
        style={{
          fill: "url(#scale-finder-gradient)",
          stroke: "url(#scale-finder-gradient",
        }}
      />
    </>
  );
};
