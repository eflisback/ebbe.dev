import {
  RiCodeBoxLine,
  RiMiniProgramLine,
  RiReactjsLine,
  RiServerLine,
} from "react-icons/ri";
import styles from "./Projects.module.css";

// Components
import ProjectBox from "./ProjectBox/ProjectBox";
import TextLink from "../../Components/Text/TextLink/TextLink";

export default function Projects() {
  const projects: Project[] = [
    {
      id: "peanut",
      name: "Sell Peanut Butter!",
      description:
        "This website was developed for a family member in-law who sells home-made peanut butter. Pages for making orders as well as adiminstrator pages that are password-restricted.",
      imagePath: "",
      tags: [
        {
          icon: <RiCodeBoxLine />,
          name: "Full Stack",
        },
        {
          icon: <RiReactjsLine />,
          name: "React",
        },
        {
          icon: <RiServerLine />,
          name: "NodeJS",
        },
        {
          icon: <RiMiniProgramLine />,
          name: "TypeScript",
        },
      ],
      repoLink: "",
    },
  ];

  return (
    <div className={styles.pageBody}>
      <div className={styles.main}>
        <span className={styles.title}>My projects</span>
        <p>
          A showcase of some of my hobby projects relating to software
          development, artificial intelligence and more computer-sciency stuff.
          If you're looking for information regarding past professional
          projects, instead take a look at the{" "}
          <TextLink
            displayText="Experience"
            link="/experience"
            targetBlank={false}
          />{" "}
          page.
        </p>
        <div className={styles.projectBoxContainer}>
          {projects.map((project) => (
            <ProjectBox project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
