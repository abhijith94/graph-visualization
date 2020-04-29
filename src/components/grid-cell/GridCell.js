import React from "react";
import "./GridCell.scss";

const GridCell = (props) => {
  const {
    isWall,
    isPlayer,
    isTarget,
    visited,
    isWeight,
    shortestPath,
    mazeActive,
    i,
    j,
  } = props;

  let tileClass = [];
  if (isWall) {
    tileClass = "wall";
  } else if (isPlayer) {
    tileClass = "player";
  } else if (isTarget) {
    tileClass = "target";
  } else if (visited && !isWeight) {
    tileClass = "visited";
  } else if (visited && isWeight) {
    tileClass = "visited weight";
  } else if (shortestPath && !isWeight) {
    tileClass = "shortest-path";
  } else if (shortestPath && isWeight) {
    tileClass = "shortest-path weight";
  } else if (isWeight) {
    tileClass = "weight";
  } else {
    tileClass = "floor";
  }

  return (
    <td
      className={`${tileClass} ${!mazeActive ? "grid-border" : ""} grid-cell`}
      onClick={() => props.onCellClicked(i, j)}
    ></td>
  );
};

export default GridCell;
