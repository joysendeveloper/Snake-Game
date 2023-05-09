// console.clear();
let palyBoard = document.querySelector(".play-board");
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 10,
  snakeY = 5;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let setInterId;
let score = 0;

// Getting High Score From local Storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score : ${highScore}`;

const changeFoodPosition = () => {
  // changing random position between (0-30) of food
  foodX = Math.ceil(Math.random() * 30);
  foodY = Math.ceil(Math.random() * 30);
};

const handelGameOver = () => {
  clearInterval(setInterId);
  alert("Game Over. Press OK");
  location.reload();
};

const changeDirection = (e) => {
  // Changing Velocity value based on key press
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityY = +1;
    velocityX = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityY = 0;
    velocityX = +1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityY = 0;
    velocityX = -1;
  } else {
    // console.log("Please!!! Press The Arrow Key");
  }
  //   initGame();
  console.log(e.key);
};

const initGame = () => {
  if (gameOver) return handelGameOver();
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;

  //   Change food position after snake eat it
  if (foodX === snakeX && foodY === snakeY) {
    changeFoodPosition();
    // Pushing food eating position to snakeBody Array
    snakeBody.push([foodX, foodY]);
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score : ${score}`;
    highScoreElement.innerText = `High Score : ${highScore}`;
    console.log(snakeBody);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  //   Setting the head of the snake to snake Position
  snakeBody[0] = [snakeX, snakeY];

  //Updating snake head position value based on current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    // Adding a div where the snake eat the food
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    )
      handelGameOver();
  }
  palyBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setInterId = setInterval(initGame, 100);
document.addEventListener("keydown", changeDirection);
