const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty');
const colorSelect = document.getElementById('color');
const gameField = document.getElementById('game-field');
const pixel = document.getElementById('pixel');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const setupDiv = document.getElementById('setup');
const infoDiv = document.getElementById('game-info');

let score = 0;
let timeLeft;
let gameTimer;
let currentDifficulty;

const settings = {
    lazy: { time: 4, size: 60 },
    normal: { time: 2, size: 40 },
    catchme: { time: 1, size: 25 }
};

startBtn.addEventListener('click', () => {
    const diff = difficultySelect.value;
    const color = colorSelect.value;

    if (!diff || !color) {
        alert("Please select both difficulty and color!");
        return;
    }

    currentDifficulty = settings[diff];
    pixel.style.backgroundColor = color;
    pixel.style.width = currentDifficulty.size + 'px';
    pixel.style.height = currentDifficulty.size + 'px';

    setupDiv.style.display = 'none';
    gameField.style.display = 'block';
    infoDiv.style.display = 'flex';

    spawnPixel();
});

function spawnPixel() {
    clearTimeout(gameTimer);
    
    // Перезапуск анімації появи
    pixel.style.display = 'none';
    void pixel.offsetWidth; // Примусовий reflow для скидання анімації
    pixel.style.display = 'block';

    const x = Math.floor(Math.random() * (gameField.clientWidth - currentDifficulty.size));
    const y = Math.floor(Math.random() * (gameField.clientHeight - currentDifficulty.size));

    pixel.style.left = x + 'px';
    pixel.style.top = y + 'px';

    timeLeft = currentDifficulty.time;
    updateTimer();
}

function updateTimer() {
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        gameOver();
    } else {
        timeLeft--;
        gameTimer = setTimeout(updateTimer, 1000);
    }
}

pixel.addEventListener('click', (e) => {
    e.stopPropagation(); // Запобігає випадковим клікам по полю
    score++;
    scoreDisplay.textContent = score;
    spawnPixel(); 
});

function gameOver() {
    pixel.style.display = 'none';
    alert(`GAME OVER!\nYour total score: ${score}\nGreat job!`);
    location.reload(); 
}
