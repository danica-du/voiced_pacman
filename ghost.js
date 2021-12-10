class Ghost {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.changeX = 0;
      this.changeY = 0;
      this.delta = CELL_SIZE / 20;
      this.currDirection = int(random([0, 4]))
      this.size = CELL_SIZE;
      this.alive = true;
      this.isVulnerable = false;
    }
    
    show(r, g, b) {
      if (this.alive) {
        if (this.isVulnerable) {
          fill(43, 0, 255);
        } else {
          fill(r, g, b);
        }
        rect(this.x, this.y, this.size, this.size, 5);
      }
    }
    
    kill() {
      if (checkCollision(pacman.x, pacman.y, this.x, this.y)) {
        if (this.alive && this.isVulnerable) {
          this.alive = false;
          score += 50; // TODO: check this?
          // reset location of ghost
          setTimeout(() => {
            this.alive = true;
            this.x = floor(random(11, 15)) * CELL_SIZE; 
            this.y = floor(random(9, 11)) * CELL_SIZE;
          }, 6000)
        } else if (this.alive) {
          gameState = GAME_OVER;
        }
      }
    }
    
    move() {
      if (this.x % CELL_SIZE == 0 && this.y % CELL_SIZE == 0) {
        let neighbors = getNeighbors(this.x, this.y);
        let validDirections = getValidDirections(this.x, this.y, neighbors);
  
        // if currDirection is not in validDirections, replace it with a valid direction
        let isCurrDirectionValid = false;
        // check if currDirection is in validDirections
        for (let i = 0; i < validDirections.length; i++) {
          if (this.currDirection == validDirections[i]) {
            isCurrDirectionValid = true;
          }
        }
        if (!isCurrDirectionValid) {
          this.currDirection = int(random(validDirections));
        } else if (isCurrDirectionValid) {
          // even if current direction is valid, just change
          // directions randomly 25% of the time
          let r = random(1);
          if (r < 0.25) {
            this.currDirection = int(random(validDirections));
          }
        }
  
        if (this.currDirection == 0) { // UP
          this.changeX = 0;
          this.changeY = -this.delta;
        } else if (this.currDirection == 1) { // RIGHT
          this.changeX = this.delta;
          this.changeY = 0;
        } else if (this.currDirection == 2) { // DOWN
          this.changeX = 0;
          this.changeY = this.delta;
        } else if (this.currDirection == 3) { // LEFT
          this.changeX = -this.delta;
          this.changeY = 0;
        }
      }
      this.x += this.changeX;
      this.y += this.changeY;
    }
  }