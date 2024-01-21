import "@mantine/core/styles.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App.tsx";
import { MantineProvider } from "./providers/MantineProvider.tsx";
import { GameProvider } from "./providers/GameProvider.tsx";
import { ModalsProvider } from "./providers/ModalProvider.tsx";

import data from "./data.json";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider
      initial={{
        boardSize: data.boardSize,
        shipTypes: data.shipTypes,
      }}
    >
      <MantineProvider>
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </MantineProvider>
    </GameProvider>
  </StrictMode>,
);
