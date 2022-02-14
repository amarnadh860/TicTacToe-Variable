import {generateAllWinningPossibilities} from './TicTacToeWinnings'
let wins,boxes,moves,size,summary

export const getMoves =()=> moves?moves:[]

export const getSize = ()=>size

const startGame =(size)=>{
    if(document.getElementById('headers'))
        document.getElementById('game').removeChild(document.getElementById('headers'))
    
    if(size === 3)
      wins = winningPossibilities(3)
    
    else
       wins = generateAllWinningPossibilities(size)
    
    moves = resetMoves(size)
    generateBoxes(size)
    document.querySelector('#summary').textContent = "Player1's turn"
    document.querySelector('#summary').style.color = 'green'

}

export const initializeGame = (event)=>{
        
    if(typeof Number(event.target.value) === 'number')
    {
           if(document.querySelector('#placeholder'))
            document.querySelector('#gameSelector').removeChild(document.querySelector('#placeholder'))
           if(document.querySelector('.button'))
           {
             document.querySelector('#game').removeChild( document.querySelector('#containBoxes'))
           }
           size = Number(event.target.value)
           startGame(size)

           boxes = document.getElementsByClassName(`size${size} `)
           
           for(let i=1;i<=size*size;i++)
            {
              let box = boxes[i-1]
              box.addEventListener('click',(event)=>
              {
            
                box.value = handleClick(i-1)
                box.disabled = true
                if(box.value ==='O')
                {
                  summary = "Player1's turn"
                  box.style.color = 'red'
                }

                else{
                  box.style.color = 'green'
                  summary = "Player2's turn"
                }
                
                checkWinning()
                if(getSummary(summary))
                  { 
                    makeUnclick()
                    summary=''
                  }
              })
    
            }

    }
}

const winningPossibilities = (size)=>{

    const n = size
    let l=[],la=[],lb=[],lc=[]

    for( let i=0;i<n*n;i++)
    {
        la.push(i)
        if(la.length === n)
          {
            l.push(la)
            lb.push(la)
            la=[] 
          }                                                          //appending row wise
    }

    for(let i=0;i<n;i++)
    {
       for(let j=0;j<n;j++)
         {
           let x=i+j*n                                               // x values 0 3 6 when i=0
           la.push(x)
           if(la.length === n)
             {
                l.push(la)
                la=[]
             } 
        }                                                         //appending column wise
    }     

    for(let i=0;i<n;i++) 
        lc.push(i*(n+1))
    
        l.push(lc)                                             //appending back-slash wise

    lc=[]

    for(let i=1;i<n+1;i++)
        lc.push(i*(n-1))

    l.push(lc) 
    
    return l                                                   //appending forward-slash wise
    
}                                                              //End of Winning Possibilities

const resetMoves = (size)=>{
   
    let l=[]
    for(let i=0 ; i < size*size ; i++)
    {   
        l[i]=''
    }
    return l

}                                                                //End of resetMoves

const generateBoxes = (size) =>{
    let divEl = document.querySelector('#game')
    let divElHasBoxes = document.createElement('div')
    divElHasBoxes.id = 'containBoxes'
    for(let i=1;i<=size*size;i++){
        let buttonEl = document.createElement('input')
        const br = document.createElement('br')
        buttonEl.setAttribute('type','text')
        buttonEl.id = `button${i}`
        buttonEl.classList = `size${size} button`
        buttonEl.readOnly = true
        divElHasBoxes.appendChild(buttonEl)
        if(i%size ===0)
        divElHasBoxes.appendChild(br)
    }
    divEl.appendChild(divElHasBoxes)
    }                                                            // We can generate size x size Tictactoe game here 

const makeUnclick =()=>{
    let unclickAbles=[]
    moves.forEach((item,index)=>{
        if(!item)
        unclickAbles.push(index)
    })

    unclickAbles.forEach(((unclickAbleIndex)=>{
        let item = document.querySelector(`#button${unclickAbleIndex+1}`)
        item.disabled = true

    }))

}                                                                 // End of makeUnclick

