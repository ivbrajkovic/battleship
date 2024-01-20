import { StrictMode } from "react";
import "@mantine/core/styles.css";

import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { MantineProvider } from "./providers/MantineProvider.tsx";
import { GameProvider } from "./providers/GameProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </MantineProvider>
  </StrictMode>,
);
