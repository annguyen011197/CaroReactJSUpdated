import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import Notification from './Notification';
import { cellClicked, retry } from '../../reducers/game/actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.size = 20;
    this.onCellClick = this.onCellClick.bind(this);
    this.onRetry = this.onRetry.bind(this);
    this.getWinnerRange = this.getWinnerRange.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  onCellClick(col, row) {
    this.props.cellClicked(col, row);
  }

  onRetry() {
    this.props.retry();
  }

  getWinnerRange() {
    const { winner } = this.props;
    return winner !== undefined ? winner.calRange() : [];
  }

  jumpTo(state) {
    this.setState(state);
  }

  render() {
    const { board, current, winner } = this.props;
    return (
      <div className="game">
        <div>
          <Board
            size={this.size}
            data={board}
            highlightRange={this.getWinnerRange()}
            onCellClick={this.onCellClick}
          />
          <button className="retry" onClick={this.onRetry}>
            Retry
          </button>
        </div>
        <div className="game-info">
          <Notification
            ref={this.notification}
            nextMove={current ? 'x' : 'o'}
            winner={winner}
            onClick={this.jumpTo}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const game = state.game;
  return {
    board: game.board,
    currentPostion: game.currentPostion,
    history: game.history,
    winner: game.winner
  };
}

export default connect(
  mapStateToProps,
  {
    cellClicked,
    retry
  }
)(Game);
