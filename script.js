const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.getElementById('reset');
const scoreA = document.getElementById('scoreA');
const scoreB = document.getElementById('scoreB');

let currentPlayer = 'x';
let board = Array(9).fill(null);
let gameActive = true;
let wins = { x: 0, o: 0 };

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Handle cell click
function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    e.target.classList.add(currentPlayer);
    
    if (checkWinner()) {
        wins[currentPlayer]++;
        scoreA.textContent = wins.x;
        scoreB.textContent = wins.o;
        gameActive = false;
    } else if (board.every(cell => cell)) {
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
}

// Check winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            [a, b, c].forEach(i => cells[i].classList.add('winning-cell'));
            return true;
        }
        return false;
    });
}

resetButton.addEventListener('click', () => {
    board.fill(null);
    cells.forEach(cell => cell.className = 'cell');
    gameActive = true;
    currentPlayer = 'x';
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
