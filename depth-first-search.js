(function(){
  var canvas = document.querySelector("#stage canvas");
  var context = canvas.getContext("2d");
  var WIDTH = canvas.width/10;
  var HEIGHT = canvas.height/10;
  var START = [1,1];
  var END = []
  var frames = 1;
  var actual_position = START;

  var grid = maze_grid();
  create_maze(grid);

  function getNeighbor(actual) {
    var possibilities = [
      [actual[0], actual[1]-1],
      [actual[0]+1, actual[1]],
      [actual[0], actual[1]+1],
      [actual[0]-1, actual[1]]
    ];

    possibilities = possibilities.filter(function(value) {
      return  !/^[1-2]$/.test(value[0]) && !/^[1-2]$/.test(value[1]);
    });

    var position = parseInt(Math.random()*possibilities.length);

    return possibilities[position];
  }

  function draw() {
    window.setTimeout(function(){
      console.log("IO !");
      draw();
    }, 1000/frames);
  }

  function init() {

  }
})();