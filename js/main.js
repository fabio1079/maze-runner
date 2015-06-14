///<reference path="./grid-position.ts" />
///<reference path="./node-position.ts" />>
///<reference path="./grid.ts" />
///<reference path="./stack.ts" />
///<reference path="./queue.ts" />
///<reference path="./breadth-first-search.ts" />
///<reference path="./depth-first-search.ts" />
var Main = (function () {
    function Main() {
        var _this = this;
        this.canvas = document.querySelector("#stage canvas");
        this.startPositionButton = document.querySelector("#set-start-position");
        this.endPositionButton = document.querySelector("#set-end-position");
        this.startSearchButton = document.querySelector("#start-search");
        this.btnHelp = document.querySelector("#btn-help");
        this.helpBlockClose = document.querySelector("#help-block-close span");
        this.grid = new Grid(this.canvas);
        this.grid.draw();
        this.startPositionButton.addEventListener('click', function (mouseEvent) {
            _this.setStartPosition(_this.startPositionButton);
        });
        this.endPositionButton.addEventListener('click', function (mouseEvent) {
            _this.setEndPosition(_this.endPositionButton);
        });
        this.startSearchButton.addEventListener('click', function (mouseEvent) {
            _this.startSearchAction(_this.startSearchButton);
        });
        this.btnHelp.addEventListener('click', function (mouseEvent) {
            _this.showHelpBoxAction();
        });
        this.helpBlockClose.addEventListener('click', function (mouseEvent) {
            _this.hideHelpBoxAction();
        });
        this.canvas.addEventListener('click', function (mouseEvent) {
            _this.canvasClickMarker(mouseEvent, _this.canvas);
        });
        this.startPositionButton.disabled = false;
    }
    Main.prototype.getRealMouseCoords = function (mouseEvent, canvas) {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var currentElement = canvas;
        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        } while (currentElement = currentElement.offsetParent);
        var realMousePosition = new GridPosition(mouseEvent.pageX - totalOffsetX, mouseEvent.pageY - totalOffsetY);
        return realMousePosition;
    };
    Main.prototype.initSearch = function (selectedRadio) {
        if (selectedRadio.value === "dfs") {
            var dephFirstSearch = new DephFirstSearch(this.grid);
        }
        else if (selectedRadio.value == "bfs") {
            var breadthFirstSearch = new BreadthFirstSearch(this.grid);
        }
    };
    Main.prototype.canvasClickMarker = function (mouseEvent, canvas) {
        var realMousePosition = this.getRealMouseCoords(mouseEvent, canvas);
        var position = new GridPosition(Math.floor(realMousePosition.x / 10), Math.floor(realMousePosition.y / 10));
        if (!this.startPositionButton.disabled) {
            this.grid.setStartPosition(position);
            this.grid.draw();
        }
        else if (!this.endPositionButton.disabled) {
            this.grid.setEndPosition(position);
            this.grid.draw();
        }
    };
    Main.prototype.setStartPosition = function (buttonStartPosition) {
        buttonStartPosition.disabled = true;
        this.endPositionButton.disabled = false;
    };
    Main.prototype.setEndPosition = function (buttonEndPosition) {
        buttonEndPosition.disabled = true;
        this.startSearchButton.disabled = false;
    };
    Main.prototype.startSearchAction = function (searchStartButton) {
        searchStartButton.disabled = true;
        var radioButtons = document.querySelectorAll("input[type='radio']");
        var selectedRadio = null;
        for (var i = 0, len = radioButtons.length; i < len; i++) {
            var radioButton = radioButtons[i];
            if (radioButton.checked) {
                selectedRadio = radioButton;
            }
        }
        if (selectedRadio !== null) {
            this.initSearch(selectedRadio);
        }
    };
    Main.prototype.showContentBlocker = function () {
        var contentBlocker = document.querySelector("#content-blocker");
        contentBlocker.style.width = "" + document.body.clientWidth + "px";
        contentBlocker.style.height = "" + document.body.clientHeight + "px";
        contentBlocker.style.display = "block";
    };
    Main.prototype.hideContentBlocker = function () {
        var contentBlocker = document.querySelector("#content-blocker");
        contentBlocker.style.width = "0px";
        contentBlocker.style.height = "0px";
        contentBlocker.style.display = "none";
    };
    Main.prototype.showHelpBoxAction = function () {
        this.showContentBlocker();
        var helpBlock = document.querySelector("#help-block");
        helpBlock.style.display = "block";
        return false;
    };
    Main.prototype.hideHelpBoxAction = function () {
        this.hideContentBlocker();
        var helpBlock = document.querySelector("#help-block");
        helpBlock.style.display = "none";
        return false;
    };
    return Main;
})();
window.addEventListener('load', function () {
    var main = new Main();
});
