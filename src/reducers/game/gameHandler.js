import { Winner, Postion } from '../../cpn/Game/Model';

function check2Head(data, current, startState, endState) {
  if (startState.isInSize(20) && endState.isInSize(20)) {
    let getValue = (data, state) => {
      return (data[state.y] || [])[state.x] || '';
    };
    let start = getValue(data, startState);
    let end = getValue(data, endState);
    if (start === '') return false;
    if (end === '') return false;
    if (start === end && start !== current) return true;
    else return false;
  }
  return false;
}

function checkBoard(data, startIndexCal, endIndexCal, nextStep, prevStep) {
  let currentState = '';
  let count = '';
  var startState = new Postion(-1, -1);
  var endState = new Postion(-1, -1);
  var startIndex = startIndexCal();
  var endIndex = endIndexCal();
  let currIndex = startIndex;
  let winner = new Winner(undefined);
  while (true) {
    let state = data[currIndex.y][currIndex.x];
    if (state !== '' && state !== undefined) {
      if (currentState !== state) {
        currentState = state;
        count = 1;
        startState = prevStep(currIndex);
        winner.startIndex = currIndex;
      } else {
        count++;
      }
      if (count === 5) {
        endState = nextStep(currIndex);
        winner.endIndex = currIndex;
        if (!check2Head(data, currentState, startState, endState)) {
          winner.state = currentState;
          return winner;
        }
      }
    }

    currIndex = nextStep(currIndex);
    if (
      (currIndex.x === endIndex.x && currIndex.y > endIndex.y) ||
      currIndex.x > endIndex.x
    ) {
      break;
    }
  }
  return undefined;
}

function checkWin(data, gameSize, currentPostion) {
  let col = currentPostion.x;
  let row = currentPostion.y;
  let realSize = gameSize - 1;
  //Row
  // console.log("Row")

  let checkRow = checkBoard(
    data,
    () => {
      return new Postion(0, row);
    },
    () => {
      return new Postion(realSize, row);
    },
    index => {
      return new Postion(index.x + 1, row);
    },
    index => {
      return new Postion(index.x - 1, row);
    }
  );
  if (checkRow !== undefined) return checkRow;

  //Column
  // console.log("Column")
  let checkCol = checkBoard(
    data,
    () => new Postion(col, 0),
    () => new Postion(col, realSize),
    index => new Postion(col, index.y + 1),
    index => new Postion(col, index.y - 1)
  );
  if (checkCol !== undefined) return checkCol;

  //LeftRightDown
  // console.log("LeftRightDown")
  let checkDown = checkBoard(
    data,
    () => {
      if (col > row) {
        return new Postion(col - row, 0);
      } else {
        return new Postion(0, row - col);
      }
    },
    () => {
      if (col > row) {
        return new Postion(realSize, row + realSize - col);
      } else {
        return new Postion(col + realSize - row, realSize);
      }
    },
    index => new Postion(index.x + 1, index.y + 1),
    index => new Postion(index.x - 1, index.y - 1)
  );
  if (checkDown !== undefined) return checkDown;

  //LeftRightUp
  // console.log("LeftRightUp")

  let checkUp = checkBoard(
    data,
    () => {
      if (row > realSize - col) {
        return new Postion(realSize - 1, col + row - realSize);
      } else {
        return new Postion(0, col + row);
      }
    },
    () => {
      if (row > realSize - col) {
        return new Postion(col + row - realSize, realSize - 1);
      } else {
        return new Postion(col + row, 0);
      }
    },
    index => new Postion(index.x + 1, index.y - 1),
    index => new Postion(index.x - 1, index.y + 1)
  );
  if (checkUp !== undefined) return checkUp;
  return undefined;
}

export default checkWin;
