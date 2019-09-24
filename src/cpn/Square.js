import React from 'react'

const Square = (props) => {
    const {onClick, value, x, y, isHighLight} = props
    let style = isHighLight ? {
        borderColor: 'red',
        borderWidth: 1,
        borderStyle: 'solid',
        margin:1 
    } : {}

    let outsideStype = isHighLight ? {

    } : {}
    return (
        <button onClick={()=>{
            // console.log(`Clicked on col${x} row${y}`)
            onClick(x,y)
        }} 
        className="square" 
        style={outsideStype}>
            <div style={style}>
            {value}
            </div>
        </button>
    )
}

export default Square;