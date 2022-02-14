const indexGenerator =(size)=>{
    let l=[],n = size
    for(let j=0;j<n-3;j++)      //here we loop n-3 is the number of times we can divide a matrix it into 4x4 matrices for size>=4
    {  
    let x=[]
    for(let i=0;i<n;i++)
    {
        x.push(j+i*(n-3))
    }
    l.push(x)
   }
   return l
   }
   
const winMovesGenerator = (arr,size)=>{
  
   const controller = size -  3
   let newArr = []
    arr.forEach((item,index)=>{
        let controlCount = 0
            let l=[]
            for(let i=0 ;i< controller;i++)
            for( let j=0; j<size ; j++){
                l.push(item[i+j])
                if(l.length === 4){
                    newArr.push(l)
                    l=[]
                    break
                    
                }
            }
        })
    return newArr
}

const diagonalWins=(matrices,size)=>{

    let x=[]
    if(size > 4)
    {
        
        matrices.forEach((matrix)=>{
        let ya=[],yb=[]
        
        for(let i=0;i<matrix.length;i++)
        {
          ya.push(matrix[i][i])
          yb.push(matrix[i][matrix.length-1-i])
        }
        x.push(ya)
        x.push(yb)
    })
    }

    else{
        let ya=[],yb=[]
        let matrix = matrices
        for(let i=0;i<matrix.length;i++)
        {
          ya.push(matrix[i][i])
          yb.push(matrix[i][matrix.length-1-i])
        }
        x.push(ya)
        x.push(yb)
    }

    return x

}

const fourXfourGenerator = (horizontalPart, winIndexes)=>{
    let l1=[],l2=[]

    winIndexes.forEach((winIndex)=>{

        winIndex.forEach((win)=>{
        l2.push(horizontalPart[win])
    })
       l1.push(l2)
       l2=[]
    })
   
   return l1
}

export const generateAllWinningPossibilities = (n=4)=>{

    const size = n
    let arr = new Array(size)
    for(let i=0;i<size;i++)
       arr[i] = new Array(size)
   
    for(let i=0;i<size;i++)
    {
       for(let j=0;j<size;j++)
      {
        if(i === 0)
        arr[i][j] = i+j
        else
        arr[i][j] = arr[i-1][j] + size
      }
    }

    let arr2 = []
    for(let j=0 ; j < size; j++)
    {
        let l=[]
        for(let i=0 ; i < size ; i++)
        {
            l[i] = arr[i][j]
        }
        arr2.push(l)
    }


    let horizontalWins = winMovesGenerator(arr,size)
    
    let verticalWins = winMovesGenerator(arr2,size)
    
    let indexArray = indexGenerator(size) //To get indexes so that we can wire the arrays into the size 4x4
    

    let winIndexes,fourXfour,diagonalIndexes
    if(size>4){
        winIndexes = winMovesGenerator(indexArray,size)//we can wire the lists based on these indices
        
        fourXfour = fourXfourGenerator(horizontalWins, winIndexes)// Generates 4x4 matrices form of arrays
        
        diagonalIndexes = diagonalWins(fourXfour,size) //contains all possible diagonal wins
        
    }
    else{
        diagonalIndexes = diagonalWins(horizontalWins,size)
    }
    
    let allWins = []
    allWins.push(horizontalWins)
    allWins.push(verticalWins)
    allWins.push(diagonalIndexes)
    
    let finalAllWins = []
    allWins.forEach((allWin)=>{
        allWin.forEach((win)=>{
            finalAllWins.push(win)
     })
    })
    
    return finalAllWins
}

// console.log('5x5',generateAllWinningPossibilities(5))
// console.log('6x6',generateAllWinningPossibilities(6))
// console.log('7x7',generateAllWinningPossibilities(7))

