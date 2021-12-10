function map1() {
    for(let i = 0; i < rows; i++) {
      for(let j = 0; j < cols; j++) {
        grid[i][j].type = PELLET;
      }
    }
    for(let i = 0; i < cols; i++) {
      grid[0][i].type = WALL;
      grid[rows-1][i].type = WALL;
    }
    for(let i = 0; i < rows; i++) {
      grid[i][0].type = WALL;
      grid[i][cols-1].type = WALL;
    }
    grid[10][0].type = WALL;
    // grid[10][0].score = false;
    grid[1][13].type = WALL;
    grid[2][13].type = WALL;
    grid[4][13].type = WALL;
    grid[5][13].type = WALL;
    grid[6][13].type = WALL;
    grid[4][12].type = WALL;
    grid[4][11].type = WALL;
    grid[4][10].type = WALL;
    grid[12][13].type = WALL;
    grid[13][13].type = WALL;
    grid[14][13].type = WALL;
    grid[16][13].type = WALL;
    grid[17][13].type = WALL;
    grid[18][13].type = WALL;
    grid[2][2].type = WALL;
    grid[2][3].type = WALL;
    grid[2][4].type = WALL;
    grid[3][2].type = WALL;
    grid[3][3].type = WALL;
    grid[3][4].type = WALL;
    grid[4][2].type = WALL;
    grid[4][3].type = WALL;
    grid[4][4].type = WALL;
    grid[6][2].type = WALL;
    grid[6][3].type = WALL;
    grid[6][4].type = WALL;
    grid[2][6].type = WALL;
    grid[2][7].type = WALL;
    grid[2][8].type = WALL;
    grid[3][6].type = WALL;
    grid[3][7].type = WALL;
    grid[3][8].type = WALL;
    grid[4][6].type = WALL;
    grid[4][7].type = WALL;
    grid[4][8].type = WALL;
    grid[2][9].type = WALL;
    grid[2][10].type = WALL;
    grid[2][11].type = WALL;
    grid[8][1].type = WALL;
    grid[8][2].type = WALL;
    grid[8][3].type = WALL;
    grid[8][4].type = WALL;
    grid[8][5].type = WALL;
    grid[8][6].type = WALL;
    grid[9][1].type = WALL;
    grid[9][2].type = WALL;
    grid[9][3].type = WALL;
    grid[9][4].type = WALL;
    grid[9][5].type = WALL;
    grid[9][6].type = WALL;
    grid[11][1].type = WALL;
    grid[11][2].type = WALL;
    grid[11][3].type = WALL;
    grid[11][4].type = WALL;
    grid[11][5].type = WALL;
    grid[11][6].type = WALL;
    grid[12][1].type = WALL;
    grid[12][2].type = WALL;
    grid[12][3].type = WALL;
    grid[12][4].type = WALL;
    grid[12][5].type = WALL;
    grid[12][6].type = WALL;
    grid[6][6].type = WALL;
    grid[6][7].type = WALL;
    grid[6][8].type = WALL;
    grid[6][9].type = WALL;
    grid[6][10].type = WALL;
    grid[6][11].type = WALL;
    grid[7][8].type = WALL;
    grid[8][8].type = WALL;
    grid[9][8].type = WALL;
    grid[11][8].type = WALL;
    grid[12][8].type = WALL;
    grid[8][10].type = WALL;
    grid[8][11].type = WALL;
    grid[8][12].type = WALL;
    grid[9][10].type = WALL;
    grid[10][10].type = WALL;
    grid[11][10].type = WALL;
    grid[12][10].type = WALL;
    grid[12][11].type = WALL;
    grid[12][12].type = WALL;
    grid[14][2].type = WALL;
    grid[14][3].type = WALL;
    grid[14][4].type = WALL;
    grid[15][4].type = WALL;
    grid[16][4].type = WALL;
    grid[16][5].type = WALL;
    grid[16][6].type = WALL;
    grid[14][6].type = WALL;
    grid[14][7].type = WALL;
    grid[14][8].type = WALL;
    grid[14][9].type = WALL;
    grid[14][10].type = WALL;
    grid[14][11].type = WALL;
    grid[16][12].type = WALL;
    grid[16][11].type = WALL;
    grid[16][10].type = WALL;
    grid[16][1].type = WALL;
    grid[16][2].type = WALL;
    grid[18][2].type = WALL;
    grid[18][3].type = WALL;
    grid[18][4].type = WALL;
    grid[18][5].type = WALL;
    grid[18][6].type = WALL;
    grid[18][7].type = WALL;
    grid[18][8].type = WALL;
    grid[18][9].type = WALL;
    grid[18][10].type = WALL;
    grid[18][11].type = WALL;
    grid[17][8].type = WALL;
    grid[16][8].type = WALL;
    for(let i = 0; i < cols/2 +1; i++) {
      for(let j = 0; j < rows; j++) {
        let temp = grid[j][i].type;
        if (temp == WALL) {
          grid[j][26-i].type = WALL;
        }
      }
    }
    for(let i = 0; i < rows; i++) {
      grid[i][cols-1].type = WALL;
    }
    grid[10][26].type = WALL;
    // grid[10][26].type = "";
    for(let i = 10; i < 17; i++) {
      for(let j = 8; j < 12; j++) {
        if (grid[j][i].type != WALL) {
          grid[j][i].type = "";
        }
      }
    }
    grid[3][1].type = POWER_PELLET;
    grid[3][25].type = POWER_PELLET;
    grid[15][1].type = POWER_PELLET;
    grid[15][25].type = POWER_PELLET;
    grid[15][13].type = "";
  }
  