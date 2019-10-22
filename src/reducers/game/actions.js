import { gameActions } from '../type';

export function cellClicked(col, row) {
  return {
    type: gameActions.cellClicked,
    payload: {
      col,
      row
    }
  };
}

export function checkWin() {
  return {
    type: gameActions.checkWin
  };
}

export function revert(index) {
  return {
    type: gameActions.revert,
    payload: { index }
  };
}

export function retry() {
  return {
    type: gameActions.retry
  };
}
