interface Page {
  displayText: string;
  id: string;
  component?: JSX.Element;
}

interface MyData {
  key: string;
  value: any;
}

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
