import React from "react";
import styled, { css } from "styled-components";

const NodeStyled = styled.div`
  grid-column: ${(props) => props.pos.j + 1};
  grid-row: ${(props) => props.pos.i + 1};
  ${(props) => {
    if (props.isGoal) {
      return css`
        background: #ddffdd;
      `;
    } else if (props.isVisited) {
      return css`
        background: #aaaaff;
      `;
    } else {
      return css`
        background: #ffffff;
      `;
    }
  }};
`;

export default class Node extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NodeStyled
        pos={this.props.pos}
        isVisited={this.props.isVisited}
        isGoal={this.props.isGoal}
      ></NodeStyled>
    );
  }
}
