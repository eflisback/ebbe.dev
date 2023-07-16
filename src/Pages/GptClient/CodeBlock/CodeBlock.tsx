import styles from "./CodeBlock.module.css";

interface IProps {
  code: string;
}

export default function CodeBlock({ code }: IProps) {
  console.log(code);
  const languageName = code.split("\n")[0];
  const remainingCode = code.split("\n").slice(1).join("\n");

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(remainingCode);
    } catch (error) {
      // Handle the error here
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className={styles.back}>
      <div className={styles.header}>
        <span>{languageName}</span>
        <span className={styles.copy} onClick={() => handleCopyClick}>
          Copy
        </span>
      </div>
      <pre>
        <code>{remainingCode}</code>
      </pre>
    </div>
  );
}
