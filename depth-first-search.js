var dephFirstSearch = (function(){
  var $actual_position;

  function getNeighbor(possibilities) {
    var position = parseInt(Math.random()*possibilities.length);

    return possibilities[position];
  }

  function draw(stack) {
    $actual_position = stack.getLastAdded();

    if( $grid.foundEnd($actual_position) ) return;

    $grid.setCorrect($actual_position);

    $grid.draw();

    var neighbor = getNeighbor($grid.getValidPossibilities($actual_position));

    if( typeof(neighbor) == "undefined" ) {
      var pop = stack.pop();
      $grid.setWalked(pop);
    } else {
      stack.add(neighbor);
    }

    if( stack.hasData() ) {
      window.setTimeout(function(){
        draw(stack);
      }, 10);
    }
  }

  function init(grid) {
    $grid = grid;
    $grid.draw();

    $actual_position = $grid.getStartPosition();

    var stack = new Stack();
    stack.add($actual_position);

    draw(stack);
  }

  return init;
})();