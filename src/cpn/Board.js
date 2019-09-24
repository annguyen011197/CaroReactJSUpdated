import React, { Component } from 'react'
import Square from './Square';

export class Board extends Component {
    renderBoard(size) {
        const { onCellClick, data, highlightRange } = this.props
        let board = []
        for (var i = 0; i < size; i++) {
            board.push(<Row
                key={i}
                size={size}
                index={i}
                row={data[i]}
                onCellClick={onCellClick}
                highlightRange = {highlightRange}
            />)
        }
        return board
    }

    render() {
        const { size } = this.props
        return (
            <div>
                {this.renderBoard(size)}
            </div>
        )
    }
}

const Row = (props) => {
    const { size, index, row: data, onCellClick, highlightRange } = props;
    let isInRange = (x, y) => {
        return (highlightRange || []).find((value) => {
            return value.x === x && value.y === y
        }) !== undefined
    }
    let row = []
    for (var i = 0; i < size; i++) {
        let isHighLight = isInRange(i, index)
        row.push(
            <Square
                key={`${i}_${index}`}
                x={i}
                y={index}
                value={data[i]}
                isHighLight={isHighLight}
                onClick={(x,y) => onCellClick(x,y)}
            />
        )
    }
    return <div className="board-row">{row}</div>
}

export default Board;