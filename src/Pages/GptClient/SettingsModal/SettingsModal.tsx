import { useEffect, useState } from "react";
import styles from "./SettingsModal.module.css";
import { AiOutlineClose } from "react-icons/ai";

interface IProps {
  settings: {
    model: string;
    api_key: string;
    chatHistoryMemory: number;
  };
  setSettings: React.Dispatch<
    React.SetStateAction<{
      model: string;
      api_key: string;
      chatHistoryMemory: number;
    }>
  >;
  modalOpen: boolean;
  closeModal: () => void;
}

export default function SettingsModal({
  settings,
  setSettings,
  modalOpen,
  closeModal,
}: IProps) {
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [chatHistoryMemory, setChatHistoryMemory] = useState(0);

  useEffect(() => {
    if (settings) {
      setModel(settings.model);
    }
  }, [settings]);

  useEffect(() => {
    if (settings) {
      setApiKey(settings.api_key);
    }
  }, [settings]);

  useEffect(() => {
    if (settings) {
      setChatHistoryMemory(settings.chatHistoryMemory);
    }
  }, [settings]);

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleChatHistoryMemoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setChatHistoryMemory(value);
    } else setChatHistoryMemory(0);
  };

  const handleSaveSettings = () => {
    setSettings({
      model: model,
      api_key: apiKey,
      chatHistoryMemory: chatHistoryMemory,
    });
    closeModal();
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click occurred outside the modalContent
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleCloseClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation(); // Prevent the click from reaching the modal element
    closeModal();
  };

  return (
    <div>
      {modalOpen && (
        <div className={styles.modal} onClick={handleModalClick}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <span>Settings</span>
              <span className={styles.close} onClick={handleCloseClick}>
                <AiOutlineClose />
              </span>
            </div>
            <div className={styles.modelContainer}>
              <label htmlFor="model">Model</label>
              <select id="model" value={model} onChange={handleModelChange}>
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                <option value="gpt-4">gpt-4</option>
              </select>
            </div>
            <div className={styles.apiKeyContainer}>
              <label htmlFor="apiKey">API Key</label>
              <input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={handleApiKeyChange}
              />
            </div>
            <div className={styles.chatHistoryContainer}>
              <label htmlFor="chatHistoryMemory">Chat History Memory</label>
              <input
                id="chatHistoryMemory"
                type="text"
                value={chatHistoryMemory}
                onChange={handleChatHistoryMemoryChange}
              />
            </div>{" "}
            <button className={styles.saveButton} onClick={handleSaveSettings}>
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
