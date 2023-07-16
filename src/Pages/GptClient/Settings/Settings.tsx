import React, { useState } from "react";
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
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [apiKey, setApiKey] = useState("");
  const [chatHistoryMemory, setChatHistoryMemory] = useState(3);

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
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setChatHistoryMemory(value);
    }
  };

  const handleSaveSettings = () => {
    setSettings({
      model: model,
      api_key: apiKey,
      chatHistoryMemory: chatHistoryMemory,
    });
  };

  return (
    <div className={styles.outer}>
      <div className={styles.back}>
        <span>Settings</span>
        <div>
          <label htmlFor="model">Model:</label>
          <select id="model" value={model} onChange={handleModelChange}>
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            <option value="gpt-4">gpt-4</option>
          </select>
        </div>
        <div>
          <label htmlFor="apiKey">API Key:</label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
          />
        </div>
        <div>
          <label htmlFor="chatHistoryMemory">Chat History Memory:</label>
          <input
            id="chatHistoryMemory"
            type="number"
            min={1}
            max={10}
            value={chatHistoryMemory}
            onChange={handleChatHistoryMemoryChange}
          />
        </div>
        <button onClick={handleSaveSettings}>Save</button>
      </div>
    </div>
  );
}
