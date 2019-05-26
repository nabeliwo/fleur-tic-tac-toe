import { operations } from "@fleur/fleur";

import { GameActions } from "./gameActions";
import { Mark } from "./gameStore";

export const GameOps = operations({
  async setMark({ dispatch }, order: number, mark: Mark) {
    dispatch(GameActions.setMark, { order, mark });
  },

  async jumpTo({ dispatch }, step: number) {
    dispatch(GameActions.jumpTo, { step });
  }
});
