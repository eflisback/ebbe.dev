import { useState, useEffect } from "react";
import styles from "./GptClient.module.css";
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../../utils/localStorage";

// Components
import ChatFlow from "./ChatFlow/ChatFlow";
import SettingsModal from "./SettingsModal/SettingsModal";
import BrowseChatsModal from "./BrowseChatsModal/BrowseChatsModal";

const defaultSettings: MyData = {
  key: "settings",
  value: {
    model: "gpt-3.5-turbo",
    api_key: "",
    chatHistoryMemory: 3,
  },
};

export default function GptClient() {
  const [selectedChatId, setSelectedChatId] = useState("");
  const [settings, setSettings] = useState(defaultSettings.value);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [browseChatsModalOpen, setBrowseChatsModalOpen] = useState(false);

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

  function openSettingsModal() {
    setSettingsModalOpen(true);
  }

  function closeSettingsModal() {
    setSettingsModalOpen(false);
  }

  function openBrowseChatsModal() {
    setBrowseChatsModalOpen(true);
  }

  function closeBrowseChatsModal() {
    setBrowseChatsModalOpen(false);
  }

  return (
    <div className={styles.pageBody}>
      <div className={styles.mainContent}>
        <SettingsModal
          settings={settings}
          setSettings={setSettings}
          modalOpen={settingsModalOpen}
          closeModal={closeSettingsModal}
        />
        <BrowseChatsModal
          modalOpen={browseChatsModalOpen}
          closeModal={closeBrowseChatsModal}
          setSelectedChatId={setSelectedChatId}
        />
        <ChatFlow
          selectedChatId={selectedChatId}
          settings={settings}
          setSettingsTest={setSettings}
          openSettingsModal={openSettingsModal}
          openBrowseChatsModal={openBrowseChatsModal}
        />
      </div>
    </div>
  );
}
