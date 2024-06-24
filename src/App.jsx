import { useState } from "react"
import confetti from "canvas-confetti"
const TURNS = {
  X: 'X',
  O: 'O'
}
const board = Array(9).fill(null)

const Square = ({children, isSelected, updatedBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updatedBoard(index)      
  }

  return(   
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6], 
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {

  const [board, setBoard] = useState(
    //['x', 'x', 'x','x', 'x', 'x','x', 'x', 'x']
    Array(9).fill(null)
  );

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
      {
        return boardToCheck[a]
      }
    }
    //there is not winner
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square != null)
  }

  const updatedBoard = (index) => {
    if(board[index] || winner) return
    const newBoard = [ ...board]
    newBoard[index]=turn
    setBoard(newBoard)
    const newturn = turn === TURNS.X ? TURNS.O : TURNS.X 
    setTurn(newturn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }
    else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  //console.log("hola///");
  return (
    <main className="board">
      <h1>gato</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {
          board.map((_, index)=>{
            return (
              <Square
                key={index}
                index={index}
                updatedBoard={updatedBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {
        winner != null && (

          <section className="winner">

            <div className="text">

              <h2>
                {
                  winner === false
                    ? 'empato'
                    : 'gano'
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>

          </section>

        )
      }
    </main>
  )
}

export default App
