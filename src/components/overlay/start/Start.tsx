import { Header } from "../header/Header";
import styles from "./Start.module.scss";
import { FaCode } from "react-icons/fa";

export const Start = () => {
  return (
    <div className={`${styles.overlay} ${styles.start}`}>
      <Header />
      <div className={styles.middleSection}>
        
      </div>
      <div className={styles.footer}>
        <FaCode />
        <span>
          This portfolio is open source, and its GitHub repository is available{" "}
          {/* TODO: Add actual GitHub repository link. */}
          <a href="">here</a>.
        </span>
      </div>
    </div>
  );
};
