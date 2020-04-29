import React, { Component } from "react";
import { connect } from "react-redux";
import GridCell from "../grid-cell/GridCell";
import Graph from "../../utils/Graph";
import Queue from "../../utils/Queue";
import Stack from "../../utils/Stack";
import Node from "../../utils/Node";
import PriorityQueue from "../../utils/PriorityQueue";
import {
  markCellVisited,
  markShortestPath,
  findPath,
  createGrid,
} from "../../redux/grid/gridActions";
import "./Grid.scss";

class Grid extends Component {
  state = {
    routing: false,
  };

  componentDidMount() {
    const { buildGrid } = this.props;
    buildGrid();
  }

  componentDidUpdate() {
    const {
      enableVisualizeButton,
      gridCells,
      playerPos,
      targetPos,
      currentAlg,
      markVisited,
      markSP,
      findPath,
    } = this.props;

    if (!enableVisualizeButton && !this.state.routing) {
      this.setState({ routing: true }, () => {
        switch (currentAlg) {
          case "Breadth First Search":
            this.bfs(
              gridCells,
              playerPos,
              targetPos,
              markVisited,
              markSP,
              findPath
            );
            break;

          case "Depth First Search":
            this.dfs(
              gridCells,
              playerPos,
              targetPos,
              markVisited,
              markSP,
              findPath
            );
            break;

          case "Dijkstra":
            this.dijkstra(
              gridCells,
              playerPos,
              targetPos,
              markVisited,
              markSP,
              findPath
            );
            break;

          default:
            break;
        }
      });
    }
  }

  bfs = async (
    gridCells,
    playerPos,
    targetPos,
    markVisited,
    markSP,
    findPath
  ) => {
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
      this.drawShortestPath(
        parent,
        playerId,
        targetId,
        cellIdPositionMap,
        markSP
      );
    }

    findPath();
    this.setState({ routing: false });
  };

  dfs = async (
    gridCells,
    playerPos,
    targetPos,
    markVisited,
    markSP,
    findPath
  ) => {
    let { graph, cellIdPositionMap } = this.initializeGraph(gridCells);
    let playerId = gridCells[playerPos.i][playerPos.j].id;
    let targetId = gridCells[targetPos.i][targetPos.j].id;

    let visited = new Set();
    let stack = new Stack();

    stack.push(new Node(playerId));
    visited.add(playerId);

    let targetFound = false;
    let parent = new Map();

    while (!stack.isEmpty()) {
      let node = stack.pop();
      let { i, j } = cellIdPositionMap.get(node.id);
      markVisited(i, j);
      await this.wait(5);

      let temp = graph.adjList.get(node.id).head;
      while (temp !== null) {
        if (!visited.has(temp.id)) {
          parent.set(temp.id, node.id);

          if (temp.id === targetId) {
            targetFound = true;
            break;
          }

          visited.add(temp.id);
          stack.push(temp);
        }
        temp = temp.next;
      }

      if (targetFound) {
        break;
      }
    }

    if (targetFound) {
      this.drawShortestPath(
        parent,
        playerId,
        targetId,
        cellIdPositionMap,
        markSP
      );
    }

    findPath();
    this.setState({ routing: false });
  };

  dijkstra = async (
    gridCells,
    playerPos,
    targetPos,
    markVisited,
    markSP,
    findPath
  ) => {
    let { graph, cellIdPositionMap } = this.initializeGraph(gridCells);
    let playerId = gridCells[playerPos.i][playerPos.j].id;
    let targetId = gridCells[targetPos.i][targetPos.j].id;

    let parent = new Map();
    let shortestDistance = new Map();

    let pq = new PriorityQueue();

    for (let i = 0; i < gridCells.length; i++) {
      for (let j = 0; j < gridCells[i].length; j++) {
        if (!gridCells[i][j].isWall) {
          pq.enqeue(new Node(gridCells[i][j].id, Infinity, i, j));
        }
      }
    }

    let targetFound = false;
    pq.decreaseKey(playerId, 0);

    while (!pq.isEmpty()) {
      let current = pq.dequeue();

      if (current.id === playerId) {
        shortestDistance.set(playerId, 0);
      } else if (current.id === targetId) {
        targetFound = true;
        break;
      } else {
        shortestDistance.set(current.id, current.weight);
      }

      let head = graph.adjList.get(current.id).head; //neighbours

      while (head !== null) {
        let totalWeight = shortestDistance.get(current.id) + head.weight;

        if (pq.containsKey(head.id) && pq.peek(head.id).weight > totalWeight) {
          pq.decreaseKey(head.id, totalWeight);
          parent.set(head.id, current.id);

          let { i, j } = cellIdPositionMap.get(head.id);
          markVisited(i, j);
          await this.wait(0);
        }

        head = head.next;
      }
    }

    if (targetFound) {
      this.drawShortestPath(
        parent,
        playerId,
        targetId,
        cellIdPositionMap,
        markSP
      );
    }

    findPath();
    this.setState({ routing: false });
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
              gridCells[i - 1][j].id,
              gridCells[i - 1][j].weight
            );
          }
          //right
          if (j + 1 <= gridCells[i].length - 1 && !gridCells[i][j + 1].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i][j + 1].id,
              gridCells[i][j + 1].weight
            );
          }
          //bottom
          if (i + 1 <= gridCells.length - 1 && !gridCells[i + 1][j].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i + 1][j].id,
              gridCells[i + 1][j].weight
            );
          }
          //left
          if (j - 1 >= 0 && !gridCells[i][j - 1].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i][j - 1].id,
              gridCells[i][j - 1].weight
            );
          }
        }
      }
    }
    return { graph, cellIdPositionMap };
  }

  drawShortestPath = async (
    parent,
    playerId,
    targetId,
    cellIdPositionMap,
    markSP
  ) => {
    let temp = targetId;
    console.log(playerId);
    while (temp !== playerId) {
      let parentId = parent.get(temp);

      let { i, j } = cellIdPositionMap.get(parentId);
      markSP(i, j);
      await this.wait(10);
      temp = parentId;
    }
  };

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
  enableVisualizeButton: state.grid.enableVisualizeButton,
  currentAlg: state.filter.currentAlg,
});

const mapDispatchToProps = (dispatch) => ({
  buildGrid: () => dispatch(createGrid()),
  markVisited: (i, j) => dispatch(markCellVisited(i, j)),
  markSP: (i, j) => dispatch(markShortestPath(i, j)),
  findPath: () => dispatch(findPath(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
