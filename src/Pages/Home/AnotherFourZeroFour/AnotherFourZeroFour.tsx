import TextLink from "../../../Components/Text/TextLink/TextLink";
import styles from "./AnotherFourZeroFour.module.css";

export default function AnotherFourZeroFour() {
  return (
    <div className={styles.main}>
      <span className={styles.title} style={{ color: "rgb(255, 80, 80)" }}>
        Sike! It's still 404. Page not found-ception.
      </span>
      <p>
        Okay, I'll stop messing with you now. Who knows, maybe you're my future
        employer or something. Anyway, here's{" "}
        <TextLink displayText="your escape" link="/" targetBlank={false} />.
      </p>
    </div>
  );
}
