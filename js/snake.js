function startSnakeGame() {
  const canvas = document.getElementById("snake-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.style.display = "block";

  let grid = 20;
  let snake = [{ x: 200, y: 200 }];
  let dx = grid;
  let dy = 0;

  let food = {
    x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
    y: Math.floor(Math.random() * (canvas.height / grid)) * grid,
  };

  let gameLoop = setInterval(() => {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };
    direction = nextDirection;
    movedThisTick = false;

    // Collision: wall or self
    if (
      head.x < 0 || head.y < 0 ||
      head.x >= canvas.width || head.y >= canvas.height ||
      snake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
      clearInterval(gameLoop);
      canvas.style.display = "none";
      alert("Game Over!");
      return;
    }

    snake.unshift(head);

    // Eat
    if (head.x === food.x && head.y === food.y) {
      food = {
        x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
        y: Math.floor(Math.random() * (canvas.height / grid)) * grid,
      };
    } else {
      snake.pop();
    }

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lime";
    snake.forEach(seg => ctx.fillRect(seg.x, seg.y, grid, grid));
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, grid, grid);
  }, 100);

  // Movement keys
  let direction = { x: 0, y: 0 };
  let nextDirection = direction;
  let movedThisTick = false;

  document.addEventListener("keydown", (e) => {
    if(movedThisTick) return;
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -grid; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = grid; }
    if (e.key === "ArrowLeft" && dx === 0) { dx = -grid; dy = 0; }
    if (e.key === "ArrowRight" && dx === 0) { dx = grid; dy = 0; }
    movedThisTick = true;
  });
}
