import React from "react";
import ReactDOM from "react-dom";
import Fleur from "@fleur/fleur";
import { FleurContext } from "@fleur/fleur-react";

import { GameStore } from "./domains/game/gameStore";
import { Game } from "./components/Game";
import "./index.css";

const app = new Fleur({
  stores: [GameStore]
});
const context = app.createContext();

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root");

  ReactDOM.render(
    <FleurContext value={context}>
      <Game />
    </FleurContext>,
    root
  );
});
