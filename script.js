
document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById('player');
  const gameContainer = document.getElementById('game-container');
  const healthBarFill = document.querySelector('.health-bar-fill');

  let health = 100;
  let playerX, playerY;
  let moveSpeed = 30; // Faster movement speed

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

  // Show Game Over screen
  function showGameOverScreen() {
    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'game-over-screen';
    gameOverScreen.style.position = 'fixed';
    gameOverScreen.style.top = '0';
    gameOverScreen.style.left = '0';
    gameOverScreen.style.width = '100%';
    gameOverScreen.style.height = '100%';
    gameOverScreen.style.background = "url('game-over.png') no-repeat center center";
    gameOverScreen.style.backgroundSize = 'contain'; // Resized to fit better
    gameOverScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Add a slight overlay
    gameOverScreen.style.zIndex = '1000';
    document.body.appendChild(gameOverScreen);

    setTimeout(() => {
      gameOverScreen.remove();
      health = 100; // Reset health
      healthBarFill.style.width = '100%'; // Reset the health bar
      generateProceduralWorld(); // Generate a new map
    }, 3000); // Display Game Over screen for 3 seconds
  }

  // Update health and check for Game Over
  function updateHealth(amount) {
    health = Math.max(0, health + amount);
    healthBarFill.style.width = `${health}%`;
    if (health === 0) {
      showGameOverScreen();
    }
  }

  // Check collisions with dangers
  function checkCollisions() {
    const dangers = document.querySelectorAll('.danger');
    dangers.forEach((danger) => {
      const rect1 = player.getBoundingClientRect();
      const rect2 = danger.getBoundingClientRect();
      if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      ) {
        danger.remove(); // Remove the danger after collision
        updateHealth(-10); // Lose 10 points of health
      }
    });
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
    checkCollisions(); // Check for collisions after updating position
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
