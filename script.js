const size = 20;
var direction = null;
var maxX, maxY;
var food = { x: 5, y: 5 };
var justAte = false;

var snake = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 5, y: 0 },
];

function calculateGameArea() {
  const gameArea = document.getElementById("snakeMove");
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const widthTimes = Math.floor(windowWidth / size);
  maxX = widthTimes - 1;
  const heightTimes = Math.floor(windowHeight / size);
  maxY = heightTimes - 1;
  gameArea.style.width = widthTimes * size + "px";
  gameArea.style.height = heightTimes * size + "px";
}

calculateGameArea();

function randomFoodPosition() {
  const foodX = Math.floor(Math.random() * maxX);
  const foodY = Math.floor(Math.random() * maxY);
  food = { x: foodX, y: foodY };
}

randomFoodPosition();

function drawFood() {
  const foodDiv = document.createElement("div");
  foodDiv.style.position = "absolute";
  foodDiv.style.width = size + "px";
  foodDiv.style.height = size + "px";
  foodDiv.style.backgroundColor = "blue";
  foodDiv.style.top = food.y * size + "px";
  foodDiv.style.left = food.x * size + "px";
  document.getElementById("snakeMove").appendChild(foodDiv);
  console.log(foodDiv);
}

drawFood();

function drawSnake() {
  snake.forEach((part, index) => {
    drawSnakePart(part.x, part.y, index);
  });
}

function drawSnakePart(x, y, index) {
  //    create an empty div
  // is last item
  const snakePart = document.createElement("div");
  snakePart.style.position = "absolute";
  snakePart.style.width = size + "px";
  snakePart.style.height = size + "px";
  if (index === snake.length - 1) {
    snakePart.style.backgroundColor = "red";
  } else {
    snakePart.style.backgroundColor = "green";
  }
  snakePart.style.top = y * size + "px";
  snakePart.style.left = x * size + "px";
  snakePart.style.zIndex = 5;
  document.getElementById("snakeMove").appendChild(snakePart);
}

drawSnake();

setInterval(() => {
  if (direction === null) return;

  const head = snake[snake.length - 1];
  let newHead;

  if (direction === "right") {
    newHead = { x: head.x + 1, y: head.y };
  } else if (direction === "left") {
    newHead = { x: head.x - 1, y: head.y };
  } else if (direction === "up") {
    newHead = { x: head.x, y: head.y - 1 };
  } else if (direction === "down") {
    newHead = { x: head.x, y: head.y + 1 };
  }

  if (newHead.x < 0) {
    newHead.x = maxX;
  } else if (newHead.x > maxX) {
    newHead.x = 0;
  } else if (newHead.y < 0) {
    newHead.y = maxY;
  } else if (newHead.y > maxY) {
    newHead.y = 0;
  }

  //    if newHead's coordinates are the same with any of snakeParts' coordinates
  //    then game over
  for (let i = 0; i < snake.length - 1; i++) {
    if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
      console.log("Game Over");
      return;
    }
  }

  if (food.x === newHead.x && food.y === newHead.y) {
    justAte = true;
    randomFoodPosition();
  }

  snake.push(newHead);

  if (!justAte) {
    snake.shift();
  } else {
    justAte = false;
  }

  document.getElementById("snakeMove").innerHTML = "";
  drawSnake();
  drawFood();
}, 100);

// listen to keypress events and change the direction of the snake
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    // if currently goes to the left and snake has at least 2 parts dont change direction
    if (direction === "left" && snake.length > 1) return;
    direction = "right";
  } else if (event.key === "ArrowLeft") {
    if (direction === "right" && snake.length > 1) return;
    direction = "left";
  } else if (event.key === "ArrowUp") {
    if (direction === "down" && snake.length > 1) return;
    direction = "up";
  } else if (event.key === "ArrowDown") {
    if (direction === "up" && snake.length > 1) return;
    direction = "down";
  }
});
