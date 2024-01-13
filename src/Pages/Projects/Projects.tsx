import {
  RiCodeBoxLine,
  RiMiniProgramLine,
  RiReactjsLine,
} from "react-icons/ri";
import { SiTensorflow, SiPython } from "react-icons/si";
import { SlGraph } from "react-icons/sl";
import styles from "./Projects.module.css";

// Components
import ProjectBox from "./ProjectBox/ProjectBox";
import TextLink from "../../Components/Text/TextLink/TextLink";

export default function Projects() {
  const projects: Project[] = [
    {
      id: "birdview",
      name: "Bird View youth-company website",
      description:
        "Me and two classmates in high school made this website for our company, Bird View, in which we operated out drone-business. The website is made in React and written in TypeScript. The entire project involved making a mail server, a back end server for the website, as well as a front end. However, I was for the most part only involved with the front end.",
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
      links: [
        {
          type: "live website",
          link: "https://birdview.se/",
        },
      ],
    },
    {
      id: "geoguessrai",
      name: "GeoGuessr AI",
      description:
        "Developed a convolutional neural network utilizing the TensorFlow Python library to build a GeoGuessr bot. Using more than 80,000 images acquired through the Google Maps Street View API, and by fine tuning the EfficientNetV2L base model, the model was effectively trained on my GPU, and achieved impressive results by achieving an accuracy rate exceeding 55%. Meaning that given a single street view image from a country included in the dataset, the model could identify the country over half the times. Sadly, the model I created now beats me at GeoGuessr.",
      tags: [
        {
          icon: <SiTensorflow />,
          name: "TensorFlow",
        },
        {
          icon: <SiPython />,
          name: "Python",
        },
        {
          icon: <SlGraph />,
          name: "Fine tuning",
        },
      ],
      links: [
        {
          type: "GitHub repository",
          link: "https://github.com/eflisback/geoguessrbot-v2",
        },
      ],
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
