import { ReactElement } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import styles from './Header.module.scss'

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

export const Header = () => {
    return (
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
    )
}