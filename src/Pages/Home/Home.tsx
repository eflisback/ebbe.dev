import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Home.module.css";
import { Routes, Route } from "react-router-dom";

// Components
import NavBar from "./NavBar/NavBar";
import Header from "./Header/Header";

// Pages
import Welcome from "../Welcome/Welcome";
import TestPage1 from "../TestPage1/TestPage1";
import GptClient from "../GptClient/GptClient";

import FourZeroFour from "./FourZeroFour/FourZeroFour";

const fourZeroFour: IPage = {
  displayText: "404 Not Found",
  id: "404",
  component: <FourZeroFour />,
};

const pages: IPage[] = [
  {
    displayText: "Welcome",
    id: "welcome",
    component: <Welcome />,
  },
  {
    displayText: "Custom GPT Client",
    id: "gpt",
    component: <GptClient />,
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
  let location = useLocation();
  const [activePageId, setActivePageId] = useState(pages[0].id);

  const activePage = useMemo(() => {
    const pathId = location.pathname.slice(1);
    if (pathId === "") {
      setActivePageId(pages[0].id);
      return pages[0];
    }
    const allPages = pages.concat(aboutPages);
    const foundPage = allPages.find((page) => page.id === pathId);

    if (foundPage) {
      setActivePageId(foundPage.id);
      return foundPage;
    }

    setActivePageId(fourZeroFour.id);
    return fourZeroFour;
  }, [location]);

  return (
    <div className={styles.body}>
      <NavBar
        pages={pages}
        aboutPages={aboutPages}
        activePageId={activePageId}
      />
      <div className={styles.content}>
        <Header path={activePage!.id} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          {pages.concat(aboutPages).map((page) => (
            <Route
              path={"/" + page.id}
              key={page.id}
              element={page.component}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}
