import { ReactElement } from "react";
import styles from "./Start.module.scss";
import { FaCode, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

interface SocialLink {
  icon: ReactElement;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FaGithub />,
    href: "https://github.com/eflisback/",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/ebbe-flisb%C3%A4ck-a89a3a296/",
  },
  {
    icon: <FaEnvelope />,
    href: "mailto:ebbe.flisback@gmail.com",
  },
];

export const Start = () => {
  return (
    <div className={`${styles.overlay} ${styles.start}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span>ebbe.</span>
          <span className={styles.gradientText}>dev</span>
        </div>
        <div className={styles.socials}>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={styles.link}
              target="_blank"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.middleSection}>
        <span></span>
      </div>
      <div className={styles.footer}>
        <FaCode />
        <span>
          This portfolio is open source, and its GitHub repository is available{" "}
          {/* TODO: Add actual GitHub repository link. */}
          <a href="">here</a>.
        </span>
      </div>
    </div>
  );
};
