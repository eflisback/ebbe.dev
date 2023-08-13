import { useState, useEffect } from "react";
import styles from "./Header.module.css";

interface IProps {
  path: string;
}

export default function Header({ path }: IProps) {
  const [text, setText] = useState("");
  const [borderAnimation, setBorderAnimation] = useState(true);
  const minDelay = 50;
  const maxDelay = 100;
  const initialDelay = 500;

  useEffect(() => {
    setBorderAnimation(true);
    let isMounted = true;

    const typeWriter = (textToType: string, index: number) => {
      if (!isMounted) return;

      if (index === textToType.length) return;

      const delay = Math.floor(
        Math.random() * (maxDelay - minDelay) + minDelay
      );

      setTimeout(() => {
        setText(textToType.substring(0, index + 1));
        typeWriter(textToType, index + 1);
      }, delay);
    };

    setText("");

    const timeout = setTimeout(() => {
      typeWriter(`ebbe.dev / ${path}`, 0);
    }, initialDelay);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [path, initialDelay]);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setBorderAnimation(false);
    }, 3000);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [text]);

  return (
    <div className={styles.main}>
      <div>
        <span className={borderAnimation ? "" : styles.noAnimation}>
          {text}
        </span>
      </div>
    </div>
  );
}
