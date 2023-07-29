import styles from "./Chats.module.css";

export default function Chats() {
  return (
    <div className={styles.back}>
      <div className={styles.title}>GPT Client</div>
      <div className={styles.subTitle}>Chat history</div>
    </div>
  );
}
