import { useState, useEffect } from "react";
import styles from "./GptClient.module.css";

// Components
import ChatFlow from "./ChatFlow/ChatFlow";
// import Settings from "./Settings/Settings";
import SettingsModal from "./SettingsModal/SettingsModal";

const defaultSettings = {
  model: "gpt-3.5-turbo",
  api_key: "",
  chatHistoryMemory: 3,
};

export default function GptClient() {
  const [settings, setSettings] = useState(defaultSettings);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className={styles.pageBody}>
      <div className={styles.mainContent}>
        <SettingsModal
          setSettings={setSettings}
          modalOpen={modalOpen}
          closeModal={closeModal}
        />
        <ChatFlow settings={settings} openModal={openModal} />
      </div>
    </div>
  );
}
