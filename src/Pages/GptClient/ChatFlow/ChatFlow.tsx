import React, { useState } from "react";
import styles from "./ChatFlow.module.css";

class Message {
  public sender: string;
  public content: string;
  public timestamp: Date;

  constructor(sender: string, content: string) {
    this.sender = sender;
    this.content = content;
    this.timestamp = new Date();
  }
}

interface IProps {
  messages: Message[];
}

export default function ChatFlow(p: IProps) {
  const [inputValue, setInputValue] = useState("");

  const handleMessageSend = () => {
    console.log("Heya sending message"); // Function to be called when a message is sent
    // Add your logic for sending the message to the AI model
    // For now, we're simply logging a message
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.back}>
      <div className={styles.messageFlow}>
        {p.messages.map((message, index) => (
          <div
            className={`${styles.message} ${
              index % 2 === 0 ? styles.brighter : ""
            }`}
            key={index}
          >
            <div className={styles.sender}>{message.sender}</div>
            <div className={styles.content}>{message.content}</div>
            <div className={styles.timestamp}>
              {message.timestamp.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.container}>
          <textarea
            className={styles.messageInput}
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className={styles.sendButton}
            onClick={handleMessageSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
