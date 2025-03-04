import { ReactElement } from "react";
import { Header } from "../header/Header";
import styles from "./Start.module.scss";
import { FaCode } from "react-icons/fa";
import { SiScala } from "react-icons/si";
import { ScaleFinderIcon } from "./icons/ScaleFinderIcon";
import { GeoGuessrCNNIcon } from "./icons/GeoGuessrCNNIcon";
import { SumobileIcon } from "./icons/SumobileIcon";

interface ProjectLink {
  icon: ReactElement;
  title: string;
  description: string;
  href: string;
}

const projectLinks: ProjectLink[] = [
  {
    icon: <ScaleFinderIcon />,
    title: "ScaleFinder.app",
    description: "A web tool used to determine musical scales, made using React and TypeScript.",
    href: "https://scalefinder.app/"
  },
  {
    icon: <SumobileIcon />,
    title: "Sumobile",
    description: "A local multiplayer game made using the open source game engine Godot and written in C#.",
    href: ""
  },
  {
    icon: <GeoGuessrCNNIcon />,
    title: "GeoGuessr CNN",
    description: "A convolutional neural network trained using TensorFlow to guess countries based on Google Street View footage.",
    href: "https://github.com/eflisback/geoguessrbot-v2/"
  },
  {
    icon: <SiScala color="#DE3423" />,
    title: "AoC 2024 Scala",
    description: "My attempt at solving the Advent of Code 2024 challanges using Scala.",
    href: "https://github.com/eflisback/advent-of-code-2024/",
  }
]

export const Start = () => {
  return (
    <div className={`${styles.overlay} ${styles.start}`}>
      <Header />
      <div className={styles.middleSection}>
        <div className={styles.title}>Projects</div>
        {projectLinks.map((link, index) => (
          <a key={index} className={styles.projectLink} href={link.href} target="_blank">
            <div className={styles.header}>
              {link.icon}
              <span>{link.title}</span>
            </div>
            <span>{link.description}</span>
          </a>
        ))}
      </div>
      <div className={styles.footer}>
        <FaCode />
        <span>
          This portfolio is open source, and its GitHub repository is available{" "}
          {/* TODO: Add actual GitHub repository link. */}
          <a href="">here</a>.
        </span>
      </div>
    </div>
  );
};
