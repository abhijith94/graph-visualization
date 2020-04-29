import React, { Component } from "react";
import { connect } from "react-redux";
import { chooseAlg } from "../../redux/filter/filterActions";
import { findPath, resetVisitedAndSP } from "../../redux/grid/gridActions";
import "./Filter.scss";

export class Filter extends Component {
  render() {
    const {
      algorithms,
      chooseAlg,
      enableVisualizeButton,
      findPath,
      resetVisitedAndSPCells,
    } = this.props;

    return (
      <div className="filter">
        <h3 className="title">Select Algorithm:</h3>
        <select
          name="algorithm"
          className="form-control"
          onChange={(e) => chooseAlg(e.target.value)}
          disabled={!enableVisualizeButton}
        >
          {algorithms.map((alg) => (
            <option value={alg} key={alg}>
              {alg}
            </option>
          ))}
        </select>
        <button
          className="visualize-btn"
          disabled={!enableVisualizeButton}
          onClick={() => {
            resetVisitedAndSPCells();
            findPath();
          }}
        >
          <span className="squirk">Visualize</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  algorithms: state.filter.algorithms,
  currentAlg: state.filter.currentAlg,
  enableVisualizeButton: state.grid.enableVisualizeButton,
});

const mapDispatchToProps = (dispatch) => ({
  chooseAlg: (alg) => dispatch(chooseAlg(alg)),
  findPath: () => dispatch(findPath(false)),
  resetVisitedAndSPCells: () => dispatch(resetVisitedAndSP()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
