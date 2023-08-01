import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatFlow.module.css";
import { OpenAIApi } from "openai";
import { Configuration } from "openai/dist/configuration";
import { FiSettings } from "react-icons/fi";

// Components
import CodeBlock from "../CodeBlock/CodeBlock";

class MessageBlock {
  public content: string;
  public isCode: boolean;

  constructor(content: string, isCode: boolean) {
    this.content = content;
    this.isCode = isCode;
  }
}

class Message {
  public sender: string;
  public blocks: MessageBlock[];
  public timestamp: Date;

  constructor(sender: string, blocks: MessageBlock[]) {
    this.sender = sender;
    this.blocks = blocks;
    this.timestamp = new Date();
  }
}

interface IProps {
  settings: {
    model: string;
    api_key: string;
    chatHistoryMemory: number;
  };
  openModal: () => void;
}

type ChatCompletionRequestMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function ChatFlow({ settings, openModal }: IProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messageFlowRef = useRef<HTMLDivElement>(null);

  const configuration = new Configuration({
    apiKey: settings.api_key,
  });
  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    if (messageFlowRef.current) {
      messageFlowRef.current.scrollTop = messageFlowRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleMessageSend() {
    console.log("Sending message:", inputValue);
    if (!inputValue.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      new Message("user", [new MessageBlock(inputValue, false)]),
    ]);
    setInputValue("");

    try {
      const messagesToInclude: ChatCompletionRequestMessage[] = messages
        .slice(-settings.chatHistoryMemory)
        .map((message) => ({
          role: message.sender === "user" ? "user" : "assistant",
          content: message.blocks.map((block) => block.content).join("\n"),
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

      const codeRegex = /```([\s\S]*?)```/g;
      const blocks: MessageBlock[] = [];
      let match;

      let currentIndex = 0;
      while ((match = codeRegex.exec(response_text)) !== null) {
        const codeContent = match[1];
        const nonCodeContent = response_text.substring(
          currentIndex,
          match.index
        );

        if (nonCodeContent) {
          blocks.push(new MessageBlock(nonCodeContent, false));
        }

        blocks.push(new MessageBlock(codeContent, true));
        currentIndex = codeRegex.lastIndex;
      }

      if (currentIndex < response_text.length) {
        const remainingContent = response_text.substring(currentIndex);
        blocks.push(new MessageBlock(remainingContent, false));
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        new Message("model", blocks),
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
      <div className={styles.messageFlow} ref={messageFlowRef}>
        {messages.map((message, index) => (
          <div
            className={`${styles.message} ${
              index % 2 === 0 ? styles.brighter : ""
            }`}
            key={index}
          >
            <div className={styles.sender}>{message.sender}</div>
            {message.blocks.map((block, blockIndex) => (
              <React.Fragment key={blockIndex}>
                {block.isCode ? (
                  <CodeBlock code={block.content} />
                ) : (
                  <div className={styles.content}>{block.content}</div>
                )}
              </React.Fragment>
            ))}
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
          <div className={styles.buttons}>
            <button onClick={openModal} className={styles.settingsButton}>
              <FiSettings />
            </button>
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
    </div>
  );
}
