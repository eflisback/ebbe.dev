import { useState } from "react";
import styles from "./GptClient.module.css";

// Components
import Header from "./Header/Header";
import Chats from "./Chats/Chats";
import ChatFlow from "./ChatFlow/ChatFlow";
import Settings from "./Settings/Settings";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string;

const defaultSettings = {
  model: "gpt-3.5-turbo",
  api_key: apiKey,
  chatHistoryMemory: 3,
};

export default function GptClient() {
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <div className={styles.body}>
      <Chats />
      <div className={styles.mainContent}>
        <Header />
        <ChatFlow settings={settings} />
      </div>
      <Settings setSettings={setSettings} />
    </div>
  );
}
