const cells = document.querySelectorAll("[data-cell]");
const container = document.getElementById("container");
let xTurn;
const classes = ["x", "circle"];
const winningDisplay = document.getElementById("winning-text");
const winningBlock = document.getElementById("win-block");
const restartButton = document.getElementById("restart");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  xTurn = true;
  container.className = "container x";
  cells.forEach((cell) => {
    cell.className = "cell";
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningBlock.classList.remove("show");
};
startGame();

const checkWin = (currentClass) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

const checkDraw = () => {
  return [...cells].every(
    (cell) => cell.classList.contains("x") || cell.classList.contains("circle")
  );
};

const endGame = (winnigClass, win) => {
  if (win && winnigClass) {
    winningDisplay.innerText = `${
      winnigClass === "x" ? winnigClass.toUpperCase() : "O"
    }'s WIN!`;
    winningBlock.classList.add("show");
  } else if (!win) {
    winningDisplay.innerText = "DRAW!";
    winningBlock.classList.add("show");
  }
};

function handleClick(evt) {
  // add marker
  if (xTurn) {
    evt.target.classList.add("x");
    container.className = `container ${classes[1]}`;
  } else {
    evt.target.classList.add("circle");
    container.className = `container ${classes[0]}`;
  }
  // check for win
  let win = checkWin(xTurn ? classes[0] : classes[1]);
  if (win) endGame(xTurn ? classes[0] : classes[1], win);
  else if (!win && checkDraw()) {
    // check for draw
    endGame(null, win);
  } else {
    // switch turns..
    xTurn = !xTurn;
  }
}

cells.forEach((cell) =>
  cell.addEventListener("click", handleClick, { once: true })
);

restartButton.onclick = () => startGame();
