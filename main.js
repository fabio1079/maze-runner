function initSearch(grid, selectedRadio) {
  if( selectedRadio.value == "dfs" )
    dephFirstSearch(grid);
  else if( selectedRadio.value == "bfs" )
    breadthFirstSearch(grid);
}

window.addEventListener('load', function(){
  var grid = new Grid();
  grid.draw();

  document.querySelector("#start").addEventListener('click', function(){
    var radioButtons = document.querySelectorAll("input[type='radio']");
    var selectedRadio = null;

    for(var i = 0; i < radioButtons.length; i++)
      if( radioButtons[i].checked )
        selectedRadio = radioButtons[i];

    if( selectedRadio != null )
      initSearch(grid, selectedRadio);
  });
});