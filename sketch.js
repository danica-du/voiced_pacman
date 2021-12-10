const CELL_SIZE = 20;
const WALL = "wall";
const PELLET = "pellet";
const POWER_PELLET = "power pellet";
// game states
const START = "start";
const START_2 = "start 2"; // game rules page
const IN_GAME = "in game"
const GAME_OVER = "game over";
const YOU_WON = "you won";

let grid = [];
let rows, cols;
let gameWidth = 26*CELL_SIZE;
let gameHeight = 20*CELL_SIZE;
let neighbors = [];

let pacman;
let ghosts = [];
let numGhosts = 4;

let userDirection; // 0 if up arrow, 1 if right arrow, 2 if down arrow, 3 left arrow

let score;
let gameState;
let gameControlMode; // "v" for voiced or "k" for keys

// global variables teachable machine model
let classifier;
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/gnHp0uSHL/model.json';
let label = "Background Noise"; // or "up", "right", "down", "left"

function preload() {
  gameOverFont = loadFont('assets/emulogic.ttf');
  classifier = ml5.soundClassifier(soundModelURL); // teachable machine model
}

function setup() {
  createCanvas(gameWidth, gameHeight + 40);
  // the sound model will continuously listen to the microphone
  if (gameControlMode == 'v') {
    classifier.classify(gotResult);
  }
  
  rectMode(CENTER); // first two params of rect() are center coords of rectangle
  reset()
}

// the model will trigger this event when a sound is recognized
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // results are in an array ordered by confidence
  label = results[0].label != label && results[0].confidence > 0.5 ? results[0].label : label;
  // console.log(label);
}

function reset() {
  gameState = START;
  score = 0;
  loop();
  noStroke();
  rows = gameHeight / CELL_SIZE + 1;
  cols = gameWidth / CELL_SIZE + 1;
  for(let i = 0; i < rows; i++) {
    grid[i] = [];
    for(let j = 0; j < cols; j++) {
      grid[i][j] = new Cell(CELL_SIZE*(j + 0), CELL_SIZE*(i + 0));
    }
  }
  for(let i = 0; i < numGhosts; i++) {
    let rx = round(random(11, 15));
    let ry = round(random(9, 11));
    ghosts[i] = new Ghost(CELL_SIZE*rx, CELL_SIZE*ry, CELL_SIZE);
  }
  pacman = new Pacman(13 * CELL_SIZE, 15 * CELL_SIZE);
  map1();
}

function draw() {
  drawScreen();
}

function drawScreen() {
  switch(gameState) {
    case START:
      background(0); 
      textFont(gameOverFont);
      textAlign(CENTER);
      fill(220, 220, 50);
      textSize(30);
      text('VOICED', gameWidth / 2, gameHeight / 2 - 50);
      textSize(55);
      text('PAC-MAN', gameWidth / 2, gameHeight / 2 + 15);
      fill(255, 255, 255);
      textSize(12);
      text('Press "ENTER" to continue.', gameWidth / 2, gameHeight / 2 + 95);
      break;
    case START_2:
      background(0); 
      textFont(gameOverFont);
      textAlign(LEFT);
      fill(255, 255, 255);
      textSize(24);
      text('GAME RULES', 30, 60);
      textSize(12);
      text("Press 'k' to play with traditional \nkeyboard controls.", 30, 130);
      text("Press 'v' to play with voiced controls \nby saying 'up', 'right', 'down', \nor 'left'.", 30, 200);
      text("Press 'ESCAPE' anytime to return to \nthe start screen.", 30, 320);
      break;  
    case IN_GAME:
      if (gameControlMode == "v") {
        if (label == "up") {
          userDirection = 0;
        } else if (label == "right") {
          userDirection = 1;
        } else if (label == "down") {
          userDirection = 2;
        } else if (label == "left") {
          userDirection = 3;
        } 
      }
      
      background(0); 
      for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
          grid[i][j].show();
          grid[i][j].updateScore();
        }
      }
      pacman.show();
      pacman.move();
      ghosts[0].show(0, 255,0);
      ghosts[1].show(255, 25,140);
      ghosts[2].show(255, 15, 0);
      ghosts[3].show(50, 155, 255);

      for(let i = 0; i < numGhosts; i++) {
        ghosts[i].move();
        ghosts[i].kill();
      }
      
      textSize(15);
      textFont(gameOverFont);
      textAlign(LEFT);
      fill(255, 255, 255);
      scoreStr = 'Score:' + score;
      text(scoreStr, 5, height - 8);
      
      if(win()) {
        setTimeout(noLoop, 100);
        gameState = YOU_WON;
      }
      break;
    case GAME_OVER:
      setTimeout(noLoop, 100);
      fill(20, 20, 20, 80);
      rect(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight);
      
      fill(255, 0, 0);
      textSize(35);
      textFont(gameOverFont);
      textAlign(CENTER);
      text('GAME OVER', gameWidth / 2, gameHeight / 2);
      
      textSize(12);
      text('Press "r" to restart', gameWidth / 2, gameHeight / 2 + 30);
      break;
    case YOU_WON:
      noLoop();
      fill(20, 20, 20, 00);
      rect(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight);
      
      fill(220, 220, 50);
      textSize(35);
      textFont(gameOverFont);
      textAlign(CENTER);
      text('YOU WON!', gameWidth / 2, gameHeight / 2);
      
      textSize(12);
      text('Press "r" to restart', gameWidth / 2, gameHeight / 2 + 30);
      break;
  }
}

