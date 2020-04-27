import React, { Component } from "react";
import { connect } from "react-redux";
import GridCell from "../grid-cell/GridCell";
import "./Grid.scss";

class Grid extends Component {
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
});

export default connect(mapStateToProps)(Grid);
