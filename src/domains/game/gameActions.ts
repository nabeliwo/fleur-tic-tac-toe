import { actions, action } from "@fleur/fleur";

import { Mark } from "./gameStore";

export const GameActions = actions("GameAction", {
  setMark: action<{ order: number; mark: Mark }>(),
  jumpTo: action<{ step: number }>()
});
