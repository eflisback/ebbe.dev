import styles from "./Settings.module.css";

interface IProps {
  setSettings: React.Dispatch<
    React.SetStateAction<{
      model: string;
      api_key: string;
      chatHistoryMemory: number;
    }>
  >;
}

export default function Settings({ setSettings }: IProps) {
  return (
    <div className={styles.outer}>
      <div className={styles.back}>
        <span>settings</span>
      </div>
    </div>
  );
}
