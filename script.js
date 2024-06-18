document.addEventListener('DOMContentLoaded', () => {
    // get all sudoku-cell class and place in an array 
    cells = Array.from(document.getElementsByClassName("sudoku-cell"));

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
        console.log(cells.value)
    };

    initializePuzzle(puzzle,cells);
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
