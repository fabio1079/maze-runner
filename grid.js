var Grid = (function(){
  var $CANVAS  = document.querySelector("#stage canvas");
  var $CONTEXT = $CANVAS.getContext("2d");
  var $WIDTH = $CANVAS.width/10;
  var $HEIGHT = $CANVAS.height/10;
  var $START = new Position(1, 1);
  var $END = new Position($WIDTH-2, $HEIGHT-2);

  var $COLORS_CODES = [
    "#000000", // 0 -> black , emptyspace
    "#ffffff", // 1 -> white , wall
    "#115577", // 2 -> ?     , walked path
    "#ffff00", // 3 -> yellow, correct path
    "#ff0000", // 4 -> red   , end point
  ];
  var $COLOR_WORDS = {
    empty: 0,
    wall: 1,
    walked: 2,
    correct: 3,
    end: 4
  }
  var $grid;

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

    $grid[$START.x][$START.y] = $COLOR_WORDS.correct;
    $grid[$END.x][$END.y] = $COLOR_WORDS.end;
  }

  function Grid() {
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
    return $START;
  };

  Grid.prototype.getEndPosition = function() {
    return $END;
  };

  Grid.prototype.foundEnd = function(position) {
    return $grid[position.x][position.y] == $COLOR_WORDS.end;
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