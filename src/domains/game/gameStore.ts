import { listen, Store } from "@fleur/fleur";

import { GameActions } from "./gameActions";

export type Mark = "O" | "X";
export type Matrix = (Mark | null)[][];
type State = {
  history: Array<{ squares: Array<Mark | null> }>;
  xIsNext: boolean;
  step: number;
};

export class GameStore extends Store {
  static storeName = "GameStore";

  public state: State = {
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
    step: 0
  };

  public get allHistory() {
    return this.state.history;
  }

  public get currentHistory() {
    const { history, step } = this.state;
    return history.slice(0, step + 1);
  }

  public get currenMatrix() {
    const squares = this.getCurrentSquares();
    return [squares.slice(0, 3), squares.slice(3, 6), squares.slice(6, 9)];
  }

  public get nextMark() {
    const nextMark: Mark = this.state.xIsNext ? "X" : "O";
    return nextMark;
  }

  public get winner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    const squares = this.getCurrentSquares();

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }

  private getCurrentSquares = () => {
    const currentHistory = this.currentHistory;
    const { squares } = currentHistory[currentHistory.length - 1];
    return squares;
  };

  private handleSetMark = listen(GameActions.setMark, ({ order, mark }) => {
    if (this.winner) return;

    this.updateWith((draft: State) => {
      const currentHistory = this.currentHistory;
      const squares = this.getCurrentSquares().slice();
      squares[order] = mark;

      draft.history = currentHistory.concat([{ squares }]);
      draft.xIsNext = !draft.xIsNext;
      draft.step = currentHistory.length + 1;
    });
  });

  private handleJumpTo = listen(GameActions.jumpTo, ({ step }) => {
    this.updateWith((draft: State) => {
      draft.xIsNext = step % 2 === 0;
      draft.step = step;
    });
  });
}
