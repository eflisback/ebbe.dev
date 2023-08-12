import { useState, useEffect } from "react";
import styles from "./GptClient.module.css";

// Components
import ChatFlow from "./ChatFlow/ChatFlow";
import SettingsModal from "./SettingsModal/SettingsModal";
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../../utils/localStorage";

const defaultSettings: MyData = {
  key: "settings",
  value: {
    model: "gpt-3.5-turbo",
    api_key: "",
    chatHistoryMemory: 3,
  },
};

export default function GptClient() {
  const [settings, setSettings] = useState(defaultSettings.value);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedSettings = getDataFromLocalStorage(defaultSettings.key);
    if (storedSettings) {
      setSettings(storedSettings);
    }
  }, []);

  useEffect(() => {
    try {
      saveDataToLocalStorage({ key: defaultSettings.key, value: settings });
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
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
          settings={settings}
          setSettings={setSettings}
          modalOpen={modalOpen}
          closeModal={closeModal}
        />
        <ChatFlow settings={settings} openModal={openModal} />
      </div>
    </div>
  );
}
