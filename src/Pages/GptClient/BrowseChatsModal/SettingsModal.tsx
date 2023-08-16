import styles from "./BrowseChatsModal.module.css";
import { AiOutlineClose } from "react-icons/ai";

interface IProps {
  modalOpen: boolean;
  closeModal: () => void;
}

export default function BrowseChatsModal({ modalOpen, closeModal }: IProps) {
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
          </div>
        </div>
      )}
    </div>
  );
}
