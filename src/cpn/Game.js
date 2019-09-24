import React, { Component } from 'react'
import Board from './Board';
import Notification from './Notification';
import {Winner, Postion} from './Model';

export class Game extends Component {
    constructor(props) {
        super(props)
        this.size = 20
        this.state = {
            current: false,
            board: this.initBoard(this.size),
            currentPostion: new Postion(-1, -1),
            history: []
        }
        this.notification = React.createRef()
        this.onCellClick = this.onCellClick.bind(this)
        this.onRetry = this.onRetry.bind(this)
        this.getWinnerRange = this.getWinnerRange.bind(this)
        this.jumpTo = this.jumpTo.bind(this)
    }

    onCellClick(col, row) {
        const { board: data, current, winner } = this.state;
        if (data[row][col] !== "" || winner !== undefined) return
        data[row][col] = current ? "x" : "o"
        let position = new Postion(col, row)
        let state = {
            board:  data, 
            current: !current,
            currentPostion: position,
            winner: winner
        }
        this.notification.current.pushHistory(state)
        this.setState(state, () => {
            let winner = this.checkWin()
            if (winner !== undefined) {
                this.setState({
                    winner: winner
                })
            }
        })
    }

    check2Head(data, current, startState, endState) {
        if (startState.isInSize(20) && endState.isInSize(20)) {
            let getValue = (data, state) => {
                return (data[state.y] || [])[state.x] || ""
            } 
            let start = getValue(data, startState)
            let end =  getValue(data, endState)
            if (start === "") return false
            if (end === "") return false
            if (start === end && start !== current) return true
            else return false
        }
        return false
    }

    checkBoard(data, startIndexCal, endIndexCal, nextStep, prevStep) {
        let currentState = ""
        let count = ""
        var startState = new Postion(-1, -1)
        var endState = new Postion(-1, -1)
        var startIndex = startIndexCal()
        var endIndex = endIndexCal()
        let currIndex = startIndex
        let winner = new Winner(undefined)
        while (true) {
            let state = data[currIndex.y][currIndex.x]
            if (state !== "" && state !== undefined) {
                if (currentState !== state) {
                    currentState = state
                    count = 1
                    startState = prevStep(currIndex)
                    winner.startIndex = currIndex
                } else {
                    count++
                }
                if (count === 5) {
                    endState = nextStep(currIndex)
                    winner.endIndex = currIndex
                    if (!this.check2Head(data, currentState, startState, endState)) {
                        winner.state = currentState
                        return winner
                    }
                }
            }

            currIndex = nextStep(currIndex)
            if ((currIndex.x === endIndex.x && currIndex.y > endIndex.y)
                || currIndex.x > endIndex.x) {
                break
            }
        }
        return undefined
    }

    checkWin() {
        const { board: data, currentPostion } = this.state
        let col = currentPostion.x
        let row = currentPostion.y
        let realSize = this.size - 1
        //Row
        // console.log("Row")

        let checkRow = this.checkBoard(data, () => {
            return new Postion(0, row)
        }, () => {
            return new Postion(realSize, row)
        }, (index) => {
            return new Postion(index.x + 1, row)
        }, (index) => {
            return new Postion(index.x - 1, row)
        })
        if (checkRow !== undefined) return checkRow

        //Column
        // console.log("Column")
        let checkCol = this.checkBoard(data, 
            () => new Postion(col, 0), 
            () => new Postion(col, realSize),
            (index) => new Postion(col, index.y + 1),
            (index) => new Postion(col, index.y - 1))
        if (checkCol !== undefined) return checkCol

        //LeftRightDown
        // console.log("LeftRightDown")
        let checkDown = this.checkBoard(data, () => {
            if (col > row) {
                return new Postion(col - row, 0)
            } else {
                return new Postion(0, row - col)
            }
        }, () => {
            if (col > row) {
                return new Postion(realSize, row + realSize - col)
            } else {
                return new Postion(col + realSize - row, realSize)
            }
        }, 
        (index) => new Postion(index.x + 1, index.y + 1), 
        (index) => new Postion(index.x - 1, index.y - 1))
        if (checkDown !== undefined) return checkDown

        //LeftRightUp
        // console.log("LeftRightUp")

        let checkUp = this.checkBoard(data, () => {
            if (row > realSize - col) {
                return new Postion(realSize - 1, col + row - realSize)
            } else {
                return new Postion(0, col + row)
            }
        }, () => {
            if (row > realSize - col) {
                return new Postion(col + row - realSize, realSize - 1)
            } else {
                return new Postion(col + row, 0)
            }
        }, 
        (index) => new Postion(index.x + 1, index.y - 1), 
        (index) => new Postion(index.x - 1, index.y + 1))
        if (checkUp !== undefined) return checkUp
        return undefined
    }

    onRetry() {
        this.setState({
            current: false,
            board: this.initBoard(this.size),
            currentPostion: new Postion(-1, -1),
            winner: undefined
        })
        this.notification.current.clearHistory()
    }

    initBoard(size) {
        return Array(size).fill("").map(() => Array(size).fill(""))
    }

    getWinnerRange() {
        const { winner } = this.state;
        return winner !== undefined ? winner.calRange() : []
    }

    jumpTo(state) {
        this.setState(state)
    }

    render() {
        const { board, current, winner } = this.state;
        return (
            <div className="game">
                <div>
                    <Board
                        size={this.size}
                        data={board}
                        highlightRange={this.getWinnerRange()}
                        onCellClick={this.onCellClick}
                    />
                    <button className="retry"
                        onClick={this.onRetry}
                    >
                        Retry
                    </button>
                </div>
                <div className="game-info">
                    <Notification
                        ref={this.notification}
                        nextMove={current ? "x" : "o"}
                        winner={winner}
                        onClick={this.jumpTo}
                    />
                </div>
            </div>
        )
    }
}


export default Game
