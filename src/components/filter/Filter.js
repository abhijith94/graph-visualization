import React, { Component } from "react";
import { connect } from "react-redux";
import "./Filter.scss";
import { chooseAlg } from "../../redux/filter/filterActions";

export class Filter extends Component {
  render() {
    const { algorithms, chooseAlg } = this.props;

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
        <button className="visualize-btn" onClick={() => {}}>
          <span className="squirk">Visualize</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  algorithms: state.filter.algorithms,
  currentAlg: state.filter.currentAlg,
});

const mapDispatchToProps = (dispatch) => ({
  chooseAlg: (alg) => dispatch(chooseAlg(alg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
