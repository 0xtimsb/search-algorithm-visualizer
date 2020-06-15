import React from "react";
import styled from "styled-components";

const NodeStyled = styled.div.attrs((props) => {
  let nodeColor;
  if (props.isWall) {
    nodeColor = "#182836";
  } else if (props.isCurrent) {
    nodeColor = "#eea1ff";
  } else if (props.isStart) {
    nodeColor = "#9233ff";
  } else if (props.isPath) {
    nodeColor = "#9299ff";
  } else if (props.isEnd) {
    nodeColor = "#d6fc97";
  } else if (props.isVisited) {
    nodeColor = "#dabdff";
  } else {
    nodeColor = "#ffffff";
  }
  return {
    style: {
      border: `1px solid ${props.isWall ? "#182836" : "#eeeeee"}`,
      gridColumn: props.pos.j + 1,
      gridRow: props.pos.i + 1,
      background: nodeColor,
      transition: props.isCurrent ? `` : `background 1s, border 1s`,
    },
  };
})``;

export default class Node extends React.Component {
  render() {
    return (
      <NodeStyled
        pos={this.props.pos}
        isWall={this.props.isWall}
        isStart={this.props.isStart}
        isPath={this.props.isPath}
        isEnd={this.props.isEnd}
        isVisited={this.props.isVisited}
        isCurrent={this.props.isCurrent}
      ></NodeStyled>
    );
  }
}
