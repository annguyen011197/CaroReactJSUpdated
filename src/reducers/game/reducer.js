import { Postion, HistoryState } from '../../cpn/Game/Model';
import { gameActions } from '../type';
import checkWin from './gameHandler';
import _ from 'lodash';

const initialState = {
  gameSize: 20,
  current: false,
  board: initBoard(20),
  currentPostion: new Postion(-1, -1),
  winner: undefined,
  historyIndex: 0,
  history: []
};

function initBoard(size) {
  return Array(size)
    .fill('')
    .map(() => Array(size).fill(''));
}

function onCellClicked(curr, payload) {
  const { board: data, current, winner, history, historyIndex } = curr;
  if (!payload) return curr;
  if (payload.col === undefined) return curr;
  if (payload.row === undefined) return curr;
  let row = payload.row;
  let col = payload.col;
  if (data[row][col] !== '' || winner !== undefined) return curr;
  data[row][col] = current ? 'x' : 'o';
  let position = new Postion(col, row);
  let newHistory = history;
  if (historyIndex > -1) {
    newHistory = newHistory.slice(0, historyIndex + 1);
  }
  let index = historyIndex + 1;
  let state = {
    board: data,
    current: !current,
    currentPostion: position,
    winner: winner,
    history: newHistory,
    historyIndex: index
  };

  return state;
}

function check(state) {
  let winner = checkWin(state.board, state.gameSize, state.currentPostion);
  if (!winner) return state;
  return {
    ...state,
    winner: winner
  };
}

function createHistory(state) {
  const { history } = state;
  if (!history) return state;
  history.push(
    new HistoryState(
      state.board,
      state.current,
      state.currentPostion,
      state.winner
    )
  );
  return { ...state, history };
}

function revert(state, payload) {
  const { history } = state;
  const { index } = payload;
  if (!history) return state;
  if (index === undefined || index < 0 || index > history.length) return state;
  let value = history[index];
  if (!value) return state;
  let newState = {
    board: value.data,
    current: value.current,
    currentPostion: value.currentPostion,
    winner: value.winner,
    historyIndex: index
  };
  return { ...state, ...newState };
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case gameActions.cellClicked:
      let checkCell = { ...state, ...onCellClicked(state, payload) };
      let history = { ...state, ...createHistory(checkCell) };
      let checkBoard = { ...state, ...check(history) };
      console.log(checkBoard);
      return checkBoard;
    case gameActions.revert:
      let revertValue = revert(state, payload);
      console.log(revertValue);
      return revertValue;
    case gameActions.retry:
      return {
        ...initialState,
        ...{
          board: initBoard(state.gameSize)
        }
      };
    default:
      return state;
  }
};
