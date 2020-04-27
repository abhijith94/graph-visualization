import React, { Component } from "react";
import { connect } from "react-redux";
import GridCell from "../grid-cell/GridCell";
import Graph from "../../utils/Graph";
import Queue from "../../utils/Queue";
import Node from "../../utils/Node";
import "./Grid.scss";
import { markCellVisited } from "../../redux/grid/gridActions";

class Grid extends Component {
  state = {
    routing: false,
  };

  componentDidUpdate() {
    const {
      shouldFindPath,
      gridCells,
      playerPos,
      targetPos,
      currentAlg,
      markVisited,
    } = this.props;
    if (shouldFindPath && !this.state.routing) {
      this.setState({ routing: true }, () => {
        switch (currentAlg) {
          case "Breadth First Search":
            this.bfs(gridCells, playerPos, targetPos, markVisited);
            break;

          default:
            break;
        }
      });
    }
  }

  bfs = async (gridCells, playerPos, targetPos, markVisited) => {
    let { graph, cellIdPositionMap } = this.initializeGraph(gridCells);
    let playerId = gridCells[playerPos.i][playerPos.j].id;
    let targetId = gridCells[targetPos.i][targetPos.j].id;

    let visited = new Set();
    let queue = new Queue();

    queue.enquque(new Node(playerId));
    visited.add(playerId);

    let targetFound = false;
    let parent = new Map();

    while (!queue.isEmpty()) {
      let node = queue.dequeue();
      let temp = graph.adjList.get(node.id).head;
      while (temp !== null) {
        if (!visited.has(temp.id)) {
          parent.set(temp.id, node.id);

          let { i, j } = cellIdPositionMap.get(temp.id);
          markVisited(i, j);
          await this.wait(5);

          if (temp.id === targetId) {
            targetFound = true;
            break;
          }

          visited.add(temp.id);
          queue.enquque(temp);
        }
        temp = temp.next;
      }

      if (targetFound) {
        break;
      }
    }

    if (targetFound) {
    }

    console.log(graph, targetFound);
  };

  initializeGraph(gridCells) {
    let graph = new Graph();
    let cellIdPositionMap = new Map();

    for (let i = 0; i < gridCells.length; i++) {
      for (let j = 0; j < gridCells[i].length; j++) {
        if (!gridCells[i][j].isWall) {
          graph.createGraphVertex(gridCells[i][j].id);
          cellIdPositionMap.set(gridCells[i][j].id, { i, j });

          //get neighbours
          //up
          if (i - 1 >= 0 && !gridCells[i - 1][j].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i - 1][j].id
            );
          }
          //right
          if (j + 1 <= gridCells[i].length - 1 && !gridCells[i][j + 1].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i][j + 1].id
            );
          }
          //bottom
          if (i + 1 <= gridCells.length - 1 && !gridCells[i + 1][j].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i + 1][j].id
            );
          }
          //left
          if (j - 1 >= 0 && !gridCells[i][j - 1].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i][j - 1].id
            );
          }
        }
      }
    }
    return { graph, cellIdPositionMap };
  }

  wait = (microsecs) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), microsecs);
    });
  };

  render() {
    const { gridCells } = this.props;

    return (
      <table className="table">
        <tbody>
          {gridCells.map((row, i) => (
            <tr key={i}>
              {row.map((col, j) => (
                <GridCell key={j} {...col}></GridCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  gridCells: state.grid.gridCells,
  rows: state.grid.rows,
  columns: state.grid.columns,
  playerPos: state.grid.playerPos,
  targetPos: state.grid.targetPos,
  shouldFindPath: state.grid.shouldFindPath,
  currentAlg: state.filter.currentAlg,
});

const mapDispatchToProps = (dispatch) => ({
  markVisited: (i, j) => dispatch(markCellVisited(i, j)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
