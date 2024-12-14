
document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById('player');
  const gameContainer = document.getElementById('game-container');
  const healthBarFill = document.querySelector('.health-bar-fill');

  let health = 100;
  let playerX, playerY;
  let moveSpeed = 15; // Further increased movement speed

  // Update container size dynamically based on the window size
  let gameWidth, gameHeight;

  function resizeGameContainer() {
    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight * 0.7; // 70% of screen height for the game
    gameContainer.style.width = `${gameWidth}px`;
    gameContainer.style.height = `${gameHeight}px`;
  }

  // Center player on the screen
  function centerPlayer() {
    playerX = Math.floor(gameWidth / 2 - 32); // Center horizontally (32px is half the player's width)
    playerY = Math.floor(gameHeight / 2 - 32); // Center vertically (32px is half the player's height)
    updatePlayerPosition();
  }

  // Generate procedural world
  function generateProceduralWorld() {
    gameContainer.innerHTML = '';
    gameContainer.appendChild(player);
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * gameWidth}px`;
      star.style.top = `${Math.random() * gameHeight}px`;
      gameContainer.appendChild(star);
    }

    for (let i = 0; i < 5; i++) {
      const danger = document.createElement('div');
      danger.className = 'danger';
      danger.style.left = `${Math.random() * gameWidth}px`;
      danger.style.top = `${Math.random() * gameHeight}px`;
      gameContainer.appendChild(danger);
    }
    centerPlayer();
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
    // Ensure the player stays within boundaries and triggers map transitions
    if (playerX < 0) {
      playerX = gameWidth - 64;
      generateProceduralWorld();
    } else if (playerX > gameWidth - 64) {
      playerX = 0;
      generateProceduralWorld();
    } else if (playerY < 0) {
      playerY = gameHeight - 64;
      generateProceduralWorld();
    } else if (playerY > gameHeight - 64) {
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

  // Adjust game container size on window resize
  window.addEventListener('resize', () => {
    resizeGameContainer();
    generateProceduralWorld();
  });

  // Initialize game
  resizeGameContainer();
  generateProceduralWorld();
});
