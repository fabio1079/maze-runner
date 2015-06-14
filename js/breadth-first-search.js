///<reference path="./grid-position.ts" />
///<reference path="./grid.ts" />
///<reference path="./queue.ts" />
var BreadthFirstSearch = (function () {
    function BreadthFirstSearch(grid) {
        this.grid = grid;
        this.grid.draw();
        var actualPosition = this.grid.getStartPosition();
        var queue = new Queue();
        queue.add(actualPosition);
        this.draw(queue);
    }
    BreadthFirstSearch.prototype.draw = function (queue) {
        var _this = this;
        var lastVisited = null;
        var actualPosition = queue.shift();
        var possibilities = this.grid.getValidPossibilities(actualPosition);
        var foundEnd = this.grid.foundEnd(actualPosition);
        this.grid.setWalked(actualPosition);
        if (!foundEnd) {
            this.visitNeighbors(possibilities, queue, actualPosition);
        }
        else {
            lastVisited = actualPosition;
        }
        this.grid.draw();
        if (!foundEnd && queue.getLength() > 0) {
            window.setTimeout(function () {
                _this.draw(queue);
            }, 10);
        }
        else if (foundEnd) {
            this.traceRoute(queue, lastVisited);
        }
        else {
            queue.clear();
            lastVisited = null;
        }
    };
    BreadthFirstSearch.prototype.visitNeighbors = function (neighbors, queue, actualPosition) {
        for (var i = 0, len = neighbors.length; i < len; i++) {
            if (queue.find(neighbors[i]) === null) {
                this.grid.setCorrect(neighbors[i]);
                neighbors[i].father = actualPosition;
                queue.add(neighbors[i]);
            }
            else {
                this.grid.setWalked(neighbors[i]);
            }
        }
    };
    BreadthFirstSearch.prototype.traceRoute = function (queue, lastVisited) {
        while (queue.hasData()) {
            this.grid.setWalked(queue.shift());
        }
        var position = lastVisited;
        while (position != null) {
            this.grid.setCorrect(position);
            position = position.father;
        }
        this.grid.draw();
    };
    return BreadthFirstSearch;
})();
