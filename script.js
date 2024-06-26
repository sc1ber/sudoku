/*
TODO: 
animate solving process [done]
generate new puzzle [done]
clear puzzle for new game [done]
check puzzle 
add timer ?
add input to slow down solving speed [done]
*/
document.addEventListener('DOMContentLoaded', () => {
    // get all sudoku-cell class and place in an array 
    cells = Array.from(document.getElementsByClassName("sudoku-cell"));
    newGame = document.getElementById("newButton");
    check = document.getElementById("checkButton");
    solve =  document.getElementById("solveButton");

    // const puzzle = [
    //     [5, 3, 0, 0, 7, 0, 0, 0, 0],
    //     [6, 0, 0, 1, 9, 5, 0, 0, 0],
    //     [0, 9, 8, 0, 0, 0, 0, 6, 0],
    //     [8, 0, 0, 0, 6, 0, 0, 0, 3],
    //     [4, 0, 0, 8, 0, 3, 0, 0, 1],
    //     [7, 0, 0, 0, 2, 0, 0, 0, 6],
    //     [0, 6, 0, 0, 0, 0, 2, 8, 0],
    //     [0, 0, 0, 4, 1, 9, 0, 0, 5],
    //     [0, 0, 0, 0, 8, 0, 0, 7, 9]
    // ];
    
    // generate clean grid 

    function initializePuzzle(puzzle,cells) {
        // get cell from cells aray 
        cells.forEach((cell, index ) => {
            // get closest row by dividing index to 9
            const row = Math.floor( index / 9);
            // get col by modulo
            const col = index % 9;
            if (puzzle[row][col] !== 0){
                // populate cell value with puzzle value
                cell.value = puzzle[row][col];
                cell.disabled = true;
            }
        });
        // console.log(cells.value)
    };

    function checkSolution(){
        // get cell values , no value = 0
        const currentGrid = cells.map(cell => Number(cell.value) || 0);
        for(let i = 0; i < currentGrid.length; i++){
            // console.log(`cell ${i} row ${Math.floor(i/9)}`);
            console.log(`cell ${i} col ${i%9}`);
        }
        // const currentGuessCellIndex = row * 9 + col;
        console.log(currentGrid);

    };

    function checkRow(grid, cell) {
        const row = Math.floor(cell / 9);
        const duplicates = new Set();
        
    }; 

    function checkCol(puzzle, cells){

    };

    function checkBox(puzzle, cells){

    };

    function randomLevel(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }

    function getLevel(level){
        switch(level){
            case "easy":
                return randomLevel(55,65);   
            case "medium":
                return randomLevel(45,55);
            case "hard":
                return randomLevel(30,40);
            case "pro":
                return randomLevel(15,25);
            case "pain":
                return randomLevel(5,10);
        }
    }

    function shuffleArray(array) {
        // index count going down
        for (let i = array.length - 1; i > 0; i--) {
            // pick random number index
            const j = Math.floor(Math.random() * (i + 1));
            // swap index 
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generatePuzzle(puzzle, level){  
        const difficulty = 81-getLevel(level);
        let cellsFilled = 0;

        function isSolvable(puzzle){
            for (let row=0; row < 9; row++){
                // generate random number for columns to be filled in a row
                for (let col=0; col < 9; col++){
                    if(puzzle[row][col] === 0 ){
                        let numbers = [1,2,3,4,5,6,7,8,9];
                        shuffleArray(numbers);
                        for (let num of numbers){
                            if(checkGuess(puzzle,row,col,num)){
                                puzzle[row][col] = num;
                                if(isSolvable(puzzle)){
                                    return true
                                }
                                puzzle[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }

        isSolvable(puzzle);

        while(cellsFilled < difficulty){
            let randomRow = Math.floor(Math.random() * 9);
            let randomCol = Math.floor(Math.random() * 9);
            if(puzzle[randomRow][randomCol] !== 0){
                puzzle[randomRow][randomCol] = 0;
                cellsFilled++;
            }
        }

        console.log(puzzle);
    };

    function clearPuzzle(cells){
        // puzzle = Array(9).fill().map(()=>Array(9).fill(0));
        console.log('new game ',puzzle)
        cells.forEach((cell, index ) => {
            cell.value = null;
            cell.disabled = false;
        });
    }

    function checkEmpty(puzzle) {
        // scan 9 rows 
        for (let row=0; row < 9; row++){
            // scan 9 col
            for (let col=0; col < 9; col++){
                if (puzzle[row][col] === 0 ) {
                    // console.log(row, col);
                    return [row, col];
                }
            }
        }
        return null;
    };

    function checkGuess(puzzle, row, col, guess) {
        // check each col from the row of the empty cell
        for (let c=0; c < 9; c++){
            if (puzzle[row][c] === guess) {console.log('exist in column');return false;}; 
        }

        // check each row from the column of the empty cell
        for (let r=0; r < 9; r++){
            if (puzzle[r][col] === guess) {console.log('exist in row');return false;};
        }

        // initialized mini box start
        const rowStart = Math.floor(row / 3) * 3;
        const colStart = Math.floor(col / 3) * 3;

        // range of loop is from start of mini box + 3
        for (let r = rowStart; r < (rowStart + 3); r++){
            for (let c = colStart; c <(colStart + 3); c++) {
                console.log('box', r, c);
                if (puzzle[r][c] === guess) {
                    console.log('exist in mini box');
                    return false;
                }
            }
        }
        
        console.log('guess is correct');
        return true;
    };

    async function solvePuzzle(puzzle, cells, animate, speed) {
        // get row col of an empty cell
        const empty = checkEmpty(puzzle);
        
        // solved?
        if (!empty) return true;

        const [row, col] = empty;

        console.log('row', row, 'col', col);
        
        for (let guess=1; guess <= 9; guess++) {
            console.log('guess', guess);
            // check if guess is correct
            if (checkGuess(puzzle, row, col, guess)){
                console.log('row ', row, 'col' , col, 'guess' , guess);
                puzzle[row][col] = guess;

                if (animate){
                    // remove class from previous clel
                    if (currentGuessCell) {
                        currentGuessCell.classList.remove('current-guess');
                    }
        
                    // update current guess cell and highlight it
                    const currentGuessCellIndex = row * 9 + col;
                    currentGuessCell = cells[currentGuessCellIndex];
                    currentGuessCell.value = guess;
                    currentGuessCell.classList.add('current-guess');

                    // get cell index 
                    // cells[row * 9 + col].value = guess; 
                    // add class to show currently edited cell
                    // cells[row * 9 + col].classList.add('current-guess');   
                    // solving speed
                    await new Promise(resolve => setTimeout(resolve, speed));
                    // checkEmptyCell(puzzle, cells);
                    // if not solved repeat
                }

                // await new Promise(resolve => setTimeout(resolve, 0));

                if (await solvePuzzle(puzzle, cells, animate, speed)){
                    // console.log('solved');
                    // console.log(puzzle);
                    return true;
                }

                if (animate) {
                    currentGuessCell.value = ''; // clear cell value in UI
                    currentGuessCell.classList.remove('current-guess'); // remove highlight
                }
            }
            puzzle[row][col] = 0;
            console.log('get back');

        }
        console.log('end');
        return false;
    };
    
    let currentGuessCell = null;
    // initializePuzzle(puzzle,cells);
    // console.log(cells[4].value);
    // solvePuzzle(solvedPuzzle);
    // console.log(cells);
    // console.log(checkEmptyCell(cells));
    let puzzle = Array(9).fill().map(()=>Array(9).fill(0));

    newGame.addEventListener('click', function (){
        puzzle = Array(9).fill().map(()=>Array(9).fill(0));
        var level = document.getElementById("levels").value;
        clearPuzzle(cells);
        generatePuzzle(puzzle,level);
        initializePuzzle(puzzle,cells)
        console.log(puzzle);
    })
    check.addEventListener('click', function () {
        checkSolution();
    });
    // if (solvePuzzle(puzzle)) console.log(puzzle1);
    solve.onclick = async function(){
        var speed = document.getElementById("speed").value;
        await solvePuzzle(puzzle,cells,true,speed);
        initializePuzzle(puzzle, cells);
        // initializePuzzle(puzzle, cells);    
    }

})

