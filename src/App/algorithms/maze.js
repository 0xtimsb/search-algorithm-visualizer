let n, matrix;
let animateList = [];

let giveMaze = (num, mat) => {
  matrix = mat;
  n = num;
  addBorderWalls();
  addMazeWalls(1, n - 2, 1, n - 2);
  return animateList;
};

let addBorderWalls = () => {
  let k = 0;
  for (let i = 0; i < n; i++) {
    animateList.push({ ...matrix[k][i], isWall: true });
  }
  k = n - 1;
  for (let i = 1; i < n; i++) {
    animateList.push({ ...matrix[i][k], isWall: true });
  }
  k = n - 1;
  for (let i = n - 2; i >= 0; i--) {
    animateList.push({ ...matrix[k][i], isWall: true });
  }
  k = 0;
  for (let i = n - 2; i > 0; i--) {
    animateList.push({ ...matrix[i][k], isWall: true });
  }
};

let addMazeWalls = (up, down, left, right) => {
  // up, down, left, right are always odd.
  if (down - up < 2 || right - left < 2) {
    return;
  }
  let ri = giveRandomInset(up, down); // Gives even
  let rj = giveRandomInset(left, right); // Gives even
  let randomSpacer = giveRandomOutset(up, ri - 1);
  for (let i = up; i < ri; i++) {
    if (i !== randomSpacer) {
      animateList.push({ ...matrix[rj][i], isWall: true });
    }
  }
  animateList.push({ ...matrix[rj][ri], isWall: true });
  randomSpacer = giveRandomOutset(ri + 1, down);
  for (let i = ri + 1; i <= down; i++) {
    if (i !== randomSpacer) {
      animateList.push({ ...matrix[rj][i], isWall: true });
    }
  }
  randomSpacer = giveRandomOutset(left, rj - 1);
  for (let j = left; j < rj; j++) {
    if (j !== randomSpacer) {
      animateList.push({ ...matrix[j][ri], isWall: true });
    }
  }
  randomSpacer = giveRandomOutset(rj + 1, right);
  for (let j = rj + 1; j <= right; j++) {
    if (j !== randomSpacer) {
      animateList.push({ ...matrix[j][ri], isWall: true });
    }
  }
  // Time for partition!!!
  addMazeWalls(up, ri - 1, left, rj - 1);
  addMazeWalls(up, ri - 1, rj + 1, right);
  addMazeWalls(ri + 1, down, left, rj - 1);
  addMazeWalls(ri + 1, down, rj + 1, right);
};

let giveRandomOutset = (l, h) => {
  // l and h will be odd always. // Gives l, l + 2, ...., h - 2, h.
  return Math.floor(Math.random() * ((h - l) / 2 + 1)) * 2 + l;
};

let giveRandomInset = (l, h) => {
  // l and h will be odd always. // Gives l + 1, l + 3, ...., h - 3, h - 1.
  return (Math.floor((Math.random() * (h - l)) / 2) + 1) * 2 + l - 1;
};

export default giveMaze;