let renderBoxes = (moves)=>{
    
    if(document.querySelector(`#button1`))
    {
    moves.forEach((move,index)=>{
        let buttonEl = document.querySelector(`#button${index+1}`)
        buttonEl.disabled = false
        buttonEl.value = move
        buttonEl.style.backgroundColor = 'white'
    })
}

}                                                                    //End of renderBoxes


const handleClick = (index)=>{
    let even=0,odd=0,store
    
    moves.forEach((move)=>{
        
        if(move ==='X') 
          odd++
        
        else if(move === 'O')
          even++
 })
    
    if(odd===0){
        moves[index] ='X'
        console.log('X is the current move')
        return 'X'
    }
    if(odd===1 && even===0){
        moves[index] = 'O'
        console.log('O is the current move')
        return 'O' 
    }
    if(odd > even){
        moves[index] = 'O'
        console.log('O is the current move')
        return 'O'
    }
    else if(odd === even){
        moves[index] = 'X'
        console.log('X is the current move')
        return 'X'

    }
    
    }                                                                 // end of handle click

let checkWinning = ()=>
  {
    let even=0,odd=0
    let oddIndexes=[],evenIndexes=[]

    moves.forEach((move,index)=>
     {
       if(move === 'X')
         {
            odd++
            oddIndexes.push(index)
            oddIndexes.sort()
         }
        
        else if(move === 'O')
        {
            even++
            evenIndexes.push(index)
            evenIndexes.sort()
        }
     })
            
    if(oddIndexes.length>=3)
      {
        wins.forEach((win,index)=>
          {
            let cnt=0
            win.forEach((winItem)=>
             {
                if(oddIndexes.includes(winItem))
                    cnt++
                  
                if(cnt === 3 && size === 3)
                {
                   summary= `Player1 wins`
                   addWinningColor(win)
                   
                   
                }
                if(cnt ===4 && size >=4){
                   summary= `Player1 wins`
                   addWinningColor(win)
                   
                }
            })
             
            
          })
      }
    
      if(evenIndexes.length>=3)
        {
          wins.forEach((win,index)=>
           {
             let cnt=0
             win.forEach((winItem)=>{
                        
                if(evenIndexes.includes(winItem))
                 cnt+=1
                 
                if(cnt===3 && size ===3)
                {
                    summary= `Player2 wins`
                    addWinningColor(win)
                    
                }
                if(cnt ===4 && size >=4)
                {
                  summary= `Player2 wins`
                  addWinningColor(win)
                  
                }
                        
              })
            })
         }
        
        if(odd === Math.ceil(size*size/2) && even === Math.floor(size*size/2)){
            if(summary!=`Player1 wins` && summary != `Player2 wins`)
            summary = 'Game ends as draw'
         }
    
    }                                                                        // end of checkWinning

const addWinningColor = (winArray)=>{
      const winColor = summary === 'Player1 wins'?'green':'red'
      
      winArray.forEach((winButton)=>{
        let box = document.querySelector(`#button${winButton+1}`)
        box.style.backgroundColor = winColor
        box.style.color = 'white'
      })
}

const getSummary = (summary)=>{
    let resultEl = document.querySelector('#summary')
    //resultEl.textContent = summary 
    if(summary != "Player1's turn" && summary != "Player2's turn"  )
    {
      
      if(summary === 'Player1 wins')
        resultEl.style.color = 'green'
      
      else
        resultEl.style.color = 'red'
     
      resultEl.textContent = summary
      return true
    }
    else{
     
      if(summary === "Player1's turn" )
        resultEl.style.color = 'green'
      else
        resultEl.style.color ='red'
      resultEl.textContent = summary
      return false
    }
    
}                                                                           // end of get summary

export const resetGame = (size)=>{
    
    summary = "Player1's turn"
    if(!document.querySelector('#headers'))  
  {
    document.querySelector("#summary").textContent = summary
    document.querySelector('#summary').style.color = 'green'
    moves=resetMoves(size)
    renderBoxes(moves)
  }

}


    