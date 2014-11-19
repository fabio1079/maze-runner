(function(){
  var $frames = 10000;
  var $actual_position, $grid;

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