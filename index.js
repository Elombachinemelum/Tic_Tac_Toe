const cells = document.querySelectorAll("[data-cell]");
const container = document.getElementById("container");
let xTurn;
let newUser = true;
let playerName = "";
const classes = ["x", "circle"];
const winningDisplay = document.getElementById("winning-text");
const winningBlock = document.getElementById("win-block");
const restartButton = document.getElementById("restart");
const message = document.getElementById("message");
const intro = document.getElementById("intro");
const input = document.querySelector("[data-input]");
const button = document.getElementById("submit");
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

const tray = [
  `Hey, Tray. Always remember you can do anything you put your mind to. You just have to focus. <br>❤️`,
  `Welcome back, Tray🤗`,
];

const startGame = () => {
  xTurn = true;
  container.className = "container x";
  if (newUser) {
    container.classList.add("hidden");
    intro.classList.remove("hidden");
    message.classList.add("hidden");
  } else message.classList.remove("hidden");

  cells.forEach((cell) => {
    cell.className = "cell";
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningBlock.classList.remove("show");
  newUser = false;
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

restartButton.onclick = () => startGame();
input.oninput = (evt) => {
  playerName = evt.target.value;
};

button.onclick = () => {
  enteredName = playerName.toLocaleLowerCase();
  if (enteredName === "tray" || enteredName === "tracey") {
    message.innerHTML = tray[1];
  } else {
    message.innerText = `Hello${
      enteredName
        ? ", " +
          enteredName.slice(0, 1).toUpperCase() +
          enteredName.slice(1).toLocaleLowerCase() +
          "."
        : "."
    }`;
  }

  container.classList.remove("hidden");
  message.classList.remove("hidden");
  intro.classList.add("hidden");
};
