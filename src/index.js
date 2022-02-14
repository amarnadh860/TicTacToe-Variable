import { initializeGame, resetGame, getMoves, getSize } from './TicTacToeFunctions'


document.getElementById('gameSelector').addEventListener('change',(event)=>{
    let flag
    let moves = getMoves()
    let summary=document.querySelector('#summary').textContent

     if(moves.includes('X'||'O') && (summary === "Player1's turn" || summary === "Player2's turn"))
    {
        flag = window.confirm(`A game is in progress,Are you sure to change the size?`)
        if(flag)
        {
            initializeGame(event) 
        }
        else{
            document.querySelector('#gameSelector').value = getSize()
        }
    }
    else{
          
        initializeGame(event)
    }
})



const restart = document.querySelector('#restart')

restart.addEventListener('click',(event)=>{
    let flag , moves = getMoves()
    let summary = document.querySelector('#summary').textContent
    if(moves.includes('X'||'O') && (summary === "Player1's turn" || summary === "Player2's turn"))
    {
        flag = window.confirm(`A game is in progress,Are you sure to restart?`)
         if(flag === true)
          {
            resetGame(getSize())
         }
    }
    else {
            resetGame(getSize())
         }
})


