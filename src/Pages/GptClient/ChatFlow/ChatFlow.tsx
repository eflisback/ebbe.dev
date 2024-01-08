import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatFlow.module.css";
import { OpenAI } from "openai";
import { FiSettings, FiMenu } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineSend } from "react-icons/ai";
import { BsChatLeftDots } from "react-icons/bs";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../../../utils/localStorage";

import { generateUniqueId } from "../../../utils/createUniqueId";

// Components
import CodeBlock from "../CodeBlock/CodeBlock";

interface IProps {
  settings: {
    model: string;
    api_key: string;
    chatHistoryMemory: number;
  };
  openSettingsModal: () => void;
  openBrowseChatsModal: () => void;
  selectedChatId: string;
}

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

type ChatCompletionRequestMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function ChatFlow({
  settings,
  openSettingsModal,
  openBrowseChatsModal,
  selectedChatId,
}: IProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState("");
  const messageFlowRef = useRef<HTMLDivElement>(null);

  const openai = new OpenAI({
    apiKey: settings.api_key,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    const chatsData: Chat[] | null = getDataFromLocalStorage("chats") as
      | Chat[]
      | null;
    if (chatsData) {
      let latestChat: Chat | null = null;
      chatsData.forEach((chat: Chat) => {
        if (!latestChat || chat.timestamp > latestChat.timestamp) {
          latestChat = chat;
        }
      });
      if (latestChat !== undefined) {
        setCurrentSessionId(latestChat!.id);
        setMessages(latestChat!.messages);
      }
    } else {
      const newChatId = generateUniqueId();
      setCurrentSessionId(newChatId);
    }
  }, []);

  useEffect(() => {
    setCurrentSessionId(selectedChatId);
  }, [selectedChatId]);

  // useEffect hook which scrolls automatically as messages array changes
  useEffect(() => {
    if (messageFlowRef.current) {
      messageFlowRef.current.scrollTop = messageFlowRef.current.scrollHeight;
    }
  }, [messages]);

  // useEffect hook that loads new chat when currentSessionId changes
  useEffect(() => {
    const chats: Chat[] = (getDataFromLocalStorage("chats") as Chat[]) || [];
    if (chats) {
      const existingSession = chats.find(
        (chat) => chat.id === currentSessionId
      );
      if (existingSession) {
        // if the chat exists
        setMessages(existingSession.messages);
      } else {
        // if a new chat is created
        setMessages([]);
      }
    }
  }, [currentSessionId]);

  // useEffect hook that handles saving data to active chat
  useEffect(() => {
    const chats: Chat[] = (getDataFromLocalStorage("chats") as Chat[]) || [];
    const existingChatIndex = chats.findIndex(
      (chat) => chat.id === currentSessionId
    );

    if (existingChatIndex !== -1) {
      chats[existingChatIndex].messages = messages;
      chats[existingChatIndex].timestamp = new Date();
    } else {
      const newChat: Chat = {
        id: currentSessionId,
        name: "Chat Room",
        timestamp: new Date(),
        messages: messages,
      };
      chats.push(newChat);
    }

    saveDataToLocalStorage({ key: "chats", value: chats });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  function parseMessageForCodeBlocks(text: string): MessageBlock[] {
    const codeRegex = /```([\s\S]*?)```/g;
    const blocks: MessageBlock[] = [];
    let match;
    let currentIndex = 0;

    while ((match = codeRegex.exec(text)) !== null) {
      const codeContent = match[1];
      const nonCodeContent = text.substring(currentIndex, match.index);

      if (nonCodeContent) {
        blocks.push(new MessageBlock(nonCodeContent, false));
      }

      blocks.push(new MessageBlock(codeContent, true));
      currentIndex = codeRegex.lastIndex;
    }

    if (currentIndex < text.length) {
      const remainingContent = text.substring(currentIndex);
      blocks.push(new MessageBlock(remainingContent, false));
    }

    return blocks;
  }

  async function handleMessageSend() {
    if (!inputValue.trim()) return;

    const userMessageBlocks = parseMessageForCodeBlocks(inputValue);
    setMessages((prevMessages) => [
      ...prevMessages,
      new Message("user", userMessageBlocks),
    ]);
    setInputValue("");

    try {
      const messagesToInclude: ChatCompletionRequestMessage[] = messages
        .slice(-settings.chatHistoryMemory)
        .map((message) => ({
          role: message.sender === "user" ? "user" : "assistant",
          content: message.blocks.map((block) => block.content).join("\n"),
        }));

      const response = await openai.chat.completions.create(
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

      const response_text = response.choices[0].message!.content!.trim();

      const responseMessageBlocks = parseMessageForCodeBlocks(response_text);

      setMessages((prevMessages) => [
        ...prevMessages,
        new Message(`model (${settings.model})`, responseMessageBlocks),
      ]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = `An error occurred: ${(error as Error).message}`;

      setMessages((prevMessages: Message[]) => [
        ...prevMessages,
        new Message("system", [new MessageBlock(errorMessage, false)]),
      ]);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  function clearCurrentChat() {
    setMessages([]);
  }

  function createNewChat() {
    const newChatId = generateUniqueId();
    setCurrentSessionId(newChatId);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleMessageSend();
    }
  }

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
              {message.timestamp instanceof Date
                ? message.timestamp.toLocaleTimeString()
                : new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.container}>
          <textarea
            autoFocus
            className={styles.messageInput}
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <div className={styles.buttons}>
            <div>
              <button onClick={createNewChat} className={styles.newChatButton}>
                <span>New chat</span>
                <BsChatLeftDots />
              </button>
              <button
                onClick={openBrowseChatsModal}
                className={styles.viewChatsButton}
              >
                <span>Other chats</span>
                <FiMenu />
              </button>
            </div>
            <div>
              <button
                onClick={clearCurrentChat}
                className={styles.clearChatButton}
              >
                <AiOutlineDelete />
              </button>
              <button
                onClick={openSettingsModal}
                className={styles.settingsButton}
              >
                <FiSettings />
              </button>
              <button
                type="button"
                className={styles.sendButton}
                onClick={() => {
                  handleMessageSend()
                    .then()
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }}
              >
                <AiOutlineSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
