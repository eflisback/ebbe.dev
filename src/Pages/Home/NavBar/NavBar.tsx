import styles from "./NavBar.module.css";
import { BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";

interface IProps {
  pages: IPage[];
  aboutPages: IPage[];
  activePageId: string;
  setActivePageId: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavBar({
  pages,
  aboutPages,
  activePageId,
  setActivePageId,
}: IProps) {
  return (
    <div className={styles.main}>
      <section>
        <div className={styles.title}>ebbe.dev</div>
      </section>
      <section>
        <div className={styles.subHeader}>Pages</div>
        <div className={styles.links}>
          {pages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => setActivePageId(page.id)}
              className={page.id === activePageId ? styles.active : ""}
            >
              {page.displayText}
            </button>
          ))}
        </div>
      </section>
      <section>
        <div className={styles.subHeader}>About me</div>
        <div className={styles.links}>
          {aboutPages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => setActivePageId(page.id)}
              className={page.id === activePageId ? styles.active : ""}
            >
              {page.displayText}
            </button>
          ))}
        </div>
      </section>
      <section>
        <div className={styles.subHeader}>Socials</div>
        <div className={styles.socials}>
          <a href="">
            <BsLinkedin />
          </a>
          <a href="">
            <BsGithub />
          </a>
          <a href="">
            <BsInstagram />
          </a>
        </div>
      </section>
    </div>
  );
}
