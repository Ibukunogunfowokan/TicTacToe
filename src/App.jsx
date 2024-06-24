import { useState } from "react";

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const currentSquare = history[history.length -1] 
  const [isXnext, setIsXnext] = useState(true);

  const handleOnplay = (newSquare)=>{
    setHistory([...history, newSquare]);
    setIsXnext(!isXnext);
    console.log("history",history)
    
  }

  function Square({ value, handleClick }) {
    return (
      <button className="square" onClick={handleClick}>
        {value}
      </button>
    );
  }

  function Board({squareBox, isXnext, handleClick}) {
    
    const winner = calculateWinner(squareBox);
    
    let status ;
    if(winner){
      status = `The winner is ${winner}`
      
    }else{
        status = `Next player: ${(isXnext ? 'X' : 'O')}`
    }

    const handleOnsquareClick = (i) => {

      let newSquare = squareBox
     

      if (newSquare[i] || calculateWinner(squareBox)) {
        return;
      }
      if (isXnext) {
        newSquare[i] = "X";
      } else {
        newSquare[i] = "O";
      }
      handleClick(newSquare)
      
    };

    return (
      <>
      <div>{status}</div>
        <div className="board-row">
          <Square
            value={squareBox[0]}
            handleClick={() => {
              handleOnsquareClick(0);
            }}
          />
          <Square
            value={squareBox[1]}
            handleClick={() => {
              handleOnsquareClick(1);
            }}
          />
          <Square
            value={squareBox[2]}
            handleClick={() => {
              handleOnsquareClick(2);
            }}
          />
        </div>
        <div className="board-row">
          <Square
            value={squareBox[3]}
            handleClick={() => {
              handleOnsquareClick(3);
            }}
          />
          <Square
            value={squareBox[4]}
            handleClick={() => {
              handleOnsquareClick(4);
            }}
          />
          <Square
            value={squareBox[5]}
            handleClick={() => {
              handleOnsquareClick(5);
            }}
          />
        </div>
        <div className="board-row">
          <Square
            value={squareBox[6]}
            handleClick={() => {
              handleOnsquareClick(6);
            }}
          />
          <Square
            value={squareBox[7]}
            handleClick={() => {
              handleOnsquareClick(7);
            }}
          />
          <Square
            value={squareBox[8]}
            handleClick={() => {
              handleOnsquareClick(8);
            }}
          />
        </div>
      </>
    );
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
function jumpToMove(){
  
}
  const moves = history.map((square, index)=>{
    let description;
    if(index > 0){
      description = "return to move "+ index
    }else{
      description = "return to Start"
    }

    return (
      <li key ={index}>
        <button onClick={()=>{jumpToMove(square)}}>{description}</button>
      </li>
    )
  })

  return <>
  <div className="game">
    <div className="game-board">
     <Board squareBox={currentSquare} isXnext={isXnext} handleClick={handleOnplay}/>
    </div>
    <div className="game-info">
    <ol>{moves}</ol>
    </div>
  </div>

  </>;
}

