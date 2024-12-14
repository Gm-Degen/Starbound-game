
document.addEventListener("DOMContentLoaded", () => {
  console.log("Game loaded. Prepare for Starbound!");

  // Recalculate game container size based on screen size
  function resizeGame() {
    const gameContainer = document.getElementById('game-container');
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      gameContainer.style.width = `${window.innerWidth}px`;
      gameContainer.style.height = `${window.innerHeight * 0.7}px`;
    } else {
      gameContainer.style.width = '800px';
      gameContainer.style.height = '600px';
    }
  }

  // Apply adjustments on load and resize
  window.addEventListener('resize', resizeGame);
  resizeGame();
});
