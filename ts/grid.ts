///<reference path="./position.ts" />

class Grid {
  private context: any;
  private canvas: any;
  private width: number;
  private height: number;
  private colors_codes: Array<string>;
  private colors_words: any;
  private start: Position;
  private end: Position;
  private maze: Array<Array<number>>;


  constructor(canvas: any) {
    this.canvas  = canvas;
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width/10;
    this.height = this.canvas.height/10;

    this.start = new Position(1, 1);
    this.end = new Position(this.width-2, this.height-2);

    this.colors_codes = [
      "#000000", // 0 -> black , emptyspace
      "#ffffff", // 1 -> white , wall
      "#115577", // 2 -> ?     , walked path
      "#ffff00", // 3 -> yellow, correct path
      "#ff0000", // 4 -> red   , end point
      "#00ff00", // 5 -> green , start point
    ];
    this.colors_words = {
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

    for(let i = 0; i < this.width; i++) {
      maze[i] = new Array(this.height);

      for(let j = 0; j < this.height; j++) {
        maze[i][j] = this.colors_words.empty;
      }
    }

    for(let i = 0; i < this.width; i++) {
      maze[0][i] = this.colors_words.wall;
      maze[i][0] = this.colors_words.wall;
      maze[this.width-1][i] = this.colors_words.wall;
      maze[i][this.height-1] = this.colors_words.wall;
    }

    return maze;
  }


  private createMaze() {
    for(let i = 0; i < this.width; i++) {
      for(let j = 0; j < this.height; j++) {
        if( Math.random() <= 0.3 ) {
          this.maze[i][j] = this.colors_words.wall;
        }
      }
    }

    this.maze[this.start.x][this.start.y] = this.colors_words.start;
    this.maze[this.start.x][this.start.y] = this.colors_words.end;
  }
  
  
  draw() {
    this.context.fillStyle = this.colors_codes[this.colors_words.empty];
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for(let i = 0; i < this.width; i++) {
      for(let j = 0; j < this.height; j++) {
        if( this.maze[i][j] != this.colors_words.empty ) {
          this.context.fillStyle = this.colors_codes[this.maze[i][j]];
          this.context.fillRect(i*10, j*10, 10, 10);
        }
      }
    }
  }


  getStartPosition(): Position {
    return this.start;
  }


  getEndPosition(): Position {
    return this.end;
  }


  setStartPosition(position: Position) {
    if( this.maze[position.x][position.y] != this.colors_words.wall ) {
      this.maze[this.start.x][this.start.y] = this.colors_words.empty;
      this.start = position;
      this.maze[this.start.x][this.start.y] = this.colors_words.start;
    }
  }

  setEndPosition(position) {
    if( this.maze[position.x][position.y] != this.colors_words.wall ) {
      this.maze[this.end.x][this.end.y] = this.colors_words.empty;
      this.end = position;
      this.maze[this.end.x][this.end.y] = this.colors_words.end;
    }
  }

  foundEnd(position: Position): boolean {
    return ( (this.end.x == position.x) && (this.end.y == position.y) );
  };

  setCorrect(position: Position) {
    this.maze[position.x][position.y] = this.colors_words.correct;
  }

  setWalked(position: Position) {
    this.maze[position.x][position.y] = this.colors_words.walked;
  }

  getValidPossibilities(actual: Position): Array<Position> {
    var possibilities: Array<Position> = [
      new Position(actual.x, actual.y-1),
      new Position(actual.x+1, actual.y),
      new Position(actual.x, actual.y+1),
      new Position(actual.x-1, actual.y)
    ];

    possibilities = possibilities.filter((value: Position) => {
      return  !/^[1-3]$/.test(String(this.maze[value.x][value.y]));
    });

    return possibilities;
  };
}
