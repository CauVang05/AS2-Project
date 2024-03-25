document.addEventListener('DOMContentLoaded', function() {
    const pacman = document.getElementById('pacman');
    const mazeWalls = document.querySelectorAll('.wall');
  
    const speed = 40; // Speed of Pacman's movement (in pixels)
  
    // Function to check collision between Pacman and maze walls
    function checkCollision(direction) {
      const pacmanRect = pacman.getBoundingClientRect();
      let newX = pacman.offsetLeft;
      let newY = pacman.offsetTop;
  
      // Calculate new position based on direction
      if (direction === 'up') {
        newY -= speed;
      } else if (direction === 'down') {
        newY += speed;
      } else if (direction === 'left') {
        newX -= speed;
      } else if (direction === 'right') {
        newX += speed;
      }
  
      // Check for collision with each wall
      for (let wall of mazeWalls) {
        const wallRect = wall.getBoundingClientRect();
        if (
          pacmanRect.right > wallRect.left &&
          pacmanRect.left < wallRect.right &&
          pacmanRect.bottom > wallRect.top &&
          pacmanRect.top < wallRect.bottom
        ) {
          // Collision detected, stop Pacman's movement
          return true;
        }
      }
  
      return false; // No collision detected
    }
  
    // Function to move Pacman
    function movePacman(direction) {
      if (!checkCollision(direction)) {
        let newX = pacman.offsetLeft;
        let newY = pacman.offsetTop;
  
        // Calculate new position based on direction
        if (direction === 'up') {
          newY -= speed;
        } else if (direction === 'down') {
          newY += speed;
        } else if (direction === 'left') {
          newX -= speed;
        } else if (direction === 'right') {
          newX += speed;
        }
  
        // Update Pacman's position
        pacman.style.left = newX + 'px';
        pacman.style.top = newY + 'px';
      }
    }
  
    // Event listener for arrow key presses to move Pacman
    document.addEventListener('keydown', function(event) {
      switch (event.key) {
        case 'ArrowUp':
          movePacman('up');
          break;
        case 'ArrowDown':
          movePacman('down');
          break;
        case 'ArrowLeft':
          movePacman('left');
          break;
        case 'ArrowRight':
          movePacman('right');
          break;
      }
    });
  });
  