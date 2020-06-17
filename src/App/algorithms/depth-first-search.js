let startPos;
let endPos = { j: undefined, i: undefined };
let animateList = [];

let giveDFS = (num, mat, start) => {
  let matrix = JSON.parse(JSON.stringify(mat));
  startPos = start;
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
  let stack = [];
  currentNode.adjacentPos.forEach((pos) => {
    let adjNode = matrix[pos.j][pos.i];
    if (!adjNode.isVisited && !adjNode.isWall) {
      adjNode.parentPos = { ...currentNode.pos };
      stack.push(pos);
    }
  });
  animateList.push(JSON.parse(JSON.stringify(matrix)));
  while (stack.length !== 0) {
    let adjPos = stack.pop();
    currentNode = matrix[adjPos.j][adjPos.i];
    if (currentNode.isEnd) {
      endPos = { ...currentNode.pos };
      console.log("Got it.");
      return true;
    } else {
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
          stack.push(pos);
        }
      });
    }
  }
  console.log("Task Failed");
  return false;
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

export default giveDFS;
