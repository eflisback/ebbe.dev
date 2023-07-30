import { useEffect, useState } from "react";
import styles from "./Header.module.css";

interface IProps {
  page: IPage;
}

export default function Header({ page }: IProps) {
  const fullText: string = "ebbe.dev - " + page.displayText;
  const [path, setPath] = useState("");

  useEffect(() => {
    let currentCharIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentCharIndex >= fullText.length) {
        clearInterval(typingInterval);
      } else {
        setPath((prevPath) => prevPath + fullText.charAt(currentCharIndex));
        currentCharIndex++;
      }
    }, 100);

    // Clean up the interval when the component unmounts
    return () => clearInterval(typingInterval);
  }, [fullText]);

  useEffect(() => {
    // Clear the text and restart the typewriter effect when the active page changes
    setPath("");
  }, [page]);

  return (
    <div className={styles.main}>
      <span>{path}</span>
    </div>
  );
}
