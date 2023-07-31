import { useMemo, useState } from "react";
import styles from "./Home.module.css";
import { Routes, Route } from "react-router-dom";

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
  const [activePageId, setActivePageId] = useState(pages[0].id);

  const activePage = useMemo(
    () => [...pages, ...aboutPages].find((page) => page.id === activePageId),
    [activePageId]
  );

  return (
    <div className={styles.body}>
      <NavBar
        pages={pages}
        aboutPages={aboutPages}
        activePageId={activePageId}
        setActivePageId={setActivePageId}
      />
      <div className={styles.content}>
        <Header displayText={activePage!.displayText} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/test" element={<TestPage1 />} />
        </Routes>
        {/*         {activePage!.component}
         */}{" "}
      </div>
    </div>
  );
}
