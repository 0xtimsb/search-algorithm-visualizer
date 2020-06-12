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
  background: #efefef;
  box-shadow: 0px 0px 20px 5px #e1e1e1;
  width: 650px;
  height: 650px;
  grid-gap: 2px;
  padding: 2px;
  display: grid;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 15,
      matrix: [],
    };
  }

  componentDidMount() {
    this.setState((prev, props) => {
      let newMatrix = [];
      for (let j = 0; j < prev.n; j++) {
        newMatrix.push([]);
        for (let i = 0; i < prev.n; i++) {
          let newNode = {
            key: uuid(),
            pos: { j, i },
            isGoal: false,
            isVisited: false,
          };
          newMatrix[j].push(newNode);
        }
      }
      newMatrix[0][0].isVisited = true;
      newMatrix[prev.n - 1][prev.n - 1].isGoal = true;
      return { matrix: newMatrix };
    });
  }

  render() {
    return (
      <AppStyled>
        <BoardStyled>
          {this.state.matrix.map((rows) =>
            rows.map((node) => (
              <Node
                key={node.key}
                pos={node.pos}
                isVisited={node.isVisited}
                isGoal={node.isGoal}
              ></Node>
            ))
          )}
        </BoardStyled>
      </AppStyled>
    );
  }
}

export default App;
