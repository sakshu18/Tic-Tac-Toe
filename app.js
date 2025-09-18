let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerOInput = document.querySelector("#playerO");
let playerXInput = document.querySelector("#playerX");
let playerForm = document.querySelector("#player-form");
let playerFormContainer = document.querySelector(".player-form-container");
let newNamesBtn = document.querySelector("#new-names-btn");
let turnIndicator = document.querySelector("#turn-indicator");

let turnO = true;
let gameStarted = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");

  // Show whose turn it is
  if (gameStarted) {
    turnIndicator.innerText = `${playerOInput.value || "Player O"}'s Turn`;
  } else {
    turnIndicator.innerText = "";
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (!gameStarted) return;
    if (box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O";
      turnO = false;
      turnIndicator.innerText = `${playerXInput.value || "Player X"}'s Turn`;
    } else {
      box.innerText = "X";
      turnO = true;
      turnIndicator.innerText = `${playerOInput.value || "Player O"}'s Turn`;
    }

    box.disabled = true;

    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  let winnerName = winner === "O" ? playerOInput.value : playerXInput.value;
  if (!winnerName) {
    winnerName = winner;
  }
  msg.innerText = `Congratulations,${winnerName} wins!`;
  msgContainer.classList.remove("hide");
  turnIndicator.innerText = "";
  disableBoxes();
};

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        console.log("winner", pos1Val);
        showWinner(pos1Val);
        winnerFound = true;
        return;
      }
    }
  }

  // Check for draw if no winner
  if (!winnerFound) {
    let isDraw = true;
    boxes.forEach((box) => {
      if (box.innerText === "") {
        isDraw = false;
      }
    });

    if (isDraw) {
      msg.innerText = "It's a Draw!";
      msgContainer.classList.remove("hide");
      turnIndicator.innerText = "";
      disableBoxes();
    }
  }
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

playerForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents page refresh on form submit
  playerFormContainer.classList.add("hide"); // Hides the name input form
  gameStarted = true; // Allows the game to start
  resetGame(); // Optional: clears the board if needed
});

// Play Again with New Names button
newNamesBtn.addEventListener("click", () => {
  gameStarted = false;
  playerFormContainer.classList.remove("hide");
  playerOInput.value = "";
  playerXInput.value = "";
  turnIndicator.innerText = "";
  resetGame();
});
