import styles from "./NavBar.module.css";

interface IPage {
  displayText: string;
  id: string;
}

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
        <span className={styles.title}>ebbe.dev</span>
      </section>
      <section>
        <div className={styles.subHeader}>Pages</div>
        <div className={styles.links}>
          {pages.map((page) => (
            <button
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
          <a href="">LI</a>
          <a href="">GH</a>
          <a href="">IG</a>
        </div>
      </section>
    </div>
  );
}
