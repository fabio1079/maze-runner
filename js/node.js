///<reference path="./position.ts" />
var Node = (function () {
    function Node(data) {
        this.next = null;
        this.prev = null;
        this.data = data;
    }
    return Node;
})();
