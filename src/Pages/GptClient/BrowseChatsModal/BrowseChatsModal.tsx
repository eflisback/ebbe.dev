import styles from "./BrowseChatsModal.module.css";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { getDataFromLocalStorage } from "../../../utils/localStorage";

interface IProps {
  modalOpen: boolean;
  closeModal: () => void;
}

export default function BrowseChatsModal({ modalOpen, closeModal }: IProps) {
  const [loadedChats, setLoadedChats] = useState<IChat[]>([]);

  useEffect(() => {
    const chatsData: IChats | null = getDataFromLocalStorage(
      "chats"
    ) as IChats | null;
    if (chatsData) {
      setLoadedChats(chatsData.chats);
    }
  }, []);

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
                <div>
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
