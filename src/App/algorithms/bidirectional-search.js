let startPos;
let endPos = { j: undefined, i: undefined };
let animateList = [];

let giveBDS = (num, mat, start) => {
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
  let queue = [];
  currentNode.adjacentPos.forEach((pos) => {
    let adjNode = matrix[pos.j][pos.i];
    if (!adjNode.isVisited && !adjNode.isWall) {
      adjNode.parentPos = { ...currentNode.pos };
      queue.push(pos);
    }
  });
  animateList.push(JSON.parse(JSON.stringify(matrix)));
  while (queue.length !== 0) {
    let adjPos = queue.shift();
    if (queue.length !== 0) {
      while (adjPos.j === queue[0].j && adjPos.i === queue[0].i) {
        if (queue.length !== 0) {
          queue.shift();
        }
      }
    }
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
          queue.push(pos);
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

export default giveBDS;
