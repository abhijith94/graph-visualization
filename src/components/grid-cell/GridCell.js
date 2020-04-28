import React from "react";
import "./GridCell.scss";

const GridCell = (props) => {
  const {
    isWall,
    isPlayer,
    isTarget,
    visited,
    shortestPath,
    mazeActive,
  } = props;

  let tileClass = [];
  if (isWall) {
    tileClass = "wall";
  } else if (isPlayer) {
    tileClass = "player";
  } else if (isTarget) {
    tileClass = "target";
  } else if (visited) {
    tileClass = "visited";
  } else if (shortestPath) {
    tileClass = "shortest-path";
  } else {
    tileClass = "floor";
  }

  return (
    <td
      className={`${tileClass} ${!mazeActive ? "grid-border" : ""} grid-cell`}
    ></td>
  );
};

export default GridCell;
