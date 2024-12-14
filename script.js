
document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById('player');
  const gameContainer = document.getElementById('game-container');

  // Health bar
  let health = 100;
  const healthBarFill = document.querySelector('.health-bar-fill');

  // Player position
  let playerX = 400;
  let playerY = 300;

  // Game dimensions
  const gameWidth = 800;
  const gameHeight = 600;

  // Movement speed
  const moveSpeed = 5;
  let isWalking = false;

  // Generate procedural world
  function generateProceduralWorld() {
    gameContainer.innerHTML = '';
    gameContainer.appendChild(player);

    // Add stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * gameWidth}px`;
      star.style.top = `${Math.random() * gameHeight}px`;
      gameContainer.appendChild(star);
    }

    // Add red balls (danger)
    for (let i = 0; i < 5; i++) {
      const danger = document.createElement('div');
      danger.className = 'danger';
      danger.style.left = `${Math.random() * gameWidth}px`;
      danger.style.top = `${Math.random() * gameHeight}px`;
      gameContainer.appendChild(danger);
    }
  }

  // Update health bar
  function updateHealth(amount) {
    health = Math.max(0, health + amount);
    healthBarFill.style.width = `${health}%`;
    if (health === 0) {
      alert('Game Over!');
      health = 100;
      generateProceduralWorld();
      updateHealth(0);
    }
  }

  // Check collisions
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
        updateHealth(-10);
        danger.remove();
      }
    });
  }

  // Update player position
  function updatePlayerPosition() {
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
    checkCollisions();
  }

  // Handle keyboard events
  document.addEventListener('keydown', (e) => {
    if (!isWalking) {
      player.classList.add('walking');
      isWalking = true;
    }
    switch (e.key) {
      case 'ArrowUp':
        if (playerY > 0) playerY -= moveSpeed;
        break;
      case 'ArrowDown':
        if (playerY < gameHeight - 32) playerY += moveSpeed;
        break;
      case 'ArrowLeft':
        if (playerX > 0) playerX -= moveSpeed;
        break;
      case 'ArrowRight':
        if (playerX < gameWidth - 32) playerX += moveSpeed;
        else {
          generateProceduralWorld();
          playerX = 10;
        }
        break;
    }
    updatePlayerPosition();
  });

  document.addEventListener('keyup', () => {
    player.classList.remove('walking');
    isWalking = false;
  });

  // Initialize game
  generateProceduralWorld();
  updatePlayerPosition();
  updateHealth(0);
});
