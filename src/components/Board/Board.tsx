import * as React from "react";

import { Matrix } from "../../domains/game/gameStore";
import { Square } from "../Square";
import "./style.css";

type Props = {
  matrix: Matrix;
  onClick: (order: number) => void;
};

export const Board: React.FC<Props> = ({ matrix, onClick }) => (
  <div>
    {matrix.map((row, i) => (
      <div className="board-row" key={`row-${i}`}>
        {row.map((mark, j) => (
          <Square
            key={`col-${i}-${j}`}
            order={i * 3 + j}
            value={mark}
            onClick={onClick}
          />
        ))}
      </div>
    ))}
  </div>
);
