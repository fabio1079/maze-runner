(function(){
  var $grid;

  function initSearch(selectedRadio) {
    if( selectedRadio.value == "dfs" )
      dephFirstSearch($grid);
    else if( selectedRadio.value == "bfs" )
      breadthFirstSearch($grid);
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
    var canvas = document.querySelector("#stage canvas");
    var startSearchButton = document.querySelector("#start-search");
    $grid = new Grid(canvas);
    $grid.draw();

    startSearchButton.addEventListener('click', startSearchAction);
  });
})();