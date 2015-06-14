///<reference path="./grid-position.ts" />
var Grid = (function () {
    function Grid(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width / 10;
        this.height = this.canvas.height / 10;
        this.start = new GridPosition(1, 1);
        this.end = new GridPosition(this.width - 2, this.height - 2);
        this.colorsCodes = [
            "#000000",
            "#ffffff",
            "#115577",
            "#ffff00",
            "#ff0000",
            "#00ff00",
        ];
        this.colorsWords = {
            empty: 0,
            wall: 1,
            walked: 2,
            correct: 3,
            end: 4,
            start: 5
        };
        this.maze = this.emptyMaze();
        this.createMaze();
    }
    Grid.prototype.emptyMaze = function () {
        var maze = new Array(this.width);
        for (var i = 0, width = this.width; i < width; i++) {
            maze[i] = new Array(this.height);
            for (var j = 0, height = this.height; j < height; j++) {
                maze[i][j] = this.colorsWords.empty;
            }
        }
        for (var i = 0, width = this.width; i < this.width; i++) {
            maze[0][i] = this.colorsWords.wall;
            maze[i][0] = this.colorsWords.wall;
            maze[this.width - 1][i] = this.colorsWords.wall;
            maze[i][this.height - 1] = this.colorsWords.wall;
        }
        return maze;
    };
    Grid.prototype.createMaze = function () {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                if (Math.random() <= 0.3) {
                    this.maze[i][j] = this.colorsWords.wall;
                }
            }
        }
        this.maze[this.start.x][this.start.y] = this.colorsWords.start;
        this.maze[this.end.x][this.end.y] = this.colorsWords.end;
    };
    Grid.prototype.draw = function () {
        this.context.fillStyle = this.colorsCodes[this.colorsWords.empty];
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0, width = this.width; i < width; i++) {
            for (var j = 0, height = this.height; j < height; j++) {
                if (this.maze[i][j] != this.colorsWords.empty) {
                    this.context.fillStyle = this.colorsCodes[this.maze[i][j]];
                    this.context.fillRect(i * 10, j * 10, 10, 10);
                }
            }
        }
    };
    Grid.prototype.getStartPosition = function () {
        return this.start;
    };
    Grid.prototype.getEndPosition = function () {
        return this.end;
    };
    Grid.prototype.setStartPosition = function (position) {
        if (this.maze[position.x][position.y] != this.colorsWords.wall) {
            this.maze[this.start.x][this.start.y] = this.colorsWords.empty;
            this.start = position;
            this.maze[this.start.x][this.start.y] = this.colorsWords.start;
        }
    };
    Grid.prototype.setEndPosition = function (position) {
        if (this.maze[position.x][position.y] != this.colorsWords.wall) {
            this.maze[this.end.x][this.end.y] = this.colorsWords.empty;
            this.end = position;
            this.maze[this.end.x][this.end.y] = this.colorsWords.end;
        }
    };
    Grid.prototype.foundEnd = function (position) {
        return ((this.end.x == position.x) && (this.end.y == position.y));
    };
    ;
    Grid.prototype.setCorrect = function (position) {
        this.maze[position.x][position.y] = this.colorsWords.correct;
    };
    Grid.prototype.setWalked = function (position) {
        this.maze[position.x][position.y] = this.colorsWords.walked;
    };
    Grid.prototype.getValidPossibilities = function (actual) {
        var _this = this;
        var possibilities = [
            new GridPosition(actual.x, actual.y - 1),
            new GridPosition(actual.x + 1, actual.y),
            new GridPosition(actual.x, actual.y + 1),
            new GridPosition(actual.x - 1, actual.y)
        ];
        possibilities = possibilities.filter(function (value) {
            return !/^[1-3]$/.test(String(_this.maze[value.x][value.y]));
        });
        return possibilities;
    };
    ;
    return Grid;
})();
