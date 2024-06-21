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

    const solvedPuzzle1 = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

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
                if (puzzle[row][col]== 0 ) {
                    // console.log(row, col);
                    return [row, col];
                };
            };
        };
    };

    function checkGuess(puzzle, row, col, guess) {
        // check each row from the column of the empty cell
        for (let r=0; r < 9; r++){
            if (puzzle[r][col] == guess) {return false};
        };

        // check each col from the row of the empty cell
        for (let c=0; c < 9; c++){
            if (puzzle[row][c] == guess) {return false}; 
        };

        // initialized mini box start
        const rowStart = Math.floor(row / 3) * 3;
        const colStart = Math.floor(col / 3) * 3;

        // range of loop is from start of mini box + 3
        for (let r = rowStart; r < (rowStart + 3); r++){
            for (let c = colStart; c <(colStart + 3); c++) {
                if (puzzle[r][c] == guess) {return false};
            };
        };

        return true;
    };

    function solvePuzzle (puzzle) {
        // get row col of an empty cell
        let empty = checkEmpty(puzzle);
        let row = empty[0];
        let col = empty[1];
        console.log('row', row, 'col', col);
        
        // solved?
        if (row == null) {return true};
        
        for (let guess=1; guess < 10; guess++) {
            console.log('guess', guess);
            // check if guess is correct
            if (checkGuess(puzzle, row, col, guess)){
                console.log('row ', row, 'col' , col, 'guess' , guess);
                puzzle[row][col] = guess;
                // if not solved repeat
                if (solvePuzzle(puzzle));
                    // console.log(puzzle);
                    return true;
            };
            puzzle[row][col] = 0;
            
            console.log('get back');
        };
        
        console.log('end');
        return false;
    };
    
    initializePuzzle(puzzle,cells);
    // solvePuzzle(solvedPuzzle);
    check.addEventListener('click', checkSolution);
    solve.onclick = function(){solvePuzzle(solvedPuzzle)};

})



// document.addEventListener('DOMContentLoaded', () => {
//     const grid = document.getElementById('sudoku-grid');
//     const cells = Array.from(grid.getElementsByClassName('cell'));
//     const checkButton = document.getElementById('check-btn');
//     const solveButton = document.getElementById('solve-btn');

//     // Example puzzle (0 represents empty cells)
//     const puzzle = [
//         [5, 3, 0, 0, 7, 0, 0, 0, 0],
//         [6, 0, 0, 1, 9, 5, 0, 0, 0],
//         [0, 9, 8, 0, 0, 0, 0, 6, 0],
//         [8, 0, 0, 0, 6, 0, 0, 0, 3],
//         [4, 0, 0, 8, 0, 3, 0, 0, 1],
//         [7, 0, 0, 0, 2, 0, 0, 0, 6],
//         [0, 6, 0, 0, 0, 0, 2, 8, 0],
//         [0, 0, 0, 4, 1, 9, 0, 0, 5],
//         [0, 0, 0, 0, 8, 0, 0, 7, 9]
//     ];

//     // Function to initialize the grid with the puzzle
//     function initializeGrid() {
//         cells.forEach((cell, index) => {
//             const row = Math.floor(index / 9);
//             const col = index % 9;
//             if (puzzle[row][col] !== 0) {
//                 cell.value = puzzle[row][col];
//                 cell.disabled = true;
//             }
//         });
//     }

//     // Function to check if the puzzle is solved correctly
//     function checkSolution() {
//         // Get current values from the grid
//         const currentGrid = cells.map(cell => Number(cell.value) || 0);

//         // Check rows, columns, and 3x3 subgrids
//         for (let i = 0; i < 9; i++) {
//             if (!isValidRow(currentGrid, i) || !isValidColumn(currentGrid, i) || !isValidBox(currentGrid, i)) {
//                 alert('Solution is incorrect');
//                 return;
//             }
//         }
//         alert('Solution is correct');
//     }

//     // Helper functions to validate rows, columns, and 3x3 subgrids
//     function isValidRow(grid, row) {
//         const seen = new Set();
//         for (let col = 0; col < 9; col++) {
//             const value = grid[row * 9 + col];
//             if (value !== 0 && seen.has(value)) return false;
//             seen.add(value);
//         }
//         return true;
//     }

//     function isValidColumn(grid, col) {
//         const seen = new Set();
//         for (let row = 0; row < 9; row++) {
//             const value = grid[row * 9 + col];
//             if (value !== 0 && seen.has(value)) return false;
//             seen.add(value);
//         }
//         return true;
//     }

//     function isValidBox(grid, box) {
//         const seen = new Set();
//         const startRow = Math.floor(box / 3) * 3;
//         const startCol = (box % 3) * 3;
//         for (let i = 0; i < 3; i++) {
//             for (let j = 0; j < 3; j++) {
//                 const value = grid[(startRow + i) * 9 + (startCol + j)];
//                 if (value !== 0 && seen.has(value)) return false;
//                 seen.add(value);
//             }
//         }
//         return true;
//     }

//     // Initialize the grid with the puzzle
//     initializeGrid();

//     // Add event listeners to buttons
//     checkButton.addEventListener('click', checkSolution);
//     solveButton.addEventListener('click', () => alert('Solve functionality not implemented yet'));
// });
