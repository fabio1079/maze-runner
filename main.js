(function(){
  var $grid, $canvas, $startPositionButton, $endPositionButton, $startSearchButton;

  function getRealMouseCoords(canvas, event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = canvas;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    } while(currentElement = currentElement.offsetParent);

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY};
  }

  function initSearch(selectedRadio) {
    if( selectedRadio.value == "dfs" )
      dephFirstSearch($grid);
    else if( selectedRadio.value == "bfs" )
      breadthFirstSearch($grid);
  }

  function canvasClickMarker(event) {
    var positions = getRealMouseCoords(this, event);
    var position = new Position(parseInt(positions.x/10), parseInt(positions.y/10));

    if( !$startPositionButton.disabled ) {
      $grid.setStartPosition(position);
      $grid.draw();
    } else if( !$endPositionButton.disabled ) {
      $grid.setEndPosition(position);
      $grid.draw();
    }
  }

  function setStartPosition() {
    this.disabled = true;
    $endPositionButton.disabled = false;
  }

  function setEndPosition() {
    this.disabled = true;
    $startSearchButton.disabled = false;
  }

  function startSearchAction() {
    this.disabled = true;
    var radioButtons = document.querySelectorAll("input[type='radio']");
    var selectedRadio = null;

    for(var i = 0; i < radioButtons.length; i++)
      if( radioButtons[i].checked )
        selectedRadio = radioButtons[i];

    if( selectedRadio != null )
      initSearch(selectedRadio);
  }

  window.addEventListener('load', function(){
    $canvas = document.querySelector("#stage canvas");

    $startPositionButton = document.querySelector("#set-start-position");
    $endPositionButton = document.querySelector("#set-end-position");
    $startSearchButton = document.querySelector("#start-search");

    $grid = new Grid($canvas);
    $grid.draw();

    $startPositionButton.addEventListener('click', setStartPosition);
    $endPositionButton.addEventListener('click', setEndPosition);
    $startSearchButton.addEventListener('click', startSearchAction);

    $canvas.addEventListener('click', canvasClickMarker);

    $startPositionButton.disabled = false;
  });
})();