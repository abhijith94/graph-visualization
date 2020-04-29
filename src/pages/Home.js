import React, { Component } from "react";
import { connect } from "react-redux";
import { createGrid, createMaze, addWeights } from "../redux/grid/gridActions";
import Grid from "../components/grid/Grid";
import Filter from "../components/filter/Filter";
import "./Home.scss";

class Home extends Component {
  componentDidMount() {}

  render() {
    const {
      createGrid,
      createMaze,
      enableVisualizeButton,
      addWeight,
    } = this.props;

    return (
      <div className="home">
        <div className="top">
          <div>
            <h1 className="title">Graph Visualizer</h1>
          </div>
          <div className="top-button-container">
            <div>
              <button
                disabled={!enableVisualizeButton}
                className="create-maze"
                onClick={() => {
                  createMaze();
                }}
              >
                <span className="squirk">Create Maze</span>
              </button>
            </div>
            <div>
              <button
                disabled={!enableVisualizeButton}
                className="create-weights"
                onClick={() => {
                  addWeight();
                }}
              >
                <span className="squirk">Add Weights</span>
              </button>
            </div>
            <div>
              <button
                disabled={!enableVisualizeButton}
                className="clear-board"
                onClick={() => {
                  createGrid();
                }}
              >
                <span className="squirk">Clear Board</span>
              </button>
            </div>
          </div>
        </div>
        <div className="middle"></div>
        <div className="bottom">
          <div className="filter-container">
            <Filter></Filter>
          </div>
          <div className="grid-container">
            <Grid></Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  enableVisualizeButton: state.grid.enableVisualizeButton,
});

const mapDispatchToProps = (dispatch) => ({
  createGrid: () => dispatch(createGrid()),
  createMaze: () => dispatch(createMaze()),
  addWeight: () => dispatch(addWeights()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
