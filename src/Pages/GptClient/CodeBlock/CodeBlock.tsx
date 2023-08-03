import styles from "./CodeBlock.module.css";

interface IProps {
  code: string;
}

export default function CodeBlock({ code }: IProps) {
  const languageName = code.split("\n")[0];
  const remainingCode = code.split("\n").slice(1).join("\n");

  const handleCopyClick = () => {
    navigator.clipboard.writeText(remainingCode).then().catch();
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
