import React from "react";
import styled from "styled-components";

const NodeStyled = styled.div.attrs((props) => ({
  style: {
    border: props.isWall ? `1px solid #182836` : `1px solid #dddddd`,
    gridColumn: props.pos.j + 1,
    gridRow: props.pos.i + 1,
    background: props.isWall ? `#182836` : `#ffffff`,
    transition: `background 1s, border 1s`,
  },
}))``;

export default class Node extends React.Component {
  render() {
    return (
      <NodeStyled pos={this.props.pos} isWall={this.props.isWall}></NodeStyled>
    );
  }
}
