///<reference path="./position.ts" />
///<reference path="./node.ts" />
///<reference path="./grid.ts" />
///<reference path="./queue.ts" />


class BreadthFirstSearch {
  private grid: Grid;


  constructor(grid: Grid) {
    this.grid = grid;
    this.grid.draw();

    let actualPosition: Position = this.grid.getStartPosition();

    let queue = new Queue();
    queue.add(actualPosition);

    this.draw(queue);
  }


  private draw(queue: Queue) {
    let lastVisited: Position = null;
    let actualPosition: Position = queue.shift();
    let possibilities:Array<Position> = this.grid.getValidPossibilities(actualPosition);

    let foundEnd: boolean = this.grid.foundEnd(actualPosition);
    this.grid.setWalked(actualPosition);

    if (!foundEnd) {
      this.visitNeighbors(possibilities, queue, actualPosition);
    } else {
      lastVisited = actualPosition;
    }
    
    this.grid.draw();

    if (!foundEnd && queue.getLength() > 0 ) {
      window.setTimeout(() => {
        this.draw(queue);
      }, 10);
    } else if(foundEnd) {
      this.traceRoute(queue, lastVisited);
    } else {
      queue.clear();
      lastVisited = null;
    }
  }


  private visitNeighbors(neighbors: Array<Position>, queue: Queue, actualPosition: Position) {
    for(let i = 0, len = neighbors.length; i < len; i++) {
      if(queue.find(neighbors[i]) === null) {
        this.grid.setCorrect(neighbors[i]);

        neighbors[i].father = actualPosition;
        queue.add(neighbors[i]);
      } else {
        this.grid.setWalked(neighbors[i]);
      }
    }
  }


  private traceRoute(queue: Queue, lastVisited: Position) {
    while( queue.hasData() ) {
      this.grid.setWalked(queue.shift());
    }

    let position: Position = lastVisited;

    while( position != null ) {
      this.grid.setCorrect(position);
      position = position.father;
    }

    this.grid.draw();
  }
}
