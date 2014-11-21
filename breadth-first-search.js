(function(){
  var $grid;

  function draw(queue, visited) {
    var found_end = false;
    var actual_position = queue.shift();
    var possibilities = [];

    possibilities = $grid.getValidPossibilities(actual_position);
    found_end = $grid.foundEnd(actual_position);
    $grid.setWalked(actual_position);

    if( !found_end )
      visitNeighbors(possibilities, queue, visited, actual_position);
    else
      visited.add(actual_position);

    $grid.draw();

    if( !found_end && queue.getLength() > 0 ) {
      window.setTimeout(function(){
        draw(queue, visited);
      }, 1);
    } else if(found_end) {
      trace_route(queue, visited);
    }
  }

  function visitNeighbors(neighbors, queue, visited, actual_position) {
    var added_value = false;

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

    if( added_value )
      visited.add(actual_position);
  }

  function trace_route(queue, visited) {
    var position;

    while( queue.hasData() ) {
      position = queue.shift();
      $grid.setWalked(position);
    }

    position = visited.pop();

    while( position != null ) {
      $grid.setCorrect(position);
      position = position.father;
    }

    $grid.draw();
  }

  function init() {
    $grid = new Grid();
    $grid.draw();

    var actual_position = $grid.getStartPosition();

    var queue = new Queue();
    var visited = new Stack();
    queue.add(actual_position);

    draw(queue, visited);
  }

  window.addEventListener('load', init);
})();