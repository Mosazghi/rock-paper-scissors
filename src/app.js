function getComputerChoice() {
  let choices = ["ROCK", "PAPER", "SCISSORS"];
  return choices[Math.floor(Math.random() * choices.length)];
}

let pScore = 0;
let cScore = 0;

const buttons = document.querySelectorAll(".selection");

const playerScore = document.querySelector("#player");
const computerScore = document.querySelector("#computer");
const winnerText = document.querySelector("#winner");

let isRoundInProgress = false;
let gameIsFinished = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (gameIsFinished || isRoundInProgress) {
      return;
    }

    isRoundInProgress = true;

    let playerChoice = button.id;
    let computerChoice = getComputerChoice();
    let round = playRound(playerChoice, computerChoice);
    displayRoundText(round, playerChoice, computerChoice);

    playerScore.textContent = pScore.toString();
    computerScore.textContent = cScore.toString();

    if (pScore === 5 || cScore === 5) {
      resetGame();
    }

    setTimeout(() => {
      isRoundInProgress = false;
    }, 500);
  });
});

function playRound(player, computer) {
  console.log("Computer:", computer);
  console.log("Player:", player);
  if (player === computer) {
    return "d";
  } else if (
    (player === "ROCK" && computer === "SCISSORS") ||
    (player === "PAPER" && computer === "ROCK") ||
    (player === "SCISSORS" && computer === "PAPER")
  ) {
    pScore++;
    return "p";
  } else {
    cScore++;
    return "c";
  }
}

function displayRoundText(round, playerChoice, computerChoice) {
  let roundText = document.querySelector("#displayRoundWinner");

  round === "p" || round === "c"
    ? round === "p"
      ? (roundText.innerHTML = `You win! 
      <span style="color: green;">${playerChoice}</span>
     beats  <span style="color: red;">${computerChoice}</span>!`)
      : (roundText.innerHTML = `You lose!  <span style="color: red;">${computerChoice}</span> beats  <span style="color: green;">${playerChoice}</span>!`)
    : (roundText.innerHTML = `It's a draw! <span style="color: gray;">${playerChoice}</span> and <span style="color: gray;">${computerChoice}</span>!`);
}

function resetGame() {
  gameIsFinished = true;
  disableButtons();
  pScore > cScore
    ? (winnerText.innerHTML = "You win the game!")
    : (winnerText.innerHTML = "You lose the game!");
  let resetButton = document.getElementById("reset");
  resetButton.hidden = false;
  resetButton.addEventListener("click", () => {
    gameIsFinished = false;
    window.location.reload();
  });
}

function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}
