(function(){
  var $frames = 10000;
  var $actual_position = START;
  var $grid = maze_grid();

  function getNeighbor(actual) {
    var possibilities = [
      new Position(actual.x, actual.y-1),
      new Position(actual.x+1, actual.y),
      new Position(actual.x, actual.y+1),
      new Position(actual.x-1, actual.y)
    ];

    possibilities = possibilities.filter(function(value) {
      return  !/^[1-3]$/.test($grid[value.x][value.y]);
    });

    var position = parseInt(Math.random()*possibilities.length);

    return possibilities[position];
  }

  function found_end(position) {
    return $grid[position.x][position.y] == COLOR_WORDS.end;
  }

  function draw(stack) {
    $actual_position = stack.getLastAdded();

    if( found_end($actual_position) ) {
      return;
    }

    $grid[$actual_position.x][$actual_position.y] = COLOR_WORDS.correct;

    build_maze($grid);

    var neighbor = getNeighbor($actual_position);

    if( typeof(neighbor) == "undefined" ) {
      var pop = stack.pop();
      $grid[pop.x][pop.y] = COLOR_WORDS.walked;
    } else {
      stack.add(neighbor);
    }

    if( stack.hasData() ) {
      window.setTimeout(function(){
        draw(stack);
      }, 1000/frames);
    }
  }

  function init() {
    create_maze($grid);
    var stack = new Stack();
    stack.add($actual_position);

    draw(stack);
  }

  window.addEventListener('load', init);
})();