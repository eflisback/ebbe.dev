import styles from "./SettingsModal.module.css";

interface IProps {
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
  setSettings,
  modalOpen,
  closeModal,
}: IProps) {
  const handleSaveSettings = () => {
    // Handle saving settings here
    // For example:
    // setSettings({ model: "some_model", api_key: "some_api_key", chatHistoryMemory: 100 });
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
            <span className={styles.close} onClick={handleCloseClick}>
              &times;
            </span>
            <p>Some text in the Modal..</p>
            <button onClick={handleSaveSettings}>Save Settings</button>
          </div>
        </div>
      )}
    </div>
  );
}
