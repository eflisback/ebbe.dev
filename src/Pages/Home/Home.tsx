import styles from "./Home.module.css";

// Components
import FlowField from "./FlowField/FlowField";

export default function Home() {
  return (
    <div className={styles.body}>
      <FlowField />
    </div>
  );
}
