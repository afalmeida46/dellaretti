import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { installDevtoolsBlocker } from "./lib/devtools-block";

installDevtoolsBlocker();

createRoot(document.getElementById("root")!).render(<App />);
