(function(){
  var $frames = 10000;
  var $actual_position, $grid;

  function visitNeighbors(neighbors, queue, visited) {
    var added_value = false;

    for(var i = 0; i < neighbors.length; i++) {
      if( queue.find(neighbors[i]) == null) {
        $grid.setCorrect(neighbors[i]);

        neighbors[i].father = $actual_position;
        queue.add(neighbors[i]);
        added_value = true;
      } else {
        $grid.setWalked(neighbors[i]);
      }
    }

    if( added_value )
      visited.add($actual_position);
  }

  function trace_route(queue, visited) {

  }

  function draw(queue, visited) {
    var found_end = false;
    var $actual_position = queue.shift();
    var possibilities = [];

    possibilities = $grid.getValidPossibilities($actual_position);
    found_end = $grid.foundEnd($actual_position);
    $grid.setWalked($actual_position);

    if( !found_end )
      visitNeighbors(possibilities, queue, visited);

    $grid.draw();

    if( !found_end && queue.getLength() > 0 ) {
      window.setTimeout(function(){
        draw(queue, visited);
      }, 1000/frames);
    } else if(found_end) {

      trace_route(queue, visited);
    }
  }

  function init() {
    $grid = new Grid();
    $grid.draw();

    $actual_position = $grid.getStartPosition();

    var queue = new Queue();
    var visited = new Queue();
    queue.add($actual_position);

    draw(queue, visited);
  }

  window.addEventListener('load', init);
})();