import {
  RiCodeBoxLine,
  RiMiniProgramLine,
  RiReactjsLine,
} from "react-icons/ri";
import styles from "./Projects.module.css";

// Components
import ProjectBox from "./ProjectBox/ProjectBox";
import TextLink from "../../Components/Text/TextLink/TextLink";

export default function Projects() {
  const projects: Project[] = [
    {
      id: "birdview",
      name: "Bird View UF",
      description:
        "Me and two classmates in high school made this website for our company, Bird View, in which we operated out drone-business. The website is made in React and written in TypeScript.",
      imagePath: "/images/project-thumbnails/birdview.png",
      tags: [
        {
          icon: <RiMiniProgramLine />,
          name: "Front End",
        },
        {
          icon: <RiReactjsLine />,
          name: "React",
        },
        {
          icon: <RiCodeBoxLine />,
          name: "TypeScript",
        },
      ],
      repoLink: "https://birdview.se/",
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
            <ProjectBox key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
