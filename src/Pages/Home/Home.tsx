import styles from "./Home.module.css";

// Components
import NavBar from "./NavBar/NavBar";

export default function Home() {
  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.content}></div>
    </div>
  );
}
