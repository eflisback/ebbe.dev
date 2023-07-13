import styles from "./GptClient.module.css";

// Components
import Header from "./Header/Header";
import Chats from "./Chats/Chats";
import ChatFlow from "./ChatFlow/ChatFlow";
import Settings from "./Settings/Settings";

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

export default function GptClient() {
  return (
    <div className={styles.body}>
      <Chats />
      <div className={styles.mainContent}>
        <Header />
        <ChatFlow messages={testData} />
      </div>
      <Settings />
    </div>
  );
}
