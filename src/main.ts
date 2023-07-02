function getComputerChoice() {
  let choices: string[] = ["ROCK", "PAPER", "SCISSORS"];
  return choices[Math.floor(Math.random() * choices.length)];
}

let pScore = 0;
let cScore = 0;

function playRound(player: string, computer: string) {
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

  // switch (player) {
  //   case "ROCK":
  //     if (computer == "SCISSORS") {
  //       return "p";
  //     } else if (computer == "PAPER") {
  //       return "c";
  //     } else {
  //       return "d";
  //     }
  //   case "PAPER":
  //     if (computer == "ROCK") {
  //       return "p";
  //     } else if (computer == "SCISSORS") {
  //       return "c";
  //     } else {
  //       return "d";
  //     }
  //   case "SCISSORS":
  //     if (computer == "PAPER") {
  //       return "p";
  //     } else if (computer == "ROCK") {
  //       return "c";
  //     } else {
  //       return "d";
  //     }
  //   default:
  //     return "e";
  // }
}

const buttons = document.querySelectorAll(
  ".selection"
) as NodeListOf<HTMLButtonElement>;

const playerScore = document.querySelector("#player") as HTMLSpanElement;
const computerScore = document.querySelector("#computer") as HTMLSpanElement;
const winnerText = document.querySelector("#winner") as HTMLParagraphElement;

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

function displayRoundText(
  round: string,
  playerChoice: string,
  computerChoice: string
) {
  let roundText = document.querySelector(
    "#displayRoundWinner"
  ) as HTMLParagraphElement;

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
  let resetButton = document.getElementById("reset") as HTMLButtonElement;
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
