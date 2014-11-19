(function(){
  var $frames = 10000;
  var $actual_position, $grid;

  function found_end(position) {
    return $grid[position.x][position.y] == COLOR_WORDS.end;
  }

  function getValidPossibilities(actual) {
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
  }

  function draw(queue) {
    var $actual_position = queue.getFirstAdded();
    var possibilities = getValidPossibilities($actual_position);


  }

  function init() {
    $grid = new Grid();
    $grid.draw();

    $actual_position = $grid.getStartPosition();

    var queue = new Queue();
    queue.add($actual_position);

    //draw(queue);
  }

  window.addEventListener('load', init);
})();