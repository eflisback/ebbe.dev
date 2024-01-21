import TextLink from "../../../Components/Text/TextLink/TextLink";
import styles from "./FourZeroFour.module.css";

export default function FourZeroFour() {
  return (
    <div className={styles.main}>
      <span className={styles.title} style={{ color: "rgb(255, 80, 80)" }}>
        Page not found!
      </span>
      <p>
        I don't really know what you're doing here. Perhaps you've gotten lost.
        Here, click{" "}
        <TextLink displayText="this link " link="/lmao" targetBlank={false} />{" "}
        in order to escape.
      </p>
    </div>
  );
}
