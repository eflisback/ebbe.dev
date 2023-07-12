import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.main}>
      <span className={styles.title}>Custom GPT client</span>
    </div>
  );
}
