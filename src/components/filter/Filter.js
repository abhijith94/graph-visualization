import React, { Component } from "react";
import { connect } from "react-redux";
import { chooseAlg } from "../../redux/filter/filterActions";
import { findPath } from "../../redux/grid/gridActions";
import "./Filter.scss";

export class Filter extends Component {
  render() {
    const { algorithms, chooseAlg, shouldFindPath, findPath } = this.props;

    return (
      <div className="filter">
        <select
          name="algorithm"
          className="form-control"
          onChange={(e) => chooseAlg(e.target.value)}
        >
          {algorithms.map((alg) => (
            <option value={alg} key={alg}>
              {alg}
            </option>
          ))}
        </select>
        <button
          className="visualize-btn"
          disabled={shouldFindPath}
          onClick={() => {
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
  shouldFindPath: state.grid.shouldFindPath,
});

const mapDispatchToProps = (dispatch) => ({
  chooseAlg: (alg) => dispatch(chooseAlg(alg)),
  findPath: () => dispatch(findPath(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
