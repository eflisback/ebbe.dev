import styles from "./BrowseChatsModal.module.css";
import { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCheck,
} from "react-icons/ai";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../../../utils/localStorage";
import { generateUniqueId } from "../../../utils/createUniqueId";

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
  const [loadedChats, setLoadedChats] = useState<Chat[]>([]);
  const [sessionToEditId, setSessionToEditId] = useState<string | null>(null);

  useEffect(() => {
    const chats: Chat[] | null = getDataFromLocalStorage("chats") as
      | Chat[]
      | null;
    if (chats) {
      // Add null and property checks here
      // Sort chats by timestamp in descending order (newest first)
      const sortedChats = chats.sort((a, b) =>
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
    if (id === sessionToEditId) {
      setSessionToEditId(null);
    } else {
      setSessionToEditId(id);
    }
  };

  const handleDeleteClick = (
    id: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    const chats: Chat[] = (getDataFromLocalStorage("chats") as Chat[]) || [];
    if (chats) {
      // Filter out the chat with the matching id
      const updatedChats = chats.filter((chat) => chat.id !== id);
      if (updatedChats.length < 1) {
        updatedChats.push({
          name: "hej",
          id: generateUniqueId(),
          timestamp: new Date(),
          messages: [],
        });
      }
      // Update the local storage with the updated chats data
      saveDataToLocalStorage({ key: "chats", value: updatedChats });
      setLoadedChats(updatedChats);
    }
  };

  if (!modalOpen) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={handleModalClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span>
            Your chats{" "}
            <span style={{ color: "rgb(255, 80, 80)" }}>
              (Work in progress!)
            </span>
          </span>
          <span className={styles.close} onClick={handleCloseClick}>
            <AiOutlineClose />
          </span>
        </div>
        <div className={styles.chatList}>
          {loadedChats.map((loadedChat) => {
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
                  <span>
                    {loadedChat.timestamp instanceof Date
                      ? loadedChat.timestamp.toLocaleDateString()
                      : new Date(loadedChat.timestamp).toLocaleDateString()}
                    ,{" "}
                    {loadedChat.timestamp instanceof Date
                      ? loadedChat.timestamp.toLocaleTimeString()
                      : new Date(loadedChat.timestamp).toLocaleTimeString()}
                  </span>
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
                  {loadedChats.length > 1 ? (
                    <button
                      className={styles.deleteButton}
                      onClick={(event) =>
                        handleDeleteClick(loadedChat.id, event)
                      }
                    >
                      <AiOutlineDelete />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
