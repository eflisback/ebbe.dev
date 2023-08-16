import styles from "./BrowseChatsModal.module.css";
import { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCheck,
} from "react-icons/ai";
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
  const [sessionToEditId, setSessionToEditId] = useState<string | null>(null);

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

  console.log("hej", sessionToEditId);

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

  const handleChatClick = (id: string) => {
    if (sessionToEditId !== id) {
      setSelectedChatId(id);
      closeModal();
    }
  };

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    console.log("click");
    if (id === sessionToEditId) {
      console.log("blir tom");
      setSessionToEditId(null);
    } else {
      setSessionToEditId(id);
    }
  };

  useEffect(() => {
    console.log(sessionToEditId);
  }, [sessionToEditId]);

  if (!modalOpen) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={handleModalClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span>Your chats</span>
          <span className={styles.close} onClick={handleCloseClick}>
            <AiOutlineClose />
          </span>
        </div>
        <div className={styles.chatList}>
          {loadedChats.map((loadedChat) => {
            console.log("loadedChat.id:", loadedChat.id);
            return (
              <div
                key={loadedChat.id}
                onClick={() => handleChatClick(loadedChat.id)}
              >
                <div className={styles.leftSection}>
                  <input
                    className={styles.nameInput}
                    type="text"
                    value={"Hej"}
                    id="test"
                    placeholder={loadedChat.name}
                    disabled={loadedChat.id !== sessionToEditId}
                  />
                  {loadedChat.timestamp instanceof Date
                    ? loadedChat.timestamp.toLocaleDateString()
                    : new Date(loadedChat.timestamp).toLocaleDateString()}
                </div>
                <div>
                  <button
                    className={styles.editButton}
                    onClick={(event) => handleEditClick(event, loadedChat.id)}
                  >
                    {loadedChat.id === sessionToEditId ? (
                      <AiOutlineCheck />
                    ) : (
                      <AiOutlineEdit />
                    )}
                  </button>
                  <button className={styles.deleteButton}>
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
