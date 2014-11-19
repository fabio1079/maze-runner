/*var WIDTH = canvas.width/10;
var HEIGHT = canvas.height/10;
var START = new Position(1, 1);
var END = new Position(WIDTH-2, HEIGHT-2);
var COLORS_CODES = [
  "#000000", // 0 -> black , emptyspace
  "#ffffff", // 1 -> white , wall
  "#115577", // 2 -> ?     , walked path
  "#ffff00", // 3 -> yellow, correct path
  "#ff0000", // 4 -> red   , end point
];
COLOR_WORDS = {
  empty: 0,
  wall: 1,
  walked: 2,
  correct: 3,
  end: 4
}
*/
/*
 1 1 1 1 1 1 1 1 1 1 1 1
 1 0 1 0 1 0 1 1 0 0 0 1
 1 0 1 0 1 0 1 1 0 1 0 1
 1 0 0 0 0 0 0 1 0 1 0 1
 1 1 1 1 1 0 1 1 0 1 0 1
 1 0 1 1 1 0 0 0 0 1 0 1
 1 0 0 0 0 0 1 0 1 1 0 0
 1 1 1 1 1 1 1 1 1 1 1 1
*/
/*
function maze_grid() {
  var grid = new Array(WIDTH);

  for(var i = 0; i < WIDTH; i++) {
    grid[i] = new Array(HEIGHT);

    for(var j = 0; j < HEIGHT; j++) {
      grid[i][j] = 0;
    }
  }

  for(var i = 0; i < WIDTH; i++) {
    grid[0][i] = 1;
    grid[i][0] = 1;
    grid[WIDTH-1][i] = 1;
    grid[i][HEIGHT-1] = 1;
  }

  return grid;
}


function build_maze(grid) {
  var i, j;

  context.fillStyle = COLORS_CODES[0];
  context.fillRect(0, 0, canvas.width, canvas.height);

  for(i = 0; i < WIDTH; i++) {
    for(j = 0; j < HEIGHT; j++) {
      if( grid[i][j] != 0 ) {
        context.fillStyle = COLORS_CODES[grid[i][j]];
        context.fillRect(i*10, j*10, 10, 10);
      }
    }
  }
}

function create_maze(grid) {
  var i, j;

  for(i = 0; i < WIDTH; i++) {
    for(j = 0; j < HEIGHT; j++) {
      if( parseInt(Math.random()*10) <= 2 ) {
        grid[i][j] = 1;
      }
    }
  }

  grid[1][1] = COLOR_WORDS.correct;
  grid[WIDTH-2][HEIGHT-2] = COLOR_WORDS.end;

  build_maze(grid);
}
*/