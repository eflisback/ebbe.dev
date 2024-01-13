import TextLink from "../../../Components/Text/TextLink/TextLink";
import styles from "./ProjectBox.module.css";

interface IProps {
  project: Project;
}

export default function ProjectBox({ project }: IProps) {
  return (
    <div className={styles.main}>
      <div className={styles.name}>{project.name}</div>
      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <div className={styles.tag} key={tag.name}>
            {tag.icon}
            <span>{tag.name}</span>
          </div>
        ))}
      </div>
      <span className={styles.description}>{project.description}</span>
      {project.links.length > 0 ? (
        <div className={styles.links}>
          {project.links.map((link) => (
            <div className={styles.link}>
              View the{" "}
              <TextLink
                displayText={link.type}
                link={link.link}
                targetBlank={true}
              />
              .
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
