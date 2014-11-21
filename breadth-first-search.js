var breadthFirstSearch = (function(){
  var $grid;

  function draw(queue) {
    var found_end = false;
    var last_visited = null;
    var actual_position = queue.shift();
    var possibilities = [];

    possibilities = $grid.getValidPossibilities(actual_position);
    found_end = $grid.foundEnd(actual_position);
    $grid.setWalked(actual_position);

    if( !found_end )
      visitNeighbors(possibilities, queue, actual_position);
    else
      last_visited = actual_position;

    $grid.draw();

    if( !found_end && queue.getLength() > 0 ) {
      window.setTimeout(function(){
        draw(queue);
      }, 1);
    } else if(found_end) {
      trace_route(queue, last_visited);
    } else {
      queue.clear();
      last_visited = null;
    }
  }

  function visitNeighbors(neighbors, queue, actual_position) {
    for(var i = 0; i < neighbors.length; i++) {
      if( queue.find(neighbors[i]) == null) {
        $grid.setCorrect(neighbors[i]);

        neighbors[i].father = actual_position;
        queue.add(neighbors[i]);
        added_value = true;
      } else {
        $grid.setWalked(neighbors[i]);
      }
    }
  }

  function trace_route(queue, last_visited) {
    var position;

    while( queue.hasData() ) {
      position = queue.shift();
      $grid.setWalked(position);
    }

    position = last_visited;

    while( position != null ) {
      $grid.setCorrect(position);
      position = position.father;
    }

    $grid.draw();
  }

  function init(grid) {
    $grid = grid;
    $grid.draw();

    var actual_position = $grid.getStartPosition();
    var last_visited;

    var queue = new Queue();
    queue.add(actual_position);

    draw(queue, last_visited);
  }

  return init;
})();