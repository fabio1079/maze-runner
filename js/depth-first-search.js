///<reference path="./grid-position.ts" />
///<reference path="./grid.ts" />
///<reference path="./stack.ts" />
var DephFirstSearch = (function () {
    function DephFirstSearch(grid) {
        this.grid = grid;
        this.grid.draw();
        this.actualPosition = this.grid.getStartPosition();
        var stack = new Stack();
        stack.add(this.actualPosition);
        this.draw(stack);
    }
    DephFirstSearch.prototype.getNeighbor = function (possibilities) {
        var position = Math.floor(Math.random() * possibilities.length);
        return possibilities[position];
    };
    DephFirstSearch.prototype.draw = function (stack) {
        var _this = this;
        this.actualPosition = stack.getLastAdded();
        if (this.grid.foundEnd(this.actualPosition)) {
            return;
        }
        this.grid.setCorrect(this.actualPosition);
        this.grid.draw();
        var neighbor = this.getNeighbor(this.grid.getValidPossibilities(this.actualPosition));
        if (typeof (neighbor) === "undefined") {
            var pop = stack.pop();
            this.grid.setWalked(pop);
        }
        else {
            stack.add(neighbor);
        }
        if (stack.hasData()) {
            window.setTimeout(function () {
                _this.draw(stack);
            }, 10);
        }
    };
    return DephFirstSearch;
})();
