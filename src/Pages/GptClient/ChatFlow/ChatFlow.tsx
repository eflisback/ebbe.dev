import React, { useState } from "react";
import styles from "./ChatFlow.module.css";
import { OpenAIApi } from "openai";
import { Configuration } from "openai/dist/configuration";
let openai;
const instructions = ``;

const api_key = import.meta.env.VITE_OPENAI_API_KEY as string;

// const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
console.log("ollebolle: ", import.meta.env.VITE_OPENAI_API_KEY);
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

const testData: Message[] = [
  new Message("user", "Hello! How are you?"),
  new Message("model", "I'm doing well, thank you! How about you?"),
  new Message("user", "I'm good too. Just working on a project."),
  new Message("model", "That sounds interesting. What kind of project is it?"),
  new Message(
    "user",
    "It's a web development project using the latest frameworks."
  ),
  new Message("model", "That's great! Which frameworks are you using?"),
  new Message(
    "user",
    "I'm using React.js for the frontend and Node.js for the backend."
  ),
  new Message(
    "model",
    "Excellent choice! Both React.js and Node.js are popular and powerful tools."
  ),
  new Message(
    "user",
    "Thank you! I'm excited about how the project is shaping up."
  ),
  new Message(
    "model",
    "I'm sure it will turn out great. Best of luck with your development!"
  ),
];

export default function ChatFlow() {
  const [inputValue, setInputValue] = useState("");

  const messages = testData;

  const handleMessageSend = () => {
    console.log("Heya sending message");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.back}>
      <div className={styles.messageFlow}>
        {messages.map((message, index) => (
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
