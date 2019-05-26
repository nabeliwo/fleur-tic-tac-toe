import React, { useCallback } from "react";

import { Mark } from "../../domains/game/gameStore";
import "./style.css";

type Props = {
  order: number;
  value: Mark | null;
  onClick: (order: number) => void;
};

export const Square: React.FC<Props> = ({ order, value, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(order);
  }, [onClick, order]);

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
};
