import { useState } from "react";
import styles from "./Home.module.css";

// Components
import NavBar from "./NavBar/NavBar";

interface IPage {
  displayText: string;
  id: string;
  component?: JSX.Element;
}

const pages: IPage[] = [
  {
    displayText: "Welcome",
    id: "welcome",
  },
  {
    displayText: "Custom GPT Client",
    id: "gpt",
  },
  {
    displayText: "Test-page 1",
    id: "t1",
  },
  {
    displayText: "Test-page 2",
    id: "t2",
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
  const [activePageId, setActivePageId] = useState(pages[0].id);

  return (
    <div className={styles.body}>
      <NavBar
        pages={pages}
        aboutPages={aboutPages}
        activePageId={activePageId}
        setActivePageId={setActivePageId}
      />
      <div className={styles.content}></div>
    </div>
  );
}
