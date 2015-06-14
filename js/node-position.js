///<reference path="./grid-position.ts" />
var NodePosition = (function () {
    function NodePosition(data) {
        this.next = null;
        this.prev = null;
        this.data = data;
    }
    return NodePosition;
})();
