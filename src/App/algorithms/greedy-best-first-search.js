import PriorityQueue from "./data-structures/priority-queue";

let startPos, endPos;
let animateList = [];

let giveGBFS = (mat, start, end) => {
  let matrix = JSON.parse(JSON.stringify(mat));
  startPos = start;
  endPos = end;
  if (searchPath(matrix)) {
    tracePath(matrix);
  }
  return animateList;
};

let searchPath = (matrix) => {
  let currentNode = matrix[startPos.j][startPos.i];
  if (currentNode.isEnd || currentNode.isWall) {
    return false;
  }
  currentNode.isVisited = true;
  let pq = new PriorityQueue((a, b) => manhattenDist(a) < manhattenDist(b));
  currentNode.adjacentPos.forEach((pos) => {
    let adjNode = matrix[pos.j][pos.i];
    if (!adjNode.isVisited && !adjNode.isWall) {
      adjNode.parentPos = { ...currentNode.pos };
      pq.push({ ...pos });
    }
  });
  animateList.push(JSON.parse(JSON.stringify(matrix)));
  while (pq.size() !== 0) {
    let adjPos = pq.pop();
    currentNode = matrix[adjPos.j][adjPos.i];
    if (currentNode.isEnd) {
      endPos = { ...currentNode.pos };
      console.log("Got it.");
      return true;
    } else if (!currentNode.isVisited) {
      currentNode.isVisited = true;
      currentNode.isCurrent = true;
      animateList.push(JSON.parse(JSON.stringify(matrix)));
      currentNode.isCurrent = false;
      animateList.push(JSON.parse(JSON.stringify(matrix)));
      let currentPos = { ...currentNode.pos };
      currentNode.adjacentPos.forEach((pos) => {
        let adjNode = matrix[pos.j][pos.i];
        if (!adjNode.isVisited && !adjNode.isWall) {
          adjNode.parentPos = currentPos;
          pq.push({ ...pos });
        }
      });
    }
  }
  console.log("Task Failed");
  return false;
};

let manhattenDist = (node) => {
  return Math.abs(endPos.j - node.j) + Math.abs(endPos.i - node.i);
};

let tracePath = (matrix) => {
  let path = [];
  let currentPos = matrix[endPos.j][endPos.i].parentPos;
  while (currentPos.j !== startPos.j || currentPos.i !== startPos.i) {
    path.push({ ...currentPos });
    currentPos = { ...matrix[currentPos.j][currentPos.i].parentPos };
  }
  while (path.length !== 0) {
    let pathPos = path.pop();
    matrix[pathPos.j][pathPos.i].isPath = true;
    animateList.push(JSON.parse(JSON.stringify(matrix)));
  }
};

export default giveGBFS;
