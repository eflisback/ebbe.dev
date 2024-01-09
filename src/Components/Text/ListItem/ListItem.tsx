import styles from "./ListItem.module.css";

import { AiOutlineArrowRight } from "react-icons/ai";

interface IProps {
  content: JSX.Element;
}

export default function ListItem({ content }: IProps) {
  return (
    <span className={styles.listItem}>
      <AiOutlineArrowRight />
      {content}
    </span>
  );
}
