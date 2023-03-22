const button = document.querySelectorAll(".button-option");
const popup = document.querySelector(".popup");
const newgame = document.getElementById("new-game");
const restart = document.getElementById("restart");
const message = document.getElementById("message");

//Winning Pattern Array
const win = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//Player 'X' plays first
let currentPlayerX= 'X'
let xTurn = true;
let count = 0;

//Disable All Buttons
const disableButtons = () => {
  button.forEach((element) => (element.disabled = true));
  //enable popup
  popup.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  button.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popup.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (XorO) => {
  disableButtons();
  if (XorO == "X") {
    message.innerHTML = "X wins the game!";
  } else {
    message.innerHTML = "O wins the game!";
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  message.innerHTML = "Try Again!";
};

//New Game
newgame.addEventListener("click", () => {
  currentPlayerX = 'X';
  count = 0;
  enableButtons();
});
restart.addEventListener("click", () => {
  currentPlayerX = 'X';
  count = 0;
  enableButtons();
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of win) {
    let [element1, element2, element3] = [
      button[i[0]].innerText,
      button[i[1]].innerText,
      button[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
button.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display Y
      element.innerText = "O";
      element.disabled = true;
    }
    //Increment count on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check for win on every click
    winChecker();
  });
});
//Enable Buttons and disable popup on page load
window.onload = enableButtons;