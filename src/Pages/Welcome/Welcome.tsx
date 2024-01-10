import styles from "./Welcome.module.css";

// Components
import LinkButton from "../../Components/Button/LinkButton/LinkButton";
import TextLink from "../../Components/Text/TextLink/TextLink";
import ListItem from "../../Components/Text/ListItem/ListItem";

// Icons
import { RiGitRepositoryLine } from "react-icons/ri";

export default function Welcome() {
  return (
    <div className={styles.pageBody}>
      <div className={styles.main}>
        <span className={styles.title}>Welcome!</span>
        <p>
          Welcome to my portfolio website that I created to showcase personal
          projects, skills, and experience. This website is built using{" "}
          <TextLink
            displayText="React"
            link="https://react.dev/"
            targetBlank={true}
          />
          , written in{" "}
          <TextLink
            displayText="TypeScript"
            link="https://www.typescriptlang.org/"
            targetBlank={true}
          />
          , and powered by{" "}
          <TextLink
            displayText="Vite"
            link="https://vitejs.dev/"
            targetBlank={true}
          />
          . Feel free to check out some built-in projects under the{" "}
          <span style={{ color: "white" }}>Pages </span>
          section of the navbar, or have a look at some external ones in the{" "}
          <TextLink
            displayText="Projects"
            link="/projects"
            targetBlank={false}
          />{" "}
          tab. <span style={{ color: "rgb(255, 80, 80)" }}>Note!</span> If
          you're seeing this the website is not yet done, and you might
          encounter bugs.
        </p>
        <div className={styles.linkButtonContainer}>
          <LinkButton
            title="Source repo"
            description="The code of this website is open source and can be found on my GitHub page."
            icon={<RiGitRepositoryLine />}
            link="https://github.com/eflisback/ebbe.dev"
          />
        </div>
        <span className={styles.subTitle}>More about this website</span>
        <p>
          Listed below are some of the libraries which I've used developing this
          website that I believe deserve to be mentioned.
        </p>
        <div className={styles.list}>
          <ListItem
            content={
              <>
                <TextLink
                  displayText="React Icons"
                  link="https://react-icons.github.io/react-icons/"
                  targetBlank={true}
                />
                <span style={{ color: "gray" }}>
                  , from which all fancy icons in this website have been
                  imported
                </span>
              </>
            }
          />
          <ListItem
            content={
              <>
                <TextLink
                  displayText="React Router"
                  link="https://reactrouter.com/en/main"
                  targetBlank={true}
                />
                <span style={{ color: "gray" }}>
                  , which handles the navigation in the website
                </span>
              </>
            }
          />
          <ListItem
            content={
              <>
                <TextLink
                  displayText="OpenAI Chat Completion API"
                  link="https://platform.openai.com/docs/api-reference"
                  targetBlank={true}
                />
                <span style={{ color: "gray" }}>
                  , used to talk to the GPT models in my{" "}
                  <TextLink
                    displayText="custom GPT client"
                    link="/gpt"
                    targetBlank={false}
                  />
                  .
                </span>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
