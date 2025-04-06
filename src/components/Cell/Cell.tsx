import React from "react";

interface CellProps {
  row: number;
  column: number;
  isOpen: boolean;
  onClick: (params: { row: number; column: number }) => void;
}

export const Cell = ({ row, column, isOpen, onClick }: CellProps) => {
  return (
    <button onClick={() => onClick({ row, column })} disabled={isOpen}></button>
  );
};
