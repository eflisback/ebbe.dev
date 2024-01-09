import styles from "./TextLink.module.css";

// Components
import { Link } from "react-router-dom";

interface IProps {
  displayText: string;
  link: string;
  targetBlank: boolean;
}

export default function TextLink({ displayText, link, targetBlank }: IProps) {
  return (
    <Link
      className={styles.textLink}
      to={link}
      target={targetBlank ? "_blank" : undefined}
    >
      {displayText}
    </Link>
  );
}
