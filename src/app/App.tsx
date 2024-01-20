import { Container } from "@mantine/core";

import { Layout } from "../layout/Layout";
import { GameInfo } from "../components/GameInfo/GameInfo";
import { GameBoard } from "../components/GameBoard/GameBoard";

import classes from "./App.module.css";

function App() {
  return (
    <Layout>
      <Container className={classes.container}>
        <GameInfo />
        <GameBoard />
      </Container>
    </Layout>
  );
}

export default App;
