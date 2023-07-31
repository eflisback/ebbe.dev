import styles from "./NavBar.module.css";
import { BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

interface IProps {
  pages: IPage[];
  aboutPages: IPage[];
  activePageId: string;
}

export default function NavBar({ pages, aboutPages, activePageId }: IProps) {
  return (
    <div className={styles.main}>
      <section>
        <div className={styles.title}>ebbe.dev</div>
      </section>
      <section>
        <div className={styles.subHeader}>Pages</div>
        <div className={styles.links}>
          {pages.map((page) => (
            <Link
              key={page.id}
              type="button"
              to={"/" + page.id}
              className={page.id === activePageId ? styles.active : ""}
            >
              {page.displayText}
            </Link>
          ))}
        </div>
      </section>
      <section>
        <div className={styles.subHeader}>About me</div>
        <div className={styles.links}>
          {aboutPages.map((page) => (
            <Link
              key={page.id}
              type="button"
              to={"/" + page.id}
              className={page.id === activePageId ? styles.active : ""}
            >
              {page.displayText}
            </Link>
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
