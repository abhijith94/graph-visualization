import React, { Component } from "react";
import { connect } from "react-redux";
import { createGrid, createMaze, addWeights } from "../redux/grid/gridActions";
import Grid from "../components/grid/Grid";
import Filter from "../components/filter/Filter";
import Tutorial from "../components/tutorial/Tutorial";
import Legend from "../components/legend/Legend";
import idea from "../assets/buttons/idea.png";
import { openModal } from "../redux/modal/ModalActions";
import "./Home.scss";

class Home extends Component {
  componentDidMount() {}

  render() {
    const {
      createGrid,
      createMaze,
      enableVisualizeButton,
      addWeight,
      algorithms,
      currentAlg,
      modalOpen,
      modalActive,
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
                  createGrid();
                  createMaze();
                }}
              >
                <span className="squirk">Create Maze</span>
              </button>
            </div>
            <div>
              <button
                disabled={
                  !enableVisualizeButton ||
                  algorithms[currentAlg].type === "unweighted"
                }
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
          <div style={{ width: "20%", height: "fit-content" }}>
            <div className="filter-container">
              <Filter></Filter>
            </div>
            <div className="show-tutorial">
              <button
                onClick={() =>
                  modalOpen(
                    <div
                      style={{
                        backgroundColor: "#2f2f2f",
                        border: "5px solid white",
                        borderRadius: "40px",
                      }}
                    >
                      <Tutorial></Tutorial>
                    </div>
                  )
                }
              >
                <img src={idea} alt="idea" className="idea-icon" /> Show
                Tutorial
              </button>
            </div>
            {!modalActive ? (
              <div className="tutorial-container">
                <Tutorial></Tutorial>
              </div>
            ) : null}
          </div>
          <div className="grid-container-parent">
            <div className="grid-container">
              <Grid></Grid>
            </div>
            <div>
              <Legend></Legend>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  enableVisualizeButton: state.grid.enableVisualizeButton,
  algorithms: state.filter.algorithms,
  currentAlg: state.filter.currentAlg,
  modalActive: state.modal.active,
});

const mapDispatchToProps = (dispatch) => ({
  createGrid: () => dispatch(createGrid()),
  createMaze: () => dispatch(createMaze()),
  addWeight: () => dispatch(addWeights()),
  modalOpen: (body) => dispatch(openModal(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
