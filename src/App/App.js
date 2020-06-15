import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Node from "./components/Node";

import giveMaze from "./algorithms/maze";
import giveDFS from "./algorithms/dfs";

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
  n = 21; // Must be an odd number.
  animateList = [];

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
          adjacentPos: [],
          parentPos: { j: undefined, i: undefined },
          isWall: false,
          isVisited: false,
          isStart: false,
          isEnd: false,
          isCurrent: false,
          isPath: false,
        });
      }
    }
    for (let j = 0; j < this.n; j++) {
      for (let i = 0; i < this.n; i++) {
        let currentNode = matrix[j][i];
        if (j + 1 < this.n) {
          currentNode.adjacentPos.push({ j: j + 1, i });
        }
        if (j - 1 >= 0) {
          currentNode.adjacentPos.push({ j: j - 1, i });
        }
        if (i + 1 < this.n) {
          currentNode.adjacentPos.push({ j, i: i + 1 });
        }
        if (i - 1 >= 0) {
          currentNode.adjacentPos.push({ j, i: i - 1 });
        }
      }
    }
    this.setState({ matrix }, () => {
      let mazeRenderList = giveMaze(this.n, this.state.matrix);
      let newMatrix = JSON.parse(JSON.stringify(this.state.matrix));
      while (mazeRenderList.length !== 0) {
        let item = mazeRenderList.shift();
        newMatrix[item.pos.j][item.pos.i] = item;
      }
      newMatrix[1][1].isStart = true;
      newMatrix[this.n - 2][this.n - 2].isEnd = true;
      this.setState({ matrix: newMatrix }, () => {
        this.animateList.push(
          ...giveDFS(this.n, this.state.matrix, { j: 1, i: 1 })
        );
        this.animateMatrix(newMatrix);
      });
    });
  }

  animateMatrix = (matrix) => {
    if (this.animateList.length !== 0) {
      this.setState({ matrix: this.animateList.shift() }, () => {
        window.requestAnimationFrame(() => this.animateMatrix(matrix));
      });
    }
  };

  render() {
    return (
      <AppStyled>
        <BoardStyled>
          {this.state.matrix.map((rows) =>
            rows.map((node) => (
              <Node
                key={node.key}
                pos={node.pos}
                isWall={node.isWall}
                isStart={node.isStart}
                isPath={node.isPath}
                isEnd={node.isEnd}
                isVisited={node.isVisited}
                isCurrent={node.isCurrent}
              ></Node>
            ))
          )}
        </BoardStyled>
      </AppStyled>
    );
  }
}

export default App;
