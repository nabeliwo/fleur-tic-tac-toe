import React, { useCallback } from "react";
import { useFleurContext, useStore } from "@fleur/fleur-react";

import { GameOps } from "../../domains/game/gameOperations";
import { GameStore } from "../../domains/game/gameStore";
import { Board } from "../Board";
import { Step } from "../Step";
import "./style.css";

export const Game = () => {
  const { allHistory, matrix, nextMark, winner } = useStore(
    [GameStore],
    getStore => {
      const store = getStore(GameStore);
      return {
        allHistory: store.allHistory,
        matrix: store.currenMatrix,
        nextMark: store.nextMark,
        winner: store.winner
      };
    }
  );
  const { executeOperation } = useFleurContext();
  const handleClickSquare = useCallback(
    (order: number) => executeOperation(GameOps.setMark, order, nextMark),
    [executeOperation, nextMark]
  );
  const handleClickStep = useCallback(
    (step: number) => executeOperation(GameOps.jumpTo, step),
    [executeOperation]
  );

  return (
    <div className="game">
      <div className="game-board">
        <Board matrix={matrix} onClick={handleClickSquare} />
      </div>

      <div className="game-info">
        <div>{winner ? `Winner: ${winner}` : `Next player: ${nextMark}`}</div>
        <ol>
          {allHistory.map((step, move) => {
            return (
              <li key={move}>
                <Step move={move} onClick={handleClickStep} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
