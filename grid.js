var Grid = (function(){
  var $CANVAS, $WIDTH, $HEIGHT, $COLORS_CODES, $COLOR_WORDS, $start, $end, $grid;

  $COLORS_CODES = [
    "#000000", // 0 -> black , emptyspace
    "#ffffff", // 1 -> white , wall
    "#115577", // 2 -> ?     , walked path
    "#ffff00", // 3 -> yellow, correct path
    "#ff0000", // 4 -> red   , end point
    "#00ff00", // 5 -> green , start point
  ];
  $COLOR_WORDS = {
    empty: 0,
    wall: 1,
    walked: 2,
    correct: 3,
    end: 4,
    start: 5
  }


  function emptyGrid() {
    var grid = new Array($WIDTH);

    for(var i = 0; i < $WIDTH; i++) {
      grid[i] = new Array($HEIGHT);

      for(var j = 0; j < $HEIGHT; j++) {
        grid[i][j] = $COLOR_WORDS.empty;
      }
    }

    for(var i = 0; i < $WIDTH; i++) {
      grid[0][i] = $COLOR_WORDS.wall;
      grid[i][0] = $COLOR_WORDS.wall;
      grid[$WIDTH-1][i] = $COLOR_WORDS.wall;
      grid[i][$HEIGHT-1] = $COLOR_WORDS.wall;
    }

    return grid;
  }

  function createMaze() {
    var i, j;

    for(i = 0; i < $WIDTH; i++) {
      for(j = 0; j < $HEIGHT; j++) {
        if( parseInt(Math.random()*10) <= 2 ) {
          $grid[i][j] = $COLOR_WORDS.wall;
        }
      }
    }

    $grid[$start.x][$start.y] = $COLOR_WORDS.start;
    $grid[$end.x][$end.y] = $COLOR_WORDS.end;
  }

  function Grid(canvas) {
    $CANVAS  = canvas;
    $CONTEXT = $CANVAS.getContext("2d");
    $WIDTH = $CANVAS.width/10;
    $HEIGHT = $CANVAS.height/10;

    $start = new Position(1, 1);
    $end = new Position($WIDTH-2, $HEIGHT-2);

    $grid = emptyGrid();
    createMaze();
  }

  Grid.prototype.draw = function() {
    var i, j;

    $CONTEXT.fillStyle = $COLORS_CODES[$COLOR_WORDS.empty];
    $CONTEXT.fillRect(0, 0, $CANVAS.width, $CANVAS.height);

    for(i = 0; i < $WIDTH; i++) {
      for(j = 0; j < $HEIGHT; j++) {
        if( $grid[i][j] != $COLOR_WORDS.empty ) {
          $CONTEXT.fillStyle = $COLORS_CODES[$grid[i][j]];
          $CONTEXT.fillRect(i*10, j*10, 10, 10);
        }
      }
    }
  };

  Grid.prototype.getStartPosition = function() {
    return $start;
  };

  Grid.prototype.getEndPosition = function() {
    return $end;
  };

  Grid.prototype.setStartPosition = function(position) {
    if( $grid[position.x][position.y] != $COLOR_WORDS.wall ) {
      $grid[$start.x][$start.y] = $COLOR_WORDS.empty;
      $start = position;
      $grid[$start.x][$start.y] = $COLOR_WORDS.start;
    }
  }

  Grid.prototype.setEndPosition = function(position) {
    if( $grid[position.x][position.y] != $COLOR_WORDS.wall ) {
      $grid[$end.x][$end.y] = $COLOR_WORDS.empty;
      $end = position;
      $grid[$end.x][$end.y] = $COLOR_WORDS.end;
    }
  }

  Grid.prototype.foundEnd = function(position) {
    return ( ($end.x == position.x) && ($end.y == position.y) );
  };

  Grid.prototype.setCorrect = function(position) {
    $grid[position.x][position.y] = $COLOR_WORDS.correct;
  }

  Grid.prototype.setWalked = function(position) {
    $grid[position.x][position.y] = $COLOR_WORDS.walked;
  }

  Grid.prototype.getValidPossibilities = function(actual) {
    var possibilities = [
      new Position(actual.x, actual.y-1),
      new Position(actual.x+1, actual.y),
      new Position(actual.x, actual.y+1),
      new Position(actual.x-1, actual.y)
    ];

    possibilities = possibilities.filter(function(value) {
      return  !/^[1-3]$/.test($grid[value.x][value.y]);
    });

    return possibilities;
  };

  return Grid;
})();