// static/script.js
document.addEventListener('DOMContentLoaded', function () {
    const boardSize = 4; // Change this if you want a different size
    let gameBoard = [];

    function initializeGame() {
        // Initialize the game board with zeros
        gameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

        // Add initial tiles (for example, two tiles with value 2)
        addRandomTile();
        addRandomTile();

        // Render the game board
        renderGameBoard();
    }

    function addRandomTile() {
        // Find available positions with value 0
        const availablePositions = [];
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (gameBoard[i][j] === 0) {
                    availablePositions.push({ row: i, col: j });
                }
            }
        }

        // Choose a random position and add a new tile
        if (availablePositions.length > 0) {
            const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
            gameBoard[randomPosition.row][randomPosition.col] = 2; // For simplicity, adding a tile with value 2
        }
    }

    function moveTiles(direction) {
    // Implement the logic to move tiles in the specified direction (left, right, up, down)
    // Update the game board and add a new random tile
    // Call renderGameBoard() to update the UI

    function move(row, col, nextRow, nextCol) {
        gameBoard[nextRow][nextCol] = gameBoard[row][col];
        gameBoard[row][col] = 0;
    }

    function merge(row, col, nextRow, nextCol) {
        gameBoard[nextRow][nextCol] *= 2;
        gameBoard[row][col] = 0;
    }

    switch (direction) {
        case 'left':
            for (let row = 0; row < boardSize; row++) {
                for (let col = 1; col < boardSize; col++) {
                    if (gameBoard[row][col] !== 0) {
                        let nextCol = col - 1;
                        while (nextCol >= 0 && gameBoard[row][nextCol] === 0) {
                            move(row, col, row, nextCol);
                            col--;
                            nextCol--;
                        }
                        if (nextCol >= 0 && gameBoard[row][nextCol] === gameBoard[row][col]) {
                            merge(row, col, row, nextCol);
                        }
                    }
                }
            }
            break;

        case 'right':
            for (let row = 0; row < boardSize; row++) {
                for (let col = boardSize - 2; col >= 0; col--) {
                    if (gameBoard[row][col] !== 0) {
                        let nextCol = col + 1;
                        while (nextCol < boardSize && gameBoard[row][nextCol] === 0) {
                            move(row, col, row, nextCol);
                            col++;
                            nextCol++;
                        }
                        if (nextCol < boardSize && gameBoard[row][nextCol] === gameBoard[row][col]) {
                            merge(row, col, row, nextCol);
                        }
                    }
                }
            }
            break;

        case 'up':
            for (let col = 0; col < boardSize; col++) {
                for (let row = 1; row < boardSize; row++) {
                    if (gameBoard[row][col] !== 0) {
                        let nextRow = row - 1;
                        while (nextRow >= 0 && gameBoard[nextRow][col] === 0) {
                            move(row, col, nextRow, col);
                            row--;
                            nextRow--;
                        }
                        if (nextRow >= 0 && gameBoard[nextRow][col] === gameBoard[row][col]) {
                            merge(row, col, nextRow, col);
                        }
                    }
                }
            }
            break;

        case 'down':
            for (let col = 0; col < boardSize; col++) {
                for (let row = boardSize - 2; row >= 0; row--) {
                    if (gameBoard[row][col] !== 0) {
                        let nextRow = row + 1;
                        while (nextRow < boardSize && gameBoard[nextRow][col] === 0) {
                            move(row, col, nextRow, col);
                            row++;
                            nextRow++;
                        }
                        if (nextRow < boardSize && gameBoard[nextRow][col] === gameBoard[row][col]) {
                            merge(row, col, nextRow, col);
                        }
                    }
                }
            }
            break;
    }

    addRandomTile();
    renderGameBoard();
}

    function renderGameBoard() {
        const gameBoardContainer = document.getElementById('game-board');
        gameBoardContainer.innerHTML = '';

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const tileValue = gameBoard[i][j];
                const tileElement = document.createElement('div');
                tileElement.className = 'tile';
                tileElement.textContent = tileValue > 0 ? tileValue : '';

                // Add more styling based on tile value (colors, etc.)

                gameBoardContainer.appendChild(tileElement);
            }
        }
    }

    // Initialize the game
    initializeGame();

    // Example: Handle arrow key presses to move tiles
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                moveTiles('left');
                break;
            case 'ArrowRight':
                moveTiles('right');
                break;
            case 'ArrowUp':
                moveTiles('up');
                break;
            case 'ArrowDown':
                moveTiles('down');
                break;
        }
    });
});