function keyPressed() {
  if (gameState == START && keyCode == ENTER) {
    gameState = START_2;
  }
  
  if (gameState == START_2 && key == 'v') {
    gameControlMode = 'v';
    gameState = IN_GAME;
  } else if (gameState == START_2 && key == 'k') {
    gameControlMode = 'k';
    gameState = IN_GAME;
  }
  
  if (keyCode == ESCAPE || (gameState == GAME_OVER && key == 'r')) {
    reset();
  }
  
  if (gameControlMode == 'k') {
    if (keyCode == UP_ARROW) {
      userDirection = 0;
    } else if (keyCode == RIGHT_ARROW) {
      userDirection = 1;
    } else if (keyCode == DOWN_ARROW) {
      userDirection = 2;
    } else if (keyCode == LEFT_ARROW) {
      userDirection = 3;
    } 
  }

}

/**
 * Returns true if there are no pellets/power pellets remaining in the grid.
 */
function win() {
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      if(grid[i][j].type == PELLET || grid[i][j].type == POWER_PELLET) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Given coordinates of two objects, return true if a collision
 * is detected. Otherwise return false.
 */
function checkCollision(x1, y1, x2, y2) {
  let distance = dist(x1, y1, x2, y2);
  if (distance < CELL_SIZE / 2) {
    return true;
  } else {
    return false;
  }
}

/**
 * Returns a list of neighbors.
*/
function getNeighbors(x0, y0) {
  let c = floor(x0 / CELL_SIZE);
  let r = floor(y0 / CELL_SIZE);
  let neighbors = [];
  if (r > 0) { // top neighbor
    append(neighbors, grid[r-1][c]);
  }
  if (c <= grid[0].length) { // right neighbor
    append(neighbors, grid[r][c+1]);
  }
  if (r <= grid.length) { // bottom neighbor
    append(neighbors, grid[r+1][c]);
  }
  if (c > 0) { // left neighbor
    append(neighbors, grid[r][c-1]);
  }
  return neighbors;
}

/**
 * Returns a list of valid directions.
*/
function getValidDirections(x, y, neighbors) {
  // let neighbors = getNeighbors(x, y); 
  let validDirections = [];
  
  for (let i = 0; i < neighbors.length; i++) {
    currNeighbor = neighbors[i];
    
    if (currNeighbor.type != WALL) {
      if (currNeighbor.y + CELL_SIZE == y) { // top neighbor
        append(validDirections, 0);
      } else if (currNeighbor.x - CELL_SIZE == x) { // right neighbor
        append(validDirections, 1);
      } else if (currNeighbor.y - CELL_SIZE == y) { // bottom neighbor
        append(validDirections, 2);
      } else if (currNeighbor.x + CELL_SIZE == x) { // left neighbor
        append(validDirections, 3);
      }
    }
  }
  
  return validDirections;
}
