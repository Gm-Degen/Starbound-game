
document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById('player');
  const gameContainer = document.getElementById('game-container');
  const healthBarFill = document.querySelector('.health-bar-fill');

  let health = 100;
  let playerX = 400;
  let playerY = 300;
  const moveSpeed = 5;

  // Generate procedural world
  function generateProceduralWorld() {
    gameContainer.innerHTML = '';
    gameContainer.appendChild(player);
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 800}px`;
      star.style.top = `${Math.random() * 600}px`;
      gameContainer.appendChild(star);
    }
  }

  // Update health
  function updateHealth(amount) {
    health = Math.max(0, health + amount);
    healthBarFill.style.width = `${health}%`;
    if (health === 0) {
      alert('Game Over!');
      health = 100;
      generateProceduralWorld();
    }
  }

  // Update player position
  function updatePlayerPosition() {
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
  }

  // Movement functions
  function moveUp() {
    if (playerY > 0) playerY -= moveSpeed;
    updatePlayerPosition();
  }

  function moveDown() {
    if (playerY < 600 - 64) playerY += moveSpeed;
    updatePlayerPosition();
  }

  function moveLeft() {
    if (playerX > 0) playerX -= moveSpeed;
    updatePlayerPosition();
  }

  function moveRight() {
    if (playerX < 800 - 64) playerX += moveSpeed;
    updatePlayerPosition();
  }

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') moveUp();
    if (e.key === 'ArrowDown') moveDown();
    if (e.key === 'ArrowLeft') moveLeft();
    if (e.key === 'ArrowRight') moveRight();
  });

  // Touch controls
  document.getElementById('up').addEventListener('click', moveUp);
  document.getElementById('down').addEventListener('click', moveDown);
  document.getElementById('left').addEventListener('click', moveLeft);
  document.getElementById('right').addEventListener('click', moveRight);

  // Initialize game
  generateProceduralWorld();
  updatePlayerPosition();
});
