import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <span>home</span>
      <Link to="/gpt-client">Länk</Link>
    </div>
  );
}
