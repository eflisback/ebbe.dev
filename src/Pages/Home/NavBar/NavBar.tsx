import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className={styles.main}>
      <span>ebbe.dev</span>
      <div className={styles.links}>
        <Link to="/gpt-client">Länk</Link>
        <Link to={"/"}>Testlänk</Link>
        <Link to={"/"}>Testlänk</Link>
        <Link to={"/"}>Testlänk</Link>
      </div>
    </div>
  );
}
