import { ReactElement } from "react";
import { Header } from "../header/Header";
import styles from "./Start.module.scss";
import { FaCode } from "react-icons/fa";
import { SiScala } from "react-icons/si";
import { ScaleFinderIcon } from "./icons/ScaleFinderIcon";
import { GeoGuessrCNNIcon } from "./icons/GeoGuessrCNNIcon";
// import { SumobileIcon } from "./icons/SumobileIcon";

interface ProjectLink {
  icon: ReactElement;
  title: string;
  description: string;
  href: string;
}

const projectLinks: ProjectLink[] = [
  {
    icon: <ScaleFinderIcon />,
    title: "Scale Finder",
    description:
      "A web tool for identifying musical scales, built with React and TypeScript.",
    href: "https://scalefinder.app/",
  },
  // Coming soon...
  // {
  //   icon: <SumobileIcon />,
  //   title: "Sumobile",
  //   description:
  //     "A local multiplayer game developed using the open-source Godot game engine and written in C#.",
  //   href: "",
  // },
  {
    icon: <GeoGuessrCNNIcon />,
    title: "GeoGuessr CNN",
    description:
      "A convolutional neural network trained to predict countries based on Google Street View footage.",
    href: "https://github.com/eflisback/geoguessrbot-v2/",
  },
  {
    icon: <SiScala color="#DE3423" />,
    title: "AoC 2024 Scala",
    description:
      "My attempt at solving the Advent of Code 2024 challenges using Scala.",
    href: "https://github.com/eflisback/advent-of-code-2024/",
  },
];

export const Start = () => {
  return (
    <div className={`${styles.overlay} ${styles.start}`}>
      <Header />
      <div className={styles.middleSection}>
        <div className={styles.title}>Projects</div>
        <div className={styles.overflowContainer}>
        {projectLinks.map((link, index) => (
          <a
            key={index}
            className={styles.projectLink}
            href={link.href}
            target="_blank"
          >
            <div className={styles.header}>
              {link.icon}
              <span>{link.title}</span>
            </div>
            <span>{link.description}</span>
          </a>
        ))}
        </div>
      </div>
      <div className={styles.footer}>
        <FaCode />
        <span>
          This portfolio site is open source, and its GitHub repository is available{" "}
          {/* TODO: Add actual GitHub repository link. */}
          <a href="https://github.com/eflisback/ebbe.dev/" target="_blank">here</a>.
        </span>
      </div>
    </div>
  );
};
