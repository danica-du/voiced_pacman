let speedX = 0;
let speedY = 0;
let thetaoff = 0;
class Pacman {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.changeX = 0;
    this.changeY = 0;
    this.delta = CELL_SIZE / 10;
    this.d = CELL_SIZE; // diameter
  }
  
  show() {
    fill(220, 220, 50);
    let theta = PI/3*sq(sin(thetaoff))
    if(speedY < 0) {
    arc(this.x, this.y, this.d, this.d, -theta - PI/6, theta + 7*PI/6); 
      } else if(speedY > 0) {
          arc(this.x, this.y, this.d, this.d, -7*PI/6 - theta, theta + PI/6);
      } else if(speedX < 0){
          arc(this.x, this.y, this.d, this.d, theta + PI, -theta + PI);
      } else if(speedX > 0){
          arc(this.x, this.y, this.d, this.d, theta, -theta);
      } else {
          if(userDirection == 0) {
            arc(this.x, this.y, this.d, this.d, -theta - PI/6, theta + 7*PI/6); 
          } else if(userDirection == 1) {
              arc(this.x, this.y, this.d, this.d, theta, -theta);
          } else if(userDirection == 2){
              arc(this.x, this.y, this.d, this.d, -7*PI/6 - theta, theta + PI/6);
          } else if(userDirection == 3){
            arc(this.x, this.y, this.d, this.d, theta + PI, -theta + PI);
          } else {
              arc(this.x, this.y, this.d, this.d, theta, -theta);
          }
      }
    thetaoff += 0.1;
  }
  
  move() {
    if (userDirection != undefined && this.x % CELL_SIZE == 0 && this.y % CELL_SIZE == 0) {
      let neighbors = getNeighbors(this.x, this.y);
      let validDirections = getValidDirections(this.x, this.y, neighbors);
    
    // if userDirection is not in validDirections, no change in x-direction or y-direction
    let isUserDirectionValid = false;
    // check if currDirection is in validDirections
    for (let i = 0; i < validDirections.length; i++) {
      if (userDirection == validDirections[i]) {
        isUserDirectionValid = true;
      }
    }
    if (!isUserDirectionValid) { // no changeX or changeY
      this.changeX = 0;
      this.changeY = 0;
    } else {
      if (userDirection == 0) { // UP
        this.changeX = 0;
        this.changeY = -this.delta;
      } else if (userDirection == 1) { // RIGHT
        this.changeX = this.delta;
        this.changeY = 0;
      } else if (userDirection == 2) { // DOWN
        this.changeX = 0;
        this.changeY = this.delta;
      } else if (userDirection == 3) { // LEFT
        this.changeX = -this.delta;
        this.changeY = 0;
      }
    }
    }
    this.x += this.changeX;
    this.y += this.changeY;
  }
}