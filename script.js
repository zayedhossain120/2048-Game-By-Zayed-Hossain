document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("grid-container");
    const scoreElement = document.getElementById("score");
    const newGameButton = document.getElementById("new-game");

    let score = 0;
    let grid = [];

    // Initialize the grid with zeros
    function initializeGrid() {
        grid = [];
        for (let i = 0; i < 4; i++) {
            grid.push([0, 0, 0, 0]);
        }
    }

    // Add a random tile (2 or 4) to the grid
    function addRandomTile() {
        const availableCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 0) {
                    availableCells.push({ row: i, col: j });
                }
            }
        }

        if (availableCells.length > 0) {
            const { row, col } = availableCells[Math.floor(Math.random() * availableCells.length)];
            grid[row][col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    // Update the grid UI
    function updateGridUI() {
        gridContainer.innerHTML = "";
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const tile = document.createElement("div");
                tile.className = "tile";
                tile.innerText = grid[i][j] !== 0 ? grid[i][j].toString() : "";
                tile.style.backgroundColor = getTileColor(grid[i][j]);
                gridContainer.appendChild(tile);
            }
        }
    }

    // Get the background color for a tile based on its value
    function getTileColor(value) {
        switch (value) {
            case 2:
                return "#eee4da";
            case 4:
                return "#ede0c8";
            case 8:
                return "#f2b179";
            case 16:
                return "#f59563";
            case 32:
                return "#f67c5f";
            case 64:
                return "#f65e3b";
            case 128:
                return "#edcf72";
            case 256:
                return "#edcc61";
            case 512:
                return "#edc850";
            case 1024:
                return "#edc53f";
            case 2048:
                return "#edc22e";
            default:
                return "#cdc1b4";
        }
    }

    // Handle key presses
    function handleKeyPress(event) {
        const key = event.key;
        let moved = false;

        if (key === "ArrowUp" || key === "w") {
            moved = moveUp();
        } else if (key === "ArrowDown" || key === "s") {
            moved = moveDown();
        } else if (key === "ArrowLeft" || key === "a") {
            moved = moveLeft();
        } else if (key === "ArrowRight" || key === "d") {
            moved = moveRight();
        }

        if (moved) {
            addRandomTile();
            updateGridUI();
            updateScore();
            checkGameOver();
        }
    }

    // Move tiles up
    function moveUp() {
        let moved = false;

        for (let j = 0; j < 4; j++) {
            for (let i = 1; i < 4; i++) {
                if (grid[i][j] !== 0) {
                    let k = i - 1;
                    while (k >= 0 && grid[k][j] === 0) {
                        grid[k][j] = grid[k + 1][j];
                        grid[k + 1][j] = 0;
                        k--;
                        moved = true;
                    }

                    if (k >= 0 && grid[k][j] === grid[k + 1][j]) {
                        grid[k][j] *= 2;
                        score += grid[k][j];
                        grid[k + 1][j] = 0;
                        moved = true;
                    }
                }
            }
        }

        return moved;
    }

    // Move tiles down
    function moveDown() {
        let moved = false;

        for (let j = 0; j < 4; j++) {
            for (let i = 2; i >= 0; i--) {
                if (grid[i][j] !== 0) {
                    let k = i + 1;
                    while (k < 4 && grid[k][j] === 0) {
                        grid[k][j] = grid[k - 1][j];
                        grid[k - 1][j] = 0;
                        k++;
                        moved = true;
                    }

                    if (k < 4 && grid[k][j] === grid[k - 1][j]) {
                        grid[k][j] *= 2;
                        score += grid[k][j];
                        grid[k - 1][j] = 0;
                        moved = true;
                    }
                }
            }
        }

        return moved;
    }

    // Move tiles left
    function moveLeft() {
        let moved = false;

        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (grid[i][j] !== 0) {
                    let k = j - 1;
                    while (k >= 0 && grid[i][k] === 0) {
                        grid[i][k] = grid[i][k + 1];
                        grid[i][k + 1] = 0;
                        k--;
                        moved = true;
                    }

                    if (k >= 0 && grid[i][k] === grid[i][k + 1]) {
                        grid[i][k] *= 2;
                        score += grid[i][k];
                        grid[i][k + 1] = 0;
                        moved = true;
                    }
                }
            }
        }

        return moved;
    }

    // Move tiles right
    function moveRight() {
        let moved = false;

        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                if (grid[i][j] !== 0) {
                    let k = j + 1;
                    while (k < 4 && grid[i][k] === 0) {
                        grid[i][k] = grid[i][k - 1];
                        grid[i][k - 1] = 0;
                        k++;
                        moved = true;
                    }

                    if (k < 4 && grid[i][k] === grid[i][k - 1]) {
                        grid[i][k] *= 2;
                        score += grid[i][k];
                        grid[i][k - 1] = 0;
                        moved = true;
                    }
                }
            }
        }

        return moved;
    }

    // Update the score UI
    function updateScore() {
        scoreElement.innerText = `Score: ${score}`;
    }

    // Check if the game is over
    function checkGameOver() {
        let gameOver = true;

        // Check if there are any empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 0) {
                    gameOver = false;
                    break;
                }
            }
        }

        if (gameOver) {
            // Check if there are any adjacent cells with the same value
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        (i < 3 && grid[i][j] === grid[i + 1][j]) ||
                        (j < 3 && grid[i][j] === grid[i][j + 1])
                    ) {
                        gameOver = false;
                        break;
                    }
                }
            }
        }

        if (gameOver) {
            alert("Game Over!");
        }
    }

    // Start a new game
    function startNewGame() {
        score = 0;
        initializeGrid();
        addRandomTile();
        addRandomTile();
        updateGridUI();
        updateScore();
        document.addEventListener("keydown", handleKeyPress);
    }

    // Event listeners
    newGameButton.addEventListener("click", startNewGame);

    // Start the game
    startNewGame();
});

