import React from "react";
import "./GridCell.scss";

const GridCell = (props) => {
  const { isWall, isPlayer, isTarget } = props;

  let tileClass = [];
  if (isWall) {
    tileClass = "wall";
  } else if (isPlayer) {
    console.log("playa");
    tileClass = "player";
  } else if (isTarget) {
    tileClass = "target";
  } else {
    tileClass = "floor";
  }

  return <td className={`${tileClass} grid-cell`}></td>;
};

export default GridCell;
