import { useState } from "react";
import styles from "./Home.module.css";

// Components
import NavBar from "./NavBar/NavBar";
import Header from "./Header/Header";

// Pages
import Welcome from "../Welcome/Welcome";
import TestPage1 from "../TestPage1/TestPage1";

const pages: IPage[] = [
  {
    displayText: "Welcome",
    id: "welcome",
    component: <Welcome />,
  },
  {
    displayText: "Custom GPT Client",
    id: "gpt",
  },
  {
    displayText: "Test-page 1",
    id: "t1",
    component: <TestPage1 />,
  },
];

const aboutPages: IPage[] = [
  {
    displayText: "General",
    id: "general",
  },
  {
    displayText: "Projects",
    id: "projects",
  },
  {
    displayText: "Experience",
    id: "experience",
  },
  {
    displayText: "Contact",
    id: "contact",
  },
];

export default function Home() {
  const [activePage, setActivePage] = useState(pages[0]);

  return (
    <div className={styles.body}>
      <NavBar
        pages={pages}
        aboutPages={aboutPages}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className={styles.content}>
        <Header page={activePage} />
        {pages.map((page) => page.id === activePage.id && page.component)}
        {aboutPages.map((page) => page.id === activePage.id && page.component)}
      </div>
    </div>
  );
}
