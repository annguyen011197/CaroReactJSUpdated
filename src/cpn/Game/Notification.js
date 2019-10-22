import React, { Component } from 'react';
import { Postion } from './Model';
import { connect } from 'react-redux';
import { revert } from '../../reducers/game/actions';

export class Notification extends Component {
  constructor(props) {
    super(props);
    this.index = -1;
  }
  pushHistory(value) {
    // const { history } = this.state;
    // let list = history;
    // if (this.index !== -1) {
    //   list = list.slice(0, this.index + 1);
    // }
    // list.push(
    //   new HistoryState(
    //     value.board,
    //     value.current,
    //     value.currentPostion,
    //     value.winner
    //   )
    // );
    // this.setState({
    //   history: list
    // });
  }

  clearHistory() {
    // this.setState({
    //   history: []
    // });
  }

  renderWiner(winner) {
    if (winner !== undefined) {
      return <p>{`Winner is ${winner.state}`}</p>;
    } else {
      return <div></div>;
    }
  }

  onClick(value, index) {
    const { onClick } = this.props;
    let state = {
      board: value.data,
      current: value.current,
      currentPostion: value.currentPostion,
      winner: value.winner
    };
    this.index = index;
    onClick(state, index);
  }

  renderHistory() {
    const { history } = this.props;

    // console.log(history)
    return history.map((value, index) => {
      if (value.data === undefined) return <div></div>;
      if (
        value.currentPostion === undefined ||
        !value.currentPostion instanceof Postion
      )
        return <div></div>;
      let data = value.data;
      let pos = value.currentPostion;
      let curr = (data[pos.y] || [])[pos.x] || '';
      return (
        <li key={index}>
          <button
            className="history"
            onClick={() => {
              this.props.revert(index);
            }}
          >{`${curr} moved on column ${pos.x} row ${pos.y}`}</button>
        </li>
      );
    });
  }

  render() {
    const { nextMove, winner } = this.props;
    return (
      <div>
        {this.renderWiner(winner)}
        <p>{`Next move: ${nextMove}`}</p>
        <ol>{this.renderHistory()} </ol>
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
  { revert }
)(Notification);
