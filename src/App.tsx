import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home/Home";
import GptClient from "./Pages/GptClient/GptClient";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gpt-client" element={<GptClient />} />
    </Routes>
  );
}
