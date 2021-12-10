class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.type = "";
      this.time = 0; // for flashing power pellets
    }
    
    show() {
      if (this.type == WALL) {
        fill(13, 13, 87); // #2121DE
        rect(this.x, this.y, CELL_SIZE, CELL_SIZE);
      } else if (this.type == PELLET) {
        fill(255, 255, 0); // #FFFF00
        ellipse(this.x, this.y, CELL_SIZE / 5);
      } else if (this.type == POWER_PELLET) {
        fill(255, 255, 0); // #FFFF00
        // make it flash
        if (this.time % 50 < 20) {
          fill(0); // disappears
        }
        ellipse(this.x, this.y, CELL_SIZE / 2);
        this.time++;
        if (this.time == 10000) {
          this.time = 0; // after a while, reset time
        }
      }
    }
    
    updateScore() {
      if (this.type == PELLET || this.type == POWER_PELLET) {
        if (checkCollision(pacman.x, pacman.y, this.x, this.y)) {
          score++;
          if (this.type == POWER_PELLET) {
            let time = 8000;
            this.type = "";
            // TODO: make ghosts killable
            for(let i = 0; i < numGhosts; i++) {
              ghosts[i].isVulnerable = true;
              setTimeout(() => {
                for(let i = 0; i < numGhosts; i++) {  
                  ghosts[i].isVulnerable = false;
                }
              }, time);
            }
          } else {
            this.type = "";
          }
        }
      }
    }
  }