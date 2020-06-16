import React from "react";
import styled from "styled-components";

// #05f0dc  #0aa6f5

const NodeStyled = styled.div.attrs((props) => {
  let nodeColor;
  if (props.isWall) {
    nodeColor = "#182836";
  } else if (props.isCurrent) {
    nodeColor = "#87ffbc";
  } else if (props.isStart) {
    nodeColor = "#8e27e8";
  } else if (props.isPath) {
    nodeColor = "#45e68c";
  } else if (props.isEnd) {
    nodeColor = "#ff85b4";
  } else if (props.isVisited) {
    nodeColor = "#d6ffe8";
  } else {
    nodeColor = "#ffffff";
  }
  return {
    style: {
      gridColumn: props.pos.j + 1,
      gridRow: props.pos.i + 1,
      background: nodeColor,
      transition: props.isCurrent ? `` : `background 500ms`,
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
