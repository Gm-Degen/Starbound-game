
document.addEventListener("DOMContentLoaded", () => {
  const startMenu = document.getElementById('start-menu');
  const gameContainer = document.getElementById('game-container');
  const healthBar = document.querySelector('.health-bar');
  const controls = document.getElementById('controls');
  const startButton = document.getElementById('start-button');
  const player = document.getElementById('player');
  const healthBarFill = document.querySelector('.health-bar-fill');
  const gameOverScreen = document.createElement('div'); // Game Over screen
  let health = 100;
  let playerX, playerY;
  let moveSpeed = 40;

  // Initialize Game Over screen
  gameOverScreen.style.position = 'absolute';
  gameOverScreen.style.top = 0;
  gameOverScreen.style.left = 0;
  gameOverScreen.style.width = '100%';
  gameOverScreen.style.height = '100%';
  gameOverScreen.style.background = "url('game-over.png') no-repeat center center";
  gameOverScreen.style.backgroundSize = 'cover';
  gameOverScreen.style.display = 'none';
  gameContainer.appendChild(gameOverScreen);

  // Start the game
  startButton.addEventListener('click', () => {
    startMenu.style.display = 'none';
    gameContainer.style.display = 'block';
    healthBar.style.display = 'block';
    controls.style.display = 'block';
    initializeGame();
  });

  // Initialize the game components
  function initializeGame() {
    resizeGameContainer();
    generateProceduralWorld();
    centerPlayer();
    updatePlayerPosition();
  }

  // Update container size dynamically
  let gameWidth, gameHeight;

  function resizeGameContainer() {
    gameWidth = gameContainer.offsetWidth;
    gameHeight = gameContainer.offsetHeight;
  }

  // Center player on the screen
  function centerPlayer() {
    playerX = Math.floor(gameWidth / 2 - 32); // Adjust for character size
    playerY = Math.floor(gameHeight / 2 - 32);
    updatePlayerPosition();
  }

  // Generate procedural world
  function generateProceduralWorld() {
    gameContainer.innerHTML = ''; // Clear previous elements
    gameContainer.appendChild(player); // Add the player
    gameContainer.appendChild(gameOverScreen); // Add Game Over screen

    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.position = 'absolute';
      star.style.width = '4px';
      star.style.height = '4px';
      star.style.backgroundColor = 'white';
      star.style.left = `${Math.random() * gameWidth}px`;
      star.style.top = `${Math.random() * gameHeight}px`;
      gameContainer.appendChild(star);
    }

    for (let i = 0; i < 5; i++) {
      const danger = document.createElement('div');
      danger.className = 'danger';
      danger.style.position = 'absolute';
      danger.style.width = '20px';
      danger.style.height = '20px';
      danger.style.backgroundColor = 'red';
      danger.style.borderRadius = '50%';
      danger.style.left = `${Math.random() * gameWidth}px`;
      danger.style.top = `${Math.random() * gameHeight}px`;
      gameContainer.appendChild(danger);
    }
  }

  // Update health
  function updateHealth(amount) {
    health = Math.max(0, health + amount);
    healthBarFill.style.width = `${health}%`;
    if (health === 0) {
      triggerGameOver(); // Show Game Over when health is zero
    }
  }

  // Trigger Game Over screen
  function triggerGameOver() {
    gameOverScreen.style.display = 'block';
    setTimeout(() => {
      gameOverScreen.style.display = 'none';
      health = 100; // Reset health
      healthBarFill.style.width = '100%';
      generateProceduralWorld(); // Restart the world
      centerPlayer(); // Center the player again
    }, 3000); // Show Game Over for 3 seconds
  }

  // Check collision with dangers
  function checkCollisions() {
    const dangers = document.querySelectorAll('.danger');
    dangers.forEach((danger) => {
      const dangerRect = danger.getBoundingClientRect();
      const playerRect = player.getBoundingClientRect();

      if (
        playerRect.left < dangerRect.right &&
        playerRect.right > dangerRect.left &&
        playerRect.top < dangerRect.bottom &&
        playerRect.bottom > dangerRect.top
      ) {
        updateHealth(-10); // Decrease health by 10
        danger.remove(); // Remove the danger after collision
      }
    });
  }

  // Update player position and check for edge transitions
  function updatePlayerPosition() {
    if (playerX < 0) {
      playerX = gameWidth - 64;
      generateProceduralWorld(); // Switch to a new map
    }
    if (playerX > gameWidth - 64) {
      playerX = 0;
      generateProceduralWorld(); // Switch to a new map
    }
    if (playerY < 0) {
      playerY = gameHeight - 64;
      generateProceduralWorld(); // Switch to a new map
    }
    if (playerY > gameHeight - 64) {
      playerY = 0;
      generateProceduralWorld(); // Switch to a new map
    }

    player.style.position = 'absolute';
    player.style.width = '64px';
    player.style.height = '64px';
    player.style.backgroundImage = "url('new_astronaut.png')"; // Use new astronaut sprite
    player.style.backgroundSize = 'contain';
    player.style.backgroundRepeat = 'no-repeat';
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    checkCollisions(); // Check for collisions after updating position
  }

  // Movement functions
  function moveUp() { playerY -= moveSpeed; updatePlayerPosition(); }
  function moveDown() { playerY += moveSpeed; updatePlayerPosition(); }
  function moveLeft() { playerX -= moveSpeed; updatePlayerPosition(); }
  function moveRight() { playerX += moveSpeed; updatePlayerPosition(); }

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
});
