///<reference path="./position.ts" />
///<reference path="./node.ts" />
///<reference path="./grid.ts" />
///<reference path="./stack.ts" />


class DephFirstSearch {
  private actualPosition: Position;
  private grid: Grid;


  constructor(grid: Grid) {
    this.grid = grid;
    this.grid.draw();

    this.actualPosition = this.grid.getStartPosition();

    let stack = new Stack();
    stack.add(this.actualPosition);

    this.draw(stack);
  }


  private getNeighbor(possibilities: Array<Position>): Position {
    let position:number = Math.floor(Math.random()*possibilities.length);

    return possibilities[position];
  }


  private draw(stack: Stack) {
    this.actualPosition = stack.getLastAdded();

    if (this.grid.foundEnd(this.actualPosition)) {
      return;
    }

    this.grid.setCorrect(this.actualPosition);

    this.grid.draw();

    let neighbor: Position = this.getNeighbor(
      this.grid.getValidPossibilities(this.actualPosition)
    );

    if( typeof(neighbor) === "undefined" ) {
      let pop: Position = stack.pop();
      this.grid.setWalked(pop);
    } else {
      stack.add(neighbor);
    }

    if( stack.hasData() ) {
      window.setTimeout(() => {
        this.draw(stack);
      }, 10);
    }
  }
}
