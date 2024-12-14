
document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById('player');
  const gameContainer = document.getElementById('game-container');
  const healthBarFill = document.querySelector('.health-bar-fill');

  let health = 100;
  let playerX = 400;
  let playerY = 300;
  const moveSpeed = 10; // Increased movement speed
  const playerSize = 64;

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

    for (let i = 0; i < 5; i++) {
      const danger = document.createElement('div');
      danger.className = 'danger';
      danger.style.left = `${Math.random() * 800}px`;
      danger.style.top = `${Math.random() * 600}px`;
      gameContainer.appendChild(danger);
    }
  }

  // Update health
  function updateHealth(amount) {
    health = Math.max(0, health + amount);
    healthBarFill.style.width = `${health}%`;
    if (health === 0) {
      alert('Game Over! Restarting world...');
      health = 100;
      generateProceduralWorld();
    }
  }

  // Update player position
  function updatePlayerPosition() {
    if (playerX < 0) {
      playerX = 800 - playerSize;
      generateProceduralWorld();
    } else if (playerX > 800 - playerSize) {
      playerX = 0;
      generateProceduralWorld();
    } else if (playerY < 0) {
      playerY = 600 - playerSize;
      generateProceduralWorld();
    } else if (playerY > 600 - playerSize) {
      playerY = 0;
      generateProceduralWorld();
    }

    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
  }

  // Movement functions
  function moveUp() {
    playerY -= moveSpeed;
    updatePlayerPosition();
  }

  function moveDown() {
    playerY += moveSpeed;
    updatePlayerPosition();
  }

  function moveLeft() {
    playerX -= moveSpeed;
    updatePlayerPosition();
  }

  function moveRight() {
    playerX += moveSpeed;
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
