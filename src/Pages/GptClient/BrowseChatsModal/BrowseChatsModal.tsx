import styles from "./BrowseChatsModal.module.css";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { getDataFromLocalStorage } from "../../../utils/localStorage";

interface IProps {
  modalOpen: boolean;
  closeModal: () => void;
  setSelectedChatId: React.Dispatch<React.SetStateAction<string>>;
}

export default function BrowseChatsModal({
  modalOpen,
  closeModal,
  setSelectedChatId,
}: IProps) {
  const [loadedChats, setLoadedChats] = useState<IChat[]>([]);

  useEffect(() => {
    console.log("Attempting to load chat sessions");
    const chatsData: IChats | null = getDataFromLocalStorage(
      "chats"
    ) as IChats | null;
    if (chatsData) {
      // Sort chats by timestamp in descending order (newest first)
      const sortedChats = chatsData.chats.sort((a, b) =>
        b.timestamp instanceof Date && a.timestamp instanceof Date
          ? b.timestamp.getTime() - a.timestamp.getTime()
          : 0
      );

      setLoadedChats(sortedChats);
    }
  }, [modalOpen]);

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
              <span>Your chats</span>
              <span className={styles.close} onClick={handleCloseClick}>
                <AiOutlineClose />
              </span>
            </div>
            <div className={styles.chatList}>
              {loadedChats.map((loadedChat) => (
                <div
                  key={loadedChat.id}
                  onClick={() => setSelectedChatId(loadedChat.id)}
                >
                  {loadedChat.timestamp instanceof Date
                    ? loadedChat.timestamp.toLocaleDateString()
                    : new Date(loadedChat.timestamp).toLocaleDateString()}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
