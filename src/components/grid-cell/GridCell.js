import React from "react";
import "./GridCell.scss";

const GridCell = (props) => {
  const { isWall, isPlayer, isTarget, visited } = props;

  let tileClass = [];
  if (isWall) {
    tileClass = "wall";
  } else if (isPlayer) {
    tileClass = "player";
  } else if (isTarget) {
    tileClass = "target";
  } else if (visited) {
    tileClass = "visited";
  } else {
    tileClass = "floor";
  }

  return <td className={`${tileClass} grid-cell`}></td>;
};

export default GridCell;
