import styles from "./Welcome.module.css";
import { RiGitRepositoryLine } from "react-icons/ri";

// Components
import LinkButton from "../Home/LinkButton/LinkButton";

export default function Welcome() {
  return (
    <div className={styles.pageBody}>
      <div className={styles.main}>
        <span className={styles.title}>Welcome!</span>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
          quaerat voluptatibus enim impedit, beatae nihil hic dolorum soluta
          porro amet, sequi necessitatibus doloribus blanditiis itaque
          doloremque, in unde assumenda accusantium?
        </p>
        <div className={styles.linkButtonContainer}>
          <LinkButton
            title="Source repo"
            description="The code of this website is open source and can be found here."
            icon={<RiGitRepositoryLine />}
            link="https://www.youtube.com"
          />
        </div>
      </div>
    </div>
  );
}
