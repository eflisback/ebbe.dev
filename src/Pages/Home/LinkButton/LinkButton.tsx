import styles from "./LinkButton.module.css";

interface IProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export default function LinkButton({ title, description, icon, link }: IProps) {
  return (
    <a href={link} className={styles.main}>
      <div className={styles.header}>{title}</div>
      <div className={styles.content}>{description}</div>
    </a>
  );
}
