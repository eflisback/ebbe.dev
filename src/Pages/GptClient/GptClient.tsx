import styles from "./GptClient.module.css";

// Components
import Header from "./Header/Header";
import Chats from "./Chats/Chats";
import ChatFlow from "./ChatFlow/ChatFlow";
import Settings from "./Settings/Settings";

export default function GptClient() {
  return (
    <div className={styles.body}>
      <Chats />
      <div className={styles.mainContent}>
        <Header />
        <ChatFlow />
      </div>
      <Settings />
    </div>
  );
}
