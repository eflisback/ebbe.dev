import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./LinkButton.module.css";

interface IProps {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
}

export default function LinkButton({ title, description, icon, link }: IProps) {
  return (
    <a href={link} className={styles.main} target="_blank">
      <div className={styles.header}>
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className={styles.content}>
        <span>{description}</span>
      </div>
      <div className={styles.footer}>
        <span>{link}</span>
        <span>
          <AiOutlineArrowRight />
        </span>
      </div>
    </a>
  );
}
