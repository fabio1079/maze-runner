///<reference path="./grid-position.ts" />

class Grid {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private colorsCodes: Array<string>;
  private colorsWords: any;
  private start: GridPosition;
  private end: GridPosition;
  private maze: Array<Array<number>>;


  constructor(canvas: HTMLCanvasElement) {
    this.canvas  = canvas;
    this.context = <CanvasRenderingContext2D> this.canvas.getContext("2d");
    this.width = this.canvas.width/10;
    this.height = this.canvas.height/10;

    this.start = new GridPosition(1, 1);
    this.end = new GridPosition(this.width-2, this.height-2);

    this.colorsCodes = [
      "#000000", // 0 -> black , emptyspace
      "#ffffff", // 1 -> white , wall
      "#115577", // 2 -> ?     , walked path
      "#ffff00", // 3 -> yellow, correct path
      "#ff0000", // 4 -> red   , end point
      "#00ff00", // 5 -> green , start point
    ];

    this.colorsWords = {
      empty: 0,
      wall: 1,
      walked: 2,
      correct: 3,
      end: 4,
      start: 5
    }

    this.maze = this.emptyMaze();
    this.createMaze();
  }


  private emptyMaze(): Array<Array<number>> {
    let maze = new Array(this.width);

    for(let i = 0, width = this.width; i < width; i++) {
      maze[i] = new Array(this.height);

      for(let j = 0, height = this.height; j < height; j++) {
        maze[i][j] = this.colorsWords.empty;
      }
    }

    for(let i = 0, width = this.width; i < this.width; i++) {
      maze[0][i] = this.colorsWords.wall;
      maze[i][0] = this.colorsWords.wall;
      maze[this.width-1][i] = this.colorsWords.wall;
      maze[i][this.height-1] = this.colorsWords.wall;
    }

    return maze;
  }


  private createMaze() {
    for(let i = 0; i < this.width; i++) {
      for(let j = 0; j < this.height; j++) {
        if( Math.random() <= 0.3 ) {
          this.maze[i][j] = this.colorsWords.wall;
        }
      }
    }

    this.maze[this.start.x][this.start.y] = this.colorsWords.start;
    this.maze[this.end.x][this.end.y] = this.colorsWords.end;
  }


  draw() {
    this.context.fillStyle = this.colorsCodes[this.colorsWords.empty];
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for(let i = 0, width = this.width; i < width; i++) {
      for(let j = 0, height = this.height; j < height; j++) {
        if( this.maze[i][j] != this.colorsWords.empty ) {
          this.context.fillStyle = this.colorsCodes[this.maze[i][j]];
          this.context.fillRect(i*10, j*10, 10, 10);
        }
      }
    }
  }


  getStartPosition(): GridPosition {
    return this.start;
  }


  getEndPosition(): GridPosition {
    return this.end;
  }


  setStartPosition(position: GridPosition) {
    if( this.maze[position.x][position.y] != this.colorsWords.wall ) {
      this.maze[this.start.x][this.start.y] = this.colorsWords.empty;
      this.start = position;
      this.maze[this.start.x][this.start.y] = this.colorsWords.start;
    }
  }


  setEndPosition(position: GridPosition) {
    if( this.maze[position.x][position.y] != this.colorsWords.wall ) {
      this.maze[this.end.x][this.end.y] = this.colorsWords.empty;
      this.end = position;
      this.maze[this.end.x][this.end.y] = this.colorsWords.end;
    }
  }


  foundEnd(position: GridPosition): boolean {
    return ( (this.end.x == position.x) && (this.end.y == position.y) );
  };


  setCorrect(position: GridPosition) {
    this.maze[position.x][position.y] = this.colorsWords.correct;
  }


  setWalked(position: GridPosition) {
    this.maze[position.x][position.y] = this.colorsWords.walked;
  }


  getValidPossibilities(actual: GridPosition): Array<GridPosition> {
    var possibilities: Array<GridPosition> = [
      new GridPosition(actual.x, actual.y-1),
      new GridPosition(actual.x+1, actual.y),
      new GridPosition(actual.x, actual.y+1),
      new GridPosition(actual.x-1, actual.y)
    ];

    possibilities = possibilities.filter((value: GridPosition) => {
      return  !/^[1-3]$/.test(String(this.maze[value.x][value.y]));
    });

    return possibilities;
  };
}
