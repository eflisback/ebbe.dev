import styles from "./CodeBlock.module.css";

interface IProps {
  code: string;
}

export default function CodeBlock({ code }: IProps) {
  console.log(code);
  const languageName = code.split("\n")[0];
  const remainingCode = code.split("\n").slice(1).join("\n");

  const handleCopyClick = () => {
    console.log("Attempting to copy.");
    navigator.clipboard
      .writeText(remainingCode)
      .then(() => console.log("waddawadda"))
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.back}>
      <div className={styles.header}>
        <span>{languageName}</span>
        <button type="button" className={styles.copy} onClick={handleCopyClick}>
          Copy
        </button>
      </div>
      <pre>
        <code>{remainingCode}</code>
      </pre>
    </div>
  );
}
