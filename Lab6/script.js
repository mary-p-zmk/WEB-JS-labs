document.addEventListener("DOMContentLoaded", () => {
    const gridElement = document.getElementById('grid');
    const movesCounter = document.getElementById('moves-counter');
    const minMovesElement = document.getElementById('min-moves');
    const btnRestart = document.getElementById('btn-restart');
    const btnNewGame = document.getElementById('btn-new-game');
    const winMessage = document.getElementById('win-message');

    let levels = [];
    let currentLevel = null;
    let gridState = [];
    let moves = 0;

    // Завантаження рівнів
    fetch('data/levels.json')
        .then(response => response.json())
        .then(data => {
            levels = data;
            startNewGame();
        })
        .catch(error => console.error("Помилка завантаження рівнів:", error));

    function startNewGame() {
        if (levels.length === 0) return;

        const availableLevels = currentLevel 
            ? levels.filter(level => level.id !== currentLevel.id) 
            : levels;

        const randomIndex = Math.floor(Math.random() * availableLevels.length);
        currentLevel = availableLevels[randomIndex];
        
        resetGame();
    }

    function resetGame() {
        if (!currentLevel) return;
        
        // Глибоке копіювання масиву сітки
        gridState = currentLevel.grid.map(row => [...row]);
        moves = 0;
        minMovesElement.textContent = currentLevel.minMoves;
        updateUI();
        winMessage.classList.add('hidden');
    }

    function updateUI() {
        movesCounter.textContent = moves;
        gridElement.innerHTML = '';

        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                
                if (gridState[row][col] === 1) {
                    cell.classList.add('is-on');
                } else {
                    cell.classList.add('is-off');
                }

                cell.addEventListener('click', () => handleCellClick(row, col));
                gridElement.appendChild(cell);
            }
        }
    }

    function handleCellClick(row, col) {
        if (!winMessage.classList.contains('hidden')) return;

        moves++;
        toggleCell(row, col);       
        toggleCell(row - 1, col);   
        toggleCell(row + 1, col);   
        toggleCell(row, col - 1);   
        toggleCell(row, col + 1);   

        updateUI();
        checkWinCondition();
    }

    function toggleCell(row, col) {
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            gridState[row][col] = gridState[row][col] === 1 ? 0 : 1;
        }
    }

    function checkWinCondition() {
        const hasLightOn = gridState.some(row => row.includes(1));
        if (!hasLightOn) {
            winMessage.classList.remove('hidden');
        }
    }

    btnRestart.addEventListener('click', resetGame);
    btnNewGame.addEventListener('click', startNewGame);
});
