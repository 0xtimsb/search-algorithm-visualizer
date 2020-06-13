import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Node from "./components/Node";

const AppStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoardStyled = styled.div`
  box-shadow: 0px 0px 30px 2px #777777;
  width: 40rem;
  height: 40rem;
  display: grid;
  border-radius: 2px;
`;

class App extends React.Component {
  n = 17; // Must be odd

  constructor(props) {
    super(props);
    this.state = {
      matrix: [],
    };
  }

  componentDidMount() {
    let matrix = [];
    for (let j = 0; j < this.n; j++) {
      matrix.push([]);
      for (let i = 0; i < this.n; i++) {
        matrix[j].push({
          key: uuid(),
          pos: { j, i },
          isWall: false,
        });
      }
    }
    this.setState({ matrix }, () => {
      this.makeBorderWalls();
      this.makeMaze(1, this.n - 2, 1, this.n - 2);
      let matrix = JSON.parse(JSON.stringify(this.state.matrix));
      this.renderMaze(matrix);
    });
  }

  renderList = [];

  makeBorderWalls = () => {
    let k = 0;
    for (let i = 0; i < this.n; i++) {
      this.renderList.push({ ...this.state.matrix[k][i], isWall: true });
    }
    k = this.n - 1;
    for (let i = 1; i < this.n; i++) {
      this.renderList.push({ ...this.state.matrix[i][k], isWall: true });
    }
    k = this.n - 1;
    for (let i = this.n - 2; i >= 0; i--) {
      this.renderList.push({ ...this.state.matrix[k][i], isWall: true });
    }
    k = 0;
    for (let i = this.n - 2; i > 0; i--) {
      this.renderList.push({ ...this.state.matrix[i][k], isWall: true });
    }
  };

  makeMaze = (up, down, left, right) => {
    // up, down, left, right are always odd.
    if (down - up < 2 || right - left < 2) {
      return;
    }
    let ri = this.giveRandomInset(up, down); // Gives even
    let rj = this.giveRandomInset(left, right); // Gives even
    let randomSpacer = this.giveRandomOutset(up, ri - 1);
    for (let i = up; i < ri; i++) {
      if (i !== randomSpacer) {
        this.renderList.push({ ...this.state.matrix[rj][i], isWall: true });
      }
    }
    this.renderList.push({ ...this.state.matrix[rj][ri], isWall: true });
    randomSpacer = this.giveRandomOutset(ri + 1, down);
    for (let i = ri + 1; i <= down; i++) {
      if (i !== randomSpacer) {
        this.renderList.push({ ...this.state.matrix[rj][i], isWall: true });
      }
    }
    randomSpacer = this.giveRandomOutset(left, rj - 1);
    for (let j = left; j < rj; j++) {
      if (j !== randomSpacer) {
        this.renderList.push({ ...this.state.matrix[j][ri], isWall: true });
      }
    }
    randomSpacer = this.giveRandomOutset(rj + 1, right);
    for (let j = rj + 1; j <= right; j++) {
      if (j !== randomSpacer) {
        this.renderList.push({ ...this.state.matrix[j][ri], isWall: true });
      }
    }
    // Time for partition!!!
    this.makeMaze(up, ri - 1, left, rj - 1);
    this.makeMaze(up, ri - 1, rj + 1, right);
    this.makeMaze(ri + 1, down, left, rj - 1);
    this.makeMaze(ri + 1, down, rj + 1, right);
  };

  giveRandomOutset = (l, h) => {
    // l and h will be odd always. // Gives l, l + 2, ...., h - 2, h.
    return Math.floor(Math.random() * ((h - l) / 2 + 1)) * 2 + l;
  };

  giveRandomInset = (l, h) => {
    // l and h will be odd always. // Gives l + 1, l + 3, ...., h - 3, h - 1.
    return (Math.floor((Math.random() * (h - l)) / 2) + 1) * 2 + l - 1;
  };

  renderMaze = (matrix) => {
    if (this.renderList.length !== 0) {
      let renderItem = this.renderList.shift();
      matrix[renderItem.pos.j][renderItem.pos.i] = renderItem;
      this.setState({ matrix }, () => {
        window.requestAnimationFrame(() => this.renderMaze(matrix));
      });
    }
  };

  render() {
    return (
      <AppStyled>
        <BoardStyled>
          {this.state.matrix.map((rows) =>
            rows.map((node) => (
              <Node key={node.key} pos={node.pos} isWall={node.isWall}></Node>
            ))
          )}
        </BoardStyled>
      </AppStyled>
    );
  }
}

export default App;
