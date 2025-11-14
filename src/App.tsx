// src/App.tsx
import { RiNavigationFill } from "react-icons/ri";
import { useIconCursor } from "./hooks/useIconCursor";
import PlayfulLogin from "./pages/PlayfulLogin";

export default function App() {
  useIconCursor(RiNavigationFill, { size: 28, color: "#000", hotX: 6, hotY: 4, target: "body" });
  return <PlayfulLogin />;
}
