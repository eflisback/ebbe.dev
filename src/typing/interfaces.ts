// Dealing with the websites different pages
interface Page {
  displayText: string;
  id: string;
  component?: JSX.Element;
}

// For saving data in local storage using key-value mapping
interface MyData {
  key: string;
  value: any;
}

// For managing chat data in the custom gpt client
interface Chat {
  id: string;
  name: string;
  timestamp: Date;
  messages: {
    sender: string;
    blocks: {
      content: string;
      isCode: boolean;
    }[];
    timestamp: Date;
  }[];
}

// For displaying project data in a nice way
interface Project {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  tags: {
    icon?: JSX.Element;
    name: string;
  }[];
  repoLink: string;
}
