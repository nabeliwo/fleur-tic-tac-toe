import React, { useCallback } from "react";

type Props = {
  move: number;
  onClick: (move: number) => void;
};

export const Step: React.FC<Props> = ({ move, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(move);
  }, [onClick, move]);

  return (
    <button onClick={handleClick}>
      {move ? `Go to move #${move}` : "Go to game start"}
    </button>
  );
};
