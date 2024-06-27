/*
TODO: 
animate solving process
generate new puzzle
check puzzle 
*/
document.addEventListener('DOMContentLoaded', () => {
    // get all sudoku-cell class and place in an array 
    cells = Array.from(document.getElementsByClassName("sudoku-cell"));
    check = document.getElementById("checkButton");
    solve =  document.getElementById("solveButton");

    const puzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    const solvedPuzzle = puzzle;

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
        console.log(currentGrid);

    };

    function checkRow(grid, cell) {
        
    }; 

    function checkCol(puzzle, cells){

    };

    function checkBox(puzzle, cells){

    };

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

    function solvePuzzle(puzzle) {
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
                // if not solved repeat
                if (solvePuzzle(puzzle)){
                    console.log('solved');
                    console.log(puzzle);
                    // console.log(puzzle);
                    return true;
                }
            }
            puzzle[row][col] = 0;

            console.log('get back');
        }
        
        console.log('end');
        return false;
    };
    
    initializePuzzle(puzzle,cells);
    // solvePuzzle(solvedPuzzle);
    console.log(cells);
    check.addEventListener('click', checkSolution);
    // if (solvePuzzle(puzzle)) console.log(puzzle1);
    solve.onclick = function(){
        solvePuzzle(solvedPuzzle);
        initializePuzzle(solvedPuzzle, cells);    
    }

})

