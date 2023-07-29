import styles from "./NavBar.module.css";

interface IProps {
  pages: IPage[];
  aboutPages: IPage[];
  activePage: IPage;
  setActivePage: React.Dispatch<React.SetStateAction<IPage>>;
}

export default function NavBar({
  pages,
  aboutPages,
  activePage,
  setActivePage,
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
              onClick={() => setActivePage(page)}
              className={page.id === activePage.id ? styles.active : ""}
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
              onClick={() => setActivePage(page)}
              className={page.id === activePage.id ? styles.active : ""}
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
