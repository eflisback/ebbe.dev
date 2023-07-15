import React, { useState } from "react";
import styles from "./ChatFlow.module.css";
import { OpenAIApi } from "openai";
import { Configuration } from "openai/dist/configuration";

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
  settings: {
    model: string;
    api_key: string;
    chatHistoryMemory: number;
  };
}

type ChatCompletionRequestMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function ChatFlow({ settings }: IProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const configuration = new Configuration({
    apiKey: settings.api_key,
  });
  const openai = new OpenAIApi(configuration);

  async function handleMessageSend() {
    console.log("Sending message:", inputValue);
    if (!inputValue.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      new Message("user", inputValue),
    ]);
    setInputValue("");

    try {
      const messagesToInclude: ChatCompletionRequestMessage[] = messages
        .slice(-settings.chatHistoryMemory)
        .map((message) => ({
          role: message.sender === "user" ? "user" : "assistant",
          content: message.content,
        }));

      const response = await openai.createChatCompletion(
        {
          model: settings.model,
          temperature: 0.888,
          max_tokens: 2048,
          frequency_penalty: 0,
          presence_penalty: 0,
          top_p: 1,
          messages: [
            ...messagesToInclude,
            { role: "user", content: inputValue },
          ],
        },
        { timeout: 60000 }
      );

      const response_text = response.data.choices[0].message!.content!.trim();

      console.log("Response:", response_text);

      setMessages((prevMessages) => [
        ...prevMessages,
        new Message("model", response_text),
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
            onClick={() => {
              console.log("Button clicked.");
              handleMessageSend()
                .then()
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
