// import { useEffect, useState } from "react";
import styles from "./Header.module.css";

interface IProps {
  page: IPage;
}

export default function Header({ page }: IProps) {
  const path: string = "ebbe.dev - " + page.displayText;
  /* const [renderedPath, setRenderedPath] = useState("");

  useEffect(() => {
    if (page.displayText !== "" && renderedPath === "") {
      let initialString = "";
      const subStrings = path.split("");
      subStrings.forEach((letter) => {
        initialString += letter;
        setRenderedPath(initialString);
      });
    }
  }, [page.displayText, renderedPath]);

  useEffect(() => {
    console.log("hej");
    console.log(renderedPath);
  }, [renderedPath]); */

  return (
    <div className={styles.main}>
      <span>{path}</span>
    </div>
  );
}
