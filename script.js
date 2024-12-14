
document.addEventListener("DOMContentLoaded", () => {
  const startMenu = document.getElementById('start-menu');
  const gameContainer = document.getElementById('game-container');
  const healthBar = document.querySelector('.health-bar');
  const controls = document.getElementById('controls');
  const startButton = document.getElementById('start-button');
  const player = document.getElementById('player');
  const healthBarFill = document.querySelector('.health-bar-fill');

  let health = 100;
  let playerX, playerY;
  let moveSpeed = 30;

  // Start the game
  startButton.addEventListener('click', () => {
    startMenu.style.display = 'none';
    gameContainer.style.display = 'block';
    healthBar.style.display = 'block';
    controls.style.display = 'flex';
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
      alert('Game Over! Restarting world...');
      health = 100;
      healthBarFill.style.width = '100%';
      generateProceduralWorld();
    }
  }

  // Update player position
  function updatePlayerPosition() {
    if (playerX < 0) playerX = 0;
    if (playerX > gameWidth - 64) playerX = gameWidth - 64;
    if (playerY < 0) playerY = 0;
    if (playerY > gameHeight - 64) playerY = gameHeight - 64;

    player.style.position = 'absolute';
    player.style.width = '64px';
    player.style.height = '64px';
    player.style.backgroundImage = "url('astronaut.png')"; // Use character sprite
    player.style.backgroundSize = 'contain';
    player.style.backgroundRepeat = 'no-repeat';
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
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
