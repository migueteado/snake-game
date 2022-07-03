let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let popupMessage = document.querySelector(".popup-message");
let playAgain = document.querySelector(".play-again");
let scoreDisplay = document.querySelector(".score");

// Buttons
let up = document.querySelector(".up");
let down = document.querySelector(".down");
let left = document.querySelector(".left");
let right = document.querySelector(".right");

let width = 29;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.95;
let intervalTime = 0;
let interval = 0;

// Events
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keyup", control);
  createBoard();
  startGame();
  playAgain.addEventListener("click", restartGame);
});

// UI Controls
up.addEventListener("click", () => (direction = -width));
down.addEventListener("click", () => (direction = +width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));

function createBoard() {
  popup.style.display = "none";
  for (let i = 1; i <= 841; i++) {
    let div = document.createElement("div");
    if (i % 2) {
      div.classList.add("darker");
    }
    grid.appendChild(div);
  }
}

function startGame() {
  let squares = document.querySelectorAll(".grid div");
  randomApple(squares);
  direction = 1;
  score = 0;
  scoreDisplay.innerHTML = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
  let squares = document.querySelectorAll(".grid div");
  if (checkForHits(squares)) {
    popup.style.display = "flex";
    return clearInterval(interval);
  } else {
    moveSnake(squares);
  }
}

function moveSnake(squares) {
  let tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  eatApple(squares, tail);
  squares[currentSnake[0]].classList.add("snake");
}

function checkForHits(squares) {
  return (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width <= 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  );
}

function eatApple(squares, tail) {
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    randomApple(squares);
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcome, intervalTime);
  }
}

function randomApple(squares) {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

// Handle key controls for Desktop
function control(e) {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}

function restartGame() {
  grid.innerHTML = "";
  createBoard();
  startGame();
  popup.style.display = "none";
}
